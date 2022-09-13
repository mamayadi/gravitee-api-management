package io.gravitee.gateway.services.heartbeat.spring.configuration;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.gravitee.gateway.env.GatewayConfiguration;
import io.gravitee.node.api.Node;
import io.gravitee.plugin.core.api.PluginRegistry;
import io.gravitee.repository.management.api.EnvironmentRepository;
import io.gravitee.repository.management.api.EventRepository;
import io.gravitee.repository.management.api.OrganizationRepository;
import java.util.concurrent.TimeUnit;

public class HeartbeatDependencies {

    private boolean enabled;
    private int delay;
    private TimeUnit unit;
    private boolean storeSystemProperties;
    private String port;
    private ObjectMapper objectMapper;
    private Node node;
    private EnvironmentRepository environmentRepository;
    private OrganizationRepository organizationRepository;
    private EventRepository eventRepository;
    private GatewayConfiguration gatewayConfiguration;
    private PluginRegistry pluginRegistry;

    public HeartbeatDependencies(
        boolean enabled,
        int delay,
        TimeUnit unit,
        boolean storeSystemProperties,
        String port,
        ObjectMapper objectMapper,
        Node node,
        EnvironmentRepository environmentRepository,
        OrganizationRepository organizationRepository,
        EventRepository eventRepository,
        GatewayConfiguration gatewayConfiguration,
        PluginRegistry pluginRegistry
    ) {
        this.enabled = enabled;
        this.delay = delay;
        this.unit = unit;
        this.storeSystemProperties = storeSystemProperties;
        this.port = port;
        this.objectMapper = objectMapper;
        this.node = node;
        this.environmentRepository = environmentRepository;
        this.organizationRepository = organizationRepository;
        this.eventRepository = eventRepository;
        this.gatewayConfiguration = gatewayConfiguration;
        this.pluginRegistry = pluginRegistry;
    }

    public HeartbeatDependencies() {}

    public boolean isEnabled() {
        return enabled;
    }

    public int getDelay() {
        return delay;
    }

    public TimeUnit getUnit() {
        return unit;
    }

    public boolean isStoreSystemProperties() {
        return storeSystemProperties;
    }

    public String getPort() {
        return port;
    }

    public ObjectMapper getObjectMapper() {
        return objectMapper;
    }

    public Node getNode() {
        return node;
    }

    public EnvironmentRepository getEnvironmentRepository() {
        return environmentRepository;
    }

    public OrganizationRepository getOrganizationRepository() {
        return organizationRepository;
    }

    public EventRepository getEventRepository() {
        return eventRepository;
    }

    public GatewayConfiguration getGatewayConfiguration() {
        return gatewayConfiguration;
    }

    public PluginRegistry getPluginRegistry() {
        return pluginRegistry;
    }
}
