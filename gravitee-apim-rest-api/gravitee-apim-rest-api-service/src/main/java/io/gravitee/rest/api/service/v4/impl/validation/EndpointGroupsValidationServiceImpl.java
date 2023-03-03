/**
 * Copyright (C) 2015 The Gravitee team (http://gravitee.io)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package io.gravitee.rest.api.service.v4.impl.validation;

import static org.apache.commons.lang3.StringUtils.isBlank;

import io.gravitee.definition.model.v4.endpointgroup.Endpoint;
import io.gravitee.definition.model.v4.endpointgroup.EndpointGroup;
import io.gravitee.definition.model.v4.endpointgroup.service.EndpointGroupServices;
import io.gravitee.definition.model.v4.endpointgroup.service.EndpointServices;
import io.gravitee.definition.model.v4.service.Service;
import io.gravitee.rest.api.model.v4.connector.ConnectorPluginEntity;
import io.gravitee.rest.api.service.exceptions.EndpointConfigurationValidationException;
import io.gravitee.rest.api.service.exceptions.EndpointMissingException;
import io.gravitee.rest.api.service.exceptions.EndpointNameInvalidException;
import io.gravitee.rest.api.service.exceptions.HealthcheckInheritanceException;
import io.gravitee.rest.api.service.exceptions.HealthcheckInvalidException;
import io.gravitee.rest.api.service.impl.TransactionalService;
import io.gravitee.rest.api.service.v4.ApiServicePluginService;
import io.gravitee.rest.api.service.v4.EndpointConnectorPluginService;
import io.gravitee.rest.api.service.v4.exception.EndpointGroupNameAlreadyExistsException;
import io.gravitee.rest.api.service.v4.exception.EndpointGroupTypeInvalidException;
import io.gravitee.rest.api.service.v4.exception.EndpointGroupTypeMismatchInvalidException;
import io.gravitee.rest.api.service.v4.exception.EndpointNameAlreadyExistsException;
import io.gravitee.rest.api.service.v4.exception.EndpointTypeInvalidException;
import io.gravitee.rest.api.service.v4.validation.EndpointGroupsValidationService;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

/**
 * @author Guillaume LAMIRAND (guillaume.lamirand at graviteesource.com)
 * @author GraviteeSource Team
 */
@Component
public class EndpointGroupsValidationServiceImpl extends TransactionalService implements EndpointGroupsValidationService {

    private Logger logger = LoggerFactory.getLogger(this.getClass());
    private final EndpointConnectorPluginService endpointService;
    private final ApiServicePluginService apiServicePluginService;

    public EndpointGroupsValidationServiceImpl(
        final EndpointConnectorPluginService endpointService,
        final ApiServicePluginService apiServicePluginService
    ) {
        this.endpointService = endpointService;
        this.apiServicePluginService = apiServicePluginService;
    }

    @Override
    public List<EndpointGroup> validateAndSanitize(List<EndpointGroup> endpointGroups) {
        if (endpointGroups == null || endpointGroups.isEmpty()) {
            throw new EndpointMissingException();
        }

        final Set<String> names = new HashSet<>();

        endpointGroups.forEach(
            endpointGroup -> {
                validateUniqueEndpointGroupName(endpointGroup.getName(), names);
                validateEndpointGroupType(endpointGroup.getType());
                validateServices(endpointGroup.getServices());
                validateEndpointsExistence(endpointGroup);
                final ConnectorPluginEntity endpointConnector = endpointService.findById(endpointGroup.getType());
                if (endpointGroup.getSharedConfiguration() != null) {
                    endpointGroup.setSharedConfiguration(
                        endpointService.validateEndpointGroupConfiguration(endpointConnector, endpointGroup.getSharedConfiguration())
                    );
                }
                if (endpointGroup.getEndpoints() != null && !endpointGroups.isEmpty()) {
                    endpointGroup
                        .getEndpoints()
                        .forEach(
                            endpoint -> {
                                validateUniqueEndpointName(endpoint.getName(), names);
                                validateEndpointType(endpoint.getType());
                                validateServices(endpointGroup.getServices(), endpoint.getServices());
                                validateEndpointMatchType(endpointGroup, endpoint);
                                validateEndpointConfiguration(endpointConnector, endpoint);
                                validateSharedConfigurationInheritance(endpointGroup, endpoint);
                                validateEndpointGroupConfigurationOverriding(endpointConnector, endpoint);
                            }
                        );
                }
            }
        );

        return endpointGroups;
    }

    private void validateEndpointConfiguration(ConnectorPluginEntity endpointConnector, Endpoint endpoint) {
        endpoint.setConfiguration(endpointService.validateConnectorConfiguration(endpointConnector, endpoint.getConfiguration()));
    }

    private void validateEndpointGroupConfigurationOverriding(ConnectorPluginEntity endpointConnector, Endpoint endpoint) {
        if (!endpoint.isInheritConfiguration()) {
            if (endpoint.getGroupConfiguration() == null) {
                // If no endpoint group provided, validate with an empty object to validates required fields
                endpointService.validateEndpointGroupConfiguration(endpointConnector, "{}");
            } else {
                endpoint.setGroupConfiguration(
                    endpointService.validateEndpointGroupConfiguration(endpointConnector, endpoint.getGroupConfiguration())
                );
            }
        }
    }

    private void validateSharedConfigurationInheritance(EndpointGroup endpointGroup, Endpoint endpoint) {
        if (endpoint.isInheritConfiguration() && endpointGroup.getSharedConfiguration() == null) {
            // If we try to inherit shared configuration that is null
            // Shared configuration has already been validated so no need to do it again
            throw new EndpointConfigurationValidationException(
                "Impossible to inherit from a null shared configuration for endpoint: " + endpoint.getName()
            );
        }
    }

    private void validateEndpointsExistence(EndpointGroup endpointGroup) {
        //Is service discovery enabled ?
        Service endpointDiscoveryService = endpointGroup.getServices() == null ? null : endpointGroup.getServices().getDiscovery();
        if (
            (endpointDiscoveryService == null || !endpointDiscoveryService.isEnabled()) &&
            (endpointGroup.getEndpoints() == null || endpointGroup.getEndpoints().isEmpty())
        ) {
            throw new EndpointMissingException();
        }
    }

    private void validateDiscovery(Service discovery) {
        // TODO FCY: Nothing is done today to validate discovery validation. Could be handled by the connector (with a JSON Schema for instance).
    }

    private void validateEndpointType(final String type) {
        if (isBlank(type)) {
            throw new EndpointTypeInvalidException(type);
        }
    }

    private void validateEndpointGroupType(final String type) {
        if (isBlank(type)) {
            throw new EndpointGroupTypeInvalidException(type);
        }
    }

    private void validateEndpointMatchType(final EndpointGroup endpointGroup, final Endpoint endpoint) {
        if (!endpointGroup.getType().equals(endpoint.getType())) {
            throw new EndpointGroupTypeMismatchInvalidException(endpointGroup.getType());
        }
    }

    private void validateHealthCheck(Service healthCheck) {
        if (isBlank(healthCheck.getType())) {
            logger.debug("HealthCheck requires a type");
            throw new HealthcheckInvalidException(healthCheck.getType());
        }

        healthCheck.setConfiguration(
            this.apiServicePluginService.validateApiServiceConfiguration(healthCheck.getType(), healthCheck.getConfiguration())
        );
    }

    private void validateName(final String name) {
        if (name != null && name.contains(":")) {
            throw new EndpointNameInvalidException(name);
        }
    }

    private void validateUniqueEndpointGroupName(final String name, final Set<String> names) {
        validateName(name);

        if (names.contains(name)) {
            throw new EndpointGroupNameAlreadyExistsException(name);
        }

        names.add(name);
    }

    private void validateUniqueEndpointName(final String name, final Set<String> names) {
        validateName(name);

        if (names.contains(name)) {
            throw new EndpointNameAlreadyExistsException(name);
        }

        names.add(name);
    }

    private void validateServices(EndpointGroupServices services) {
        if (services != null) {
            if (services.getDiscovery() != null) {
                validateDiscovery(services.getDiscovery());
            }
            if (services.getHealthCheck() != null) {
                validateHealthCheck(services.getHealthCheck());
            }
        }
    }

    private void validateServices(EndpointGroupServices groupServices, EndpointServices services) {
        if (services != null) {
            if (services.getHealthCheck() != null) {
                final var serviceHealthCheck = services.getHealthCheck();

                validateHealthCheck(serviceHealthCheck);

                final var hcGroupWithoutConfig =
                    (
                        groupServices == null ||
                        groupServices.getHealthCheck() == null ||
                        isBlank(groupServices.getHealthCheck().getConfiguration())
                    );
                if (!serviceHealthCheck.isOverrideConfiguration() && hcGroupWithoutConfig) {
                    logger.debug("HealthCheck inherit from a missing configuration");
                    throw new HealthcheckInheritanceException();
                }

                if (serviceHealthCheck.isOverrideConfiguration() && isBlank(serviceHealthCheck.getConfiguration())) {
                    logger.debug("HealthCheck requires a configuration when overrideConfiguration is enabled");
                    throw new HealthcheckInheritanceException();
                }

                if (
                    groupServices != null &&
                    groupServices.getHealthCheck() != null &&
                    !serviceHealthCheck.getType().equals(groupServices.getHealthCheck().getType())
                ) {
                    logger.debug(
                        "HealthCheck with type [{}] inherit configuration from another HealthCheck type [{}]",
                        serviceHealthCheck.getType(),
                        groupServices.getHealthCheck().getType()
                    );
                    throw new HealthcheckInheritanceException();
                }
            }
        }
    }
}
