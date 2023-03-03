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

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.assertj.core.api.AssertionsForClassTypes.assertThatExceptionOfType;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.lenient;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import io.gravitee.definition.model.v4.endpointgroup.Endpoint;
import io.gravitee.definition.model.v4.endpointgroup.EndpointGroup;
import io.gravitee.definition.model.v4.endpointgroup.loadbalancer.LoadBalancerType;
import io.gravitee.definition.model.v4.endpointgroup.service.EndpointGroupServices;
import io.gravitee.definition.model.v4.service.Service;
import io.gravitee.rest.api.service.exceptions.EndpointConfigurationValidationException;
import io.gravitee.rest.api.service.exceptions.EndpointMissingException;
import io.gravitee.rest.api.service.exceptions.EndpointNameInvalidException;
import io.gravitee.rest.api.service.exceptions.HealthcheckInheritanceException;
import io.gravitee.rest.api.service.exceptions.HealthcheckInvalidException;
import io.gravitee.rest.api.service.v4.ApiServicePluginService;
import io.gravitee.rest.api.service.v4.EndpointConnectorPluginService;
import io.gravitee.rest.api.service.v4.exception.*;
import io.gravitee.rest.api.service.v4.validation.EndpointGroupsValidationService;
import java.util.List;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;

/**
 * @author Guillaume LAMIRAND (guillaume.lamirand at graviteesource.com)
 * @author GraviteeSource Team
 */
@RunWith(MockitoJUnitRunner.class)
public class EndpointGroupsValidationServiceImplTest {

    public static final String FIXED_HC_CONFIG = "{fixed}";
    public static final String HEALTH_CHECK_TYPE = "http-health-check";

    @Mock
    private EndpointConnectorPluginService endpointService;

    @Mock
    private ApiServicePluginService apiServicePluginService;

    private EndpointGroupsValidationService endpointGroupsValidationService;

    @Before
    public void setUp() throws Exception {
        lenient()
            .when(endpointService.validateConnectorConfiguration(any(String.class), any()))
            .thenAnswer(invocation -> invocation.getArgument(1));
        lenient()
            .when(endpointService.validateEndpointGroupConfiguration(any(), any()))
            .thenAnswer(invocation -> invocation.getArgument(1));
        endpointGroupsValidationService = new EndpointGroupsValidationServiceImpl(endpointService, apiServicePluginService);
    }

    @Test(expected = EndpointMissingException.class)
    public void shouldReturnValidatedEndpointGroupsWithoutEndpointsAndWithoutDiscoveryService() {
        EndpointGroup endpointGroup = new EndpointGroup();
        endpointGroup.setName("my name");
        endpointGroup.setType("http");
        endpointGroup.setEndpoints(List.of());
        endpointGroupsValidationService.validateAndSanitize(List.of(endpointGroup));
    }

    @Test(expected = EndpointMissingException.class)
    public void shouldReturnValidatedEndpointGroupsWithoutEndpointsAndWithDisabledDiscoveryService() {
        EndpointGroup endpointGroup = new EndpointGroup();
        endpointGroup.setName("my name");
        endpointGroup.setType("http");
        endpointGroup.setEndpoints(List.of());
        Service discovery = new Service();
        discovery.setEnabled(false);
        EndpointGroupServices services = new EndpointGroupServices();
        services.setDiscovery(discovery);
        endpointGroup.setServices(services);
        endpointGroupsValidationService.validateAndSanitize(List.of(endpointGroup));
    }

    @Test
    public void shouldReturnValidatedEndpointGroupsWithoutEndpointsAndWithEnabledDiscoveryService() {
        EndpointGroup endpointGroup = new EndpointGroup();
        endpointGroup.setName("my name");
        endpointGroup.setType("http");
        endpointGroup.setEndpoints(List.of());
        Service discovery = new Service();
        discovery.setEnabled(true);
        EndpointGroupServices services = new EndpointGroupServices();
        services.setDiscovery(discovery);
        endpointGroup.setServices(services);
        List<EndpointGroup> endpointGroups = endpointGroupsValidationService.validateAndSanitize(List.of(endpointGroup));
        assertThat(endpointGroups).hasSize(1);
        EndpointGroup validatedEndpointGroup = endpointGroups.get(0);
        assertThat(validatedEndpointGroup.getName()).isEqualTo(endpointGroup.getName());
        assertThat(validatedEndpointGroup.getType()).isEqualTo(endpointGroup.getType());
        assertThat(validatedEndpointGroup.getEndpoints()).isEmpty();
        assertThat(validatedEndpointGroup.getServices()).isEqualTo(services);
        assertThat(validatedEndpointGroup.getSharedConfiguration()).isNull();
        assertThat(validatedEndpointGroup.getLoadBalancer()).isNotNull();
        assertThat(validatedEndpointGroup.getLoadBalancer().getType()).isEqualTo(LoadBalancerType.ROUND_ROBIN);
    }

    @Test
    public void shouldReturnValidatedEndpointGroupsWithEndpoints() {
        EndpointGroup endpointGroup = new EndpointGroup();
        endpointGroup.setName("my name");
        endpointGroup.setType("http");
        Endpoint endpoint = new Endpoint();
        endpoint.setName("endpoint");
        endpoint.setType("http");
        endpoint.setGroupConfiguration("minimalGroupConfiguration");
        endpointGroup.setEndpoints(List.of(endpoint));
        List<EndpointGroup> endpointGroups = endpointGroupsValidationService.validateAndSanitize(List.of(endpointGroup));
        assertThat(endpointGroups).hasSize(1);
        EndpointGroup validatedEndpointGroup = endpointGroups.get(0);
        assertThat(validatedEndpointGroup.getName()).isEqualTo(endpointGroup.getName());
        assertThat(validatedEndpointGroup.getType()).isEqualTo(endpointGroup.getType());
        assertThat(validatedEndpointGroup.getEndpoints()).isNotEmpty();
        List<Endpoint> endpoints = validatedEndpointGroup.getEndpoints();
        Endpoint validatedEndpoint = endpoints.get(0);
        assertThat(validatedEndpoint.getName()).isEqualTo("endpoint");
        assertThat(validatedEndpoint.getType()).isEqualTo("http");
        assertThat(validatedEndpointGroup.getServices()).isNotNull();
        assertThat(validatedEndpointGroup.getSharedConfiguration()).isNull();
        assertThat(validatedEndpointGroup.getLoadBalancer()).isNotNull();
        assertThat(validatedEndpointGroup.getLoadBalancer().getType()).isEqualTo(LoadBalancerType.ROUND_ROBIN);
    }

    @Test
    public void shouldReturnValidatedEndpointGroupsWithGroupHealthChecks() {
        EndpointGroup endpointGroup = new EndpointGroup();
        endpointGroup.setName("my name");
        endpointGroup.setType("http");
        endpointGroup.setSharedConfiguration("sharedConfiguration");
        Endpoint endpoint = new Endpoint();
        endpoint.setName("endpoint");
        endpoint.setType("http");
        endpoint.setInheritConfiguration(true);
        endpointGroup.setEndpoints(List.of(endpoint));

        Service healthCheck = new Service();
        healthCheck.setType(HEALTH_CHECK_TYPE);
        healthCheck.setEnabled(true);
        healthCheck.setConfiguration("{}");
        endpointGroup.getServices().setHealthCheck(healthCheck);

        when(apiServicePluginService.validateApiServiceConfiguration(eq(HEALTH_CHECK_TYPE), any())).thenReturn(FIXED_HC_CONFIG);

        List<EndpointGroup> endpointGroups = endpointGroupsValidationService.validateAndSanitize(List.of(endpointGroup));
        assertThat(endpointGroups.size()).isEqualTo(1);
        EndpointGroup validatedEndpointGroup = endpointGroups.get(0);
        assertThat(validatedEndpointGroup.getName()).isEqualTo(endpointGroup.getName());
        assertThat(validatedEndpointGroup.getType()).isEqualTo(endpointGroup.getType());
        assertThat(validatedEndpointGroup.getEndpoints()).isNotEmpty();
        List<Endpoint> endpoints = validatedEndpointGroup.getEndpoints();
        Endpoint validatedEndpoint = endpoints.get(0);
        assertThat(validatedEndpoint.getName()).isEqualTo("endpoint");
        assertThat(validatedEndpoint.getType()).isEqualTo("http");
        assertThat(validatedEndpointGroup.getServices())
            .isNotNull()
            .matches(svc -> svc.getHealthCheck().getConfiguration().equals(FIXED_HC_CONFIG));
        assertThat(validatedEndpointGroup.getSharedConfiguration()).isNotNull();
        assertThat(validatedEndpointGroup.getLoadBalancer()).isNotNull();
        assertThat(validatedEndpointGroup.getLoadBalancer().getType()).isEqualTo(LoadBalancerType.ROUND_ROBIN);
    }

    @Test(expected = HealthcheckInvalidException.class)
    public void shouldRejectEndpointGroupsWithInvalidHealthChecks_MissingType() {
        EndpointGroup endpointGroup = new EndpointGroup();
        endpointGroup.setName("my name");
        endpointGroup.setType("http");
        Endpoint endpoint = new Endpoint();
        endpoint.setName("endpoint");
        endpoint.setType("http");
        endpointGroup.setEndpoints(List.of(endpoint));

        Service healthCheck = new Service();
        healthCheck.setEnabled(true);
        healthCheck.setConfiguration("{}");
        endpointGroup.getServices().setHealthCheck(healthCheck);

        endpointGroupsValidationService.validateAndSanitize(List.of(endpointGroup));
    }

    @Test(expected = HealthcheckInvalidException.class)
    public void shouldRejectEndpointGroupsWithInvalidEndpointHealthChecks_MissingType() {
        EndpointGroup endpointGroup = new EndpointGroup();
        endpointGroup.setName("my name");
        endpointGroup.setType("http");
        Endpoint endpoint = new Endpoint();
        endpoint.setName("endpoint");
        endpoint.setType("http");
        endpointGroup.setEndpoints(List.of(endpoint));

        Service grpHealthCheck = new Service();
        grpHealthCheck.setEnabled(true);
        grpHealthCheck.setType(HEALTH_CHECK_TYPE);
        grpHealthCheck.setConfiguration("{}");
        endpointGroup.getServices().setHealthCheck(grpHealthCheck);

        Service healthCheck = new Service();
        healthCheck.setEnabled(true);
        healthCheck.setConfiguration("{}");
        endpoint.getServices().setHealthCheck(healthCheck);

        when(apiServicePluginService.validateApiServiceConfiguration(eq(HEALTH_CHECK_TYPE), any())).thenReturn(FIXED_HC_CONFIG);
        endpointGroupsValidationService.validateAndSanitize(List.of(endpointGroup));
    }

    @Test(expected = HealthcheckInheritanceException.class)
    public void shouldRejectEndpointGroupsWithEndpointHealthChecks_InheritError_noGroup() {
        EndpointGroup endpointGroup = new EndpointGroup();
        endpointGroup.setName("my name");
        endpointGroup.setType("http");
        Endpoint endpoint = new Endpoint();
        endpoint.setName("endpoint");
        endpoint.setType("http");
        endpointGroup.setEndpoints(List.of(endpoint));

        Service healthCheck = new Service();
        healthCheck.setEnabled(true);
        healthCheck.setConfiguration("{}");
        healthCheck.setType(HEALTH_CHECK_TYPE);
        healthCheck.setOverrideConfiguration(false);
        endpoint.getServices().setHealthCheck(healthCheck);

        when(apiServicePluginService.validateApiServiceConfiguration(eq(HEALTH_CHECK_TYPE), any())).thenReturn(FIXED_HC_CONFIG);
        endpointGroupsValidationService.validateAndSanitize(List.of(endpointGroup));
    }

    @Test(expected = HealthcheckInheritanceException.class)
    public void shouldRejectEndpointGroupsWithEndpointHealthChecks_InheritError_noConfig() {
        EndpointGroup endpointGroup = new EndpointGroup();
        endpointGroup.setName("my name");
        endpointGroup.setType("http");
        Endpoint endpoint = new Endpoint();
        endpoint.setName("endpoint");
        endpoint.setType("http");
        endpointGroup.setEndpoints(List.of(endpoint));

        Service healthCheck = new Service();
        healthCheck.setEnabled(true);

        healthCheck.setType(HEALTH_CHECK_TYPE);
        healthCheck.setOverrideConfiguration(true);
        endpoint.getServices().setHealthCheck(healthCheck);

        when(apiServicePluginService.validateApiServiceConfiguration(eq(HEALTH_CHECK_TYPE), any())).thenReturn(null);
        endpointGroupsValidationService.validateAndSanitize(List.of(endpointGroup));
    }

    @Test(expected = HealthcheckInheritanceException.class)
    public void shouldRejectEndpointGroupsWithGroupHealthChecksTypeIssue() {
        EndpointGroup endpointGroup = new EndpointGroup();
        endpointGroup.setName("my name");
        endpointGroup.setType("http");
        Endpoint endpoint = new Endpoint();
        endpoint.setName("endpoint");
        endpoint.setType("http");
        endpointGroup.setEndpoints(List.of(endpoint));

        Service grpHealthCheck = new Service();
        grpHealthCheck.setType("different-type");
        grpHealthCheck.setEnabled(true);
        grpHealthCheck.setConfiguration("{}");
        endpointGroup.getServices().setHealthCheck(grpHealthCheck);

        Service healthCheck = new Service();
        healthCheck.setType(HEALTH_CHECK_TYPE);
        healthCheck.setEnabled(true);
        healthCheck.setConfiguration("{}");
        endpoint.getServices().setHealthCheck(healthCheck);

        when(apiServicePluginService.validateApiServiceConfiguration(eq(grpHealthCheck.getType()), any())).thenReturn(FIXED_HC_CONFIG);
        when(apiServicePluginService.validateApiServiceConfiguration(eq(HEALTH_CHECK_TYPE), any())).thenReturn(FIXED_HC_CONFIG);

        List<EndpointGroup> endpointGroups = endpointGroupsValidationService.validateAndSanitize(List.of(endpointGroup));
        assertThat(endpointGroups.size()).isEqualTo(1);
        EndpointGroup validatedEndpointGroup = endpointGroups.get(0);
        assertThat(validatedEndpointGroup.getName()).isEqualTo(endpointGroup.getName());
        assertThat(validatedEndpointGroup.getType()).isEqualTo(endpointGroup.getType());
        assertThat(validatedEndpointGroup.getEndpoints()).isNotEmpty();
        List<Endpoint> endpoints = validatedEndpointGroup.getEndpoints();
        Endpoint validatedEndpoint = endpoints.get(0);
        assertThat(validatedEndpoint.getName()).isEqualTo("endpoint");
        assertThat(validatedEndpoint.getType()).isEqualTo("http");
        assertThat(validatedEndpointGroup.getServices())
            .isNotNull()
            .matches(svc -> svc.getHealthCheck().getConfiguration().equals(FIXED_HC_CONFIG));
        assertThat(validatedEndpointGroup.getSharedConfiguration()).isNull();
        assertThat(validatedEndpointGroup.getLoadBalancer()).isNotNull();
        assertThat(validatedEndpointGroup.getLoadBalancer().getType()).isEqualTo(LoadBalancerType.ROUND_ROBIN);
    }

    @Test
    public void shouldThrowValidationExceptionWithWrongEndpointGroupName() {
        EndpointGroup endpointGroup = new EndpointGroup();
        endpointGroup.setName(":");
        assertThatExceptionOfType(EndpointNameInvalidException.class)
            .isThrownBy(() -> endpointGroupsValidationService.validateAndSanitize(List.of(endpointGroup)));
    }

    @Test
    public void shouldThrowValidationExceptionWithEndpointNameAlreadyExists() {
        EndpointGroup endpointGroup = new EndpointGroup();
        endpointGroup.setName("my name");
        endpointGroup.setType("http");
        Endpoint endpoint = new Endpoint();
        endpoint.setName("my name");
        endpoint.setType("http");
        endpointGroup.setEndpoints(List.of(endpoint));

        assertThatExceptionOfType(EndpointNameAlreadyExistsException.class)
            .isThrownBy(() -> endpointGroupsValidationService.validateAndSanitize(List.of(endpointGroup)));
    }

    @Test
    public void shouldThrowValidationExceptionWithEndpointNameAlreadyExistsInAnotherGroup() {
        EndpointGroup endpointGroup = new EndpointGroup();
        endpointGroup.setName("group1");
        endpointGroup.setType("http");
        Endpoint endpoint = new Endpoint();
        endpoint.setName("my name");
        endpoint.setType("http");
        endpoint.setGroupConfiguration("minimalGroupConfiguration");
        endpointGroup.setEndpoints(List.of(endpoint));

        EndpointGroup endpointGroup2 = new EndpointGroup();
        endpointGroup2.setName("group2");
        endpointGroup2.setType("http");
        Endpoint endpoint2 = new Endpoint();
        endpoint2.setName("my name");
        endpoint2.setType("http");
        endpoint2.setGroupConfiguration("minimalGroupConfiguration");
        endpointGroup2.setEndpoints(List.of(endpoint2));

        assertThatExceptionOfType(EndpointNameAlreadyExistsException.class)
            .isThrownBy(() -> endpointGroupsValidationService.validateAndSanitize(List.of(endpointGroup, endpointGroup2)));
    }

    @Test
    public void shouldThrowValidationExceptionWithEndpointGroupNameAlreadyExistsInAnotherGroup() {
        EndpointGroup endpointGroup = new EndpointGroup();
        endpointGroup.setName("group1");
        endpointGroup.setType("http");
        endpointGroup.setSharedConfiguration("sharedConfiguration");
        Endpoint endpoint = new Endpoint();
        endpoint.setName("my name");
        endpoint.setType("http");
        endpoint.setInheritConfiguration(true);
        endpointGroup.setEndpoints(List.of(endpoint));

        EndpointGroup endpointGroup2 = new EndpointGroup();
        endpointGroup2.setName("my name");
        endpointGroup2.setType("http");
        endpointGroup2.setSharedConfiguration("sharedConfiguration");
        Endpoint endpoint2 = new Endpoint();
        endpoint2.setName("endpoint2");
        endpoint2.setType("http");
        endpoint2.setInheritConfiguration(true);
        endpointGroup2.setEndpoints(List.of(endpoint2));

        assertThatExceptionOfType(EndpointGroupNameAlreadyExistsException.class)
            .isThrownBy(() -> endpointGroupsValidationService.validateAndSanitize(List.of(endpointGroup, endpointGroup2)));
    }

    @Test
    public void shouldThrowValidationExceptionWithWrongEndpointGroupType() {
        EndpointGroup endpointGroup = new EndpointGroup();
        endpointGroup.setName("name");
        assertThatExceptionOfType(EndpointGroupTypeInvalidException.class)
            .isThrownBy(() -> endpointGroupsValidationService.validateAndSanitize(List.of(endpointGroup)));
    }

    @Test
    public void shouldThrowValidationExceptionWithWrongEndpointName() {
        EndpointGroup endpointGroup = new EndpointGroup();
        endpointGroup.setName("name");
        endpointGroup.setType("http");
        Endpoint endpoint = new Endpoint();
        endpoint.setName(":");
        endpoint.setType("http");
        endpointGroup.setEndpoints(List.of(endpoint));
        assertThatExceptionOfType(EndpointNameInvalidException.class)
            .isThrownBy(() -> endpointGroupsValidationService.validateAndSanitize(List.of(endpointGroup)));
    }

    @Test
    public void shouldThrowValidationExceptionWithWrongEndpointType() {
        EndpointGroup endpointGroup = new EndpointGroup();
        endpointGroup.setName("group");
        endpointGroup.setType("http");
        Endpoint endpoint = new Endpoint();
        endpoint.setName("endpoint");
        endpointGroup.setEndpoints(List.of(endpoint));
        assertThatExceptionOfType(EndpointTypeInvalidException.class)
            .isThrownBy(() -> endpointGroupsValidationService.validateAndSanitize(List.of(endpointGroup)));
    }

    @Test
    public void shouldThrowValidationExceptionWithMismatch() {
        EndpointGroup endpointGroup = new EndpointGroup();
        endpointGroup.setName("group");
        endpointGroup.setType("http");
        Endpoint endpoint = new Endpoint();
        endpoint.setName("endpoint");
        endpoint.setType("wrong");
        endpointGroup.setEndpoints(List.of(endpoint));
        assertThatExceptionOfType(EndpointGroupTypeMismatchInvalidException.class)
            .isThrownBy(() -> endpointGroupsValidationService.validateAndSanitize(List.of(endpointGroup)));
    }

    @Test(expected = EndpointMissingException.class)
    public void shouldThrowExceptionWithNullParameter() {
        assertThat(endpointGroupsValidationService.validateAndSanitize(null)).isNull();
    }

    @Test
    public void shouldValidateSharedConfiguration() {
        EndpointGroup endpointGroup = new EndpointGroup();
        endpointGroup.setName("my name");
        endpointGroup.setType("http");
        endpointGroup.setSharedConfiguration("sharedConfiguration");
        endpointGroup.setEndpoints(List.of());
        Service discovery = new Service();
        discovery.setEnabled(true);
        EndpointGroupServices services = new EndpointGroupServices();
        services.setDiscovery(discovery);
        endpointGroup.setServices(services);
        List<EndpointGroup> endpointGroups = endpointGroupsValidationService.validateAndSanitize(List.of(endpointGroup));
        assertThat(endpointGroups).hasSize(1);
        EndpointGroup validatedEndpointGroup = endpointGroups.get(0);
        assertThat(validatedEndpointGroup.getName()).isEqualTo(endpointGroup.getName());
        assertThat(validatedEndpointGroup.getType()).isEqualTo(endpointGroup.getType());
        assertThat(validatedEndpointGroup.getEndpoints()).isEmpty();
        assertThat(validatedEndpointGroup.getServices()).isEqualTo(services);
        assertThat(validatedEndpointGroup.getSharedConfiguration()).isNotNull();
        assertThat(validatedEndpointGroup.getLoadBalancer()).isNotNull();
        assertThat(validatedEndpointGroup.getLoadBalancer().getType()).isEqualTo(LoadBalancerType.ROUND_ROBIN);
        verify(endpointService).validateEndpointGroupConfiguration(any(), eq(endpointGroup.getSharedConfiguration()));
    }

    @Test
    public void shouldValidateEndpointGroupConfiguration() {
        EndpointGroup endpointGroup = new EndpointGroup();
        endpointGroup.setName("my name");
        endpointGroup.setType("http-proxy");
        endpointGroup.setSharedConfiguration("sharedConfiguration");
        Service discovery = new Service();
        discovery.setEnabled(true);
        EndpointGroupServices services = new EndpointGroupServices();
        services.setDiscovery(discovery);
        endpointGroup.setServices(services);

        Endpoint endpoint = new Endpoint();
        endpoint.setName("endpoint");
        endpoint.setType("http-proxy");
        endpoint.setInheritConfiguration(false);
        endpoint.setGroupConfiguration("groupConfiguration");

        endpointGroup.setEndpoints(List.of(endpoint));

        List<EndpointGroup> endpointGroups = endpointGroupsValidationService.validateAndSanitize(List.of(endpointGroup));
        assertThat(endpointGroups).hasSize(1);
        EndpointGroup validatedEndpointGroup = endpointGroups.get(0);
        assertThat(validatedEndpointGroup.getName()).isEqualTo(endpointGroup.getName());
        assertThat(validatedEndpointGroup.getType()).isEqualTo(endpointGroup.getType());
        assertThat(validatedEndpointGroup.getServices()).isEqualTo(services);
        assertThat(validatedEndpointGroup.getSharedConfiguration()).isNotNull();
        assertThat(validatedEndpointGroup.getLoadBalancer()).isNotNull();
        assertThat(validatedEndpointGroup.getLoadBalancer().getType()).isEqualTo(LoadBalancerType.ROUND_ROBIN);
        assertThat(validatedEndpointGroup.getEndpoints())
            .hasSize(1)
            .first()
            .extracting("groupConfiguration")
            .isEqualTo("groupConfiguration");
        verify(endpointService).validateEndpointGroupConfiguration(any(), eq(endpointGroup.getSharedConfiguration()));
        verify(endpointService).validateEndpointGroupConfiguration(any(), eq(endpoint.getGroupConfiguration()));
    }

    @Test
    public void shouldNotValidateEndpointGroupWhenTryingToInheritANullSharedConfiguration() {
        EndpointGroup endpointGroup = new EndpointGroup();
        endpointGroup.setName("my name");
        endpointGroup.setType("http-proxy");
        endpointGroup.setSharedConfiguration((String) null);
        Service discovery = new Service();
        discovery.setEnabled(true);
        EndpointGroupServices services = new EndpointGroupServices();
        services.setDiscovery(discovery);
        endpointGroup.setServices(services);

        Endpoint endpoint = new Endpoint();
        endpoint.setName("endpoint");
        endpoint.setType("http-proxy");
        endpoint.setInheritConfiguration(true);
        endpoint.setGroupConfiguration("groupConfiguration");

        endpointGroup.setEndpoints(List.of(endpoint));

        assertThatThrownBy(() -> endpointGroupsValidationService.validateAndSanitize(List.of(endpointGroup)))
            .isInstanceOf(EndpointConfigurationValidationException.class)
            .hasMessage("Impossible to inherit from a null shared configuration for endpoint: endpoint");
        verify(endpointService, never()).validateEndpointGroupConfiguration(any(), eq(endpointGroup.getSharedConfiguration()));
        verify(endpointService, never()).validateEndpointGroupConfiguration(any(), eq(endpoint.getGroupConfiguration()));
    }

    @Test
    public void shouldNotValidateEndpointGroupWhenNotInheritingNorOverriding() {
        EndpointGroup endpointGroup = new EndpointGroup();
        endpointGroup.setName("my name");
        endpointGroup.setType("http-proxy");
        endpointGroup.setSharedConfiguration("minimalSharedConfiguration");
        Service discovery = new Service();
        discovery.setEnabled(true);
        EndpointGroupServices services = new EndpointGroupServices();
        services.setDiscovery(discovery);
        endpointGroup.setServices(services);

        Endpoint endpoint = new Endpoint();
        endpoint.setName("endpoint");
        endpoint.setType("http-proxy");
        endpoint.setInheritConfiguration(false);
        endpoint.setGroupConfiguration((String) null);

        endpointGroup.setEndpoints(List.of(endpoint));

        endpointGroupsValidationService.validateAndSanitize(List.of(endpointGroup));
        verify(endpointService).validateEndpointGroupConfiguration(any(), eq(endpointGroup.getSharedConfiguration()));
        verify(endpointService, never()).validateEndpointGroupConfiguration(any(), eq(endpoint.getGroupConfiguration()));
        verify(endpointService).validateEndpointGroupConfiguration(any(), eq("{}"));
    }
}
