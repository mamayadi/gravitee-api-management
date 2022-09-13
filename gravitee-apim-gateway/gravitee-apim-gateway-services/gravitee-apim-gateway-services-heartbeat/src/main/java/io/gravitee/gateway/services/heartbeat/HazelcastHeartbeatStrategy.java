package io.gravitee.gateway.services.heartbeat;

import static io.gravitee.gateway.services.heartbeat.HeartbeatService.*;

import io.gravitee.gateway.services.heartbeat.spring.configuration.HeartbeatDependencies;
import io.gravitee.node.api.cluster.ClusterManager;
import io.gravitee.node.api.message.Message;
import io.gravitee.node.api.message.MessageConsumer;
import io.gravitee.node.api.message.MessageProducer;
import io.gravitee.node.api.message.Topic;
import io.gravitee.repository.management.api.EventRepository;
import io.gravitee.repository.management.model.Event;
import io.gravitee.repository.management.model.EventType;
import java.util.*;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;
import java.util.function.Supplier;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class HazelcastHeartbeatStrategy implements HeartbeatStrategy, MessageConsumer<Event> {

    private static final Logger LOGGER = LoggerFactory.getLogger(HazelcastHeartbeatStrategy.class);
    public static final String HEARTBEATS = "heartbeats";
    public static final String HEARTBEATS_FAILURE = "heartbeats-failure";

    private ExecutorService executorService;

    private final ClusterManager clusterManager;

    private final EventRepository eventRepository;

    private final int delay;

    private final TimeUnit unit;

    // How to avoid duplicate
    private final Topic<Event> topic;

    private final Topic<Event> topicFailure;

    private final java.util.UUID subscriptionId;

    private java.util.UUID subscriptionFailureId;

    private Event heartbeatEvent;

    public HazelcastHeartbeatStrategy(
        HeartbeatDependencies heartbeatDependencies,
        ClusterManager clusterManager,
        MessageProducer messageProducer
    ) {
        this.clusterManager = clusterManager;
        this.eventRepository = heartbeatDependencies.getEventRepository();
        this.delay = heartbeatDependencies.getDelay();
        this.unit = heartbeatDependencies.getUnit();
        this.topic = messageProducer.getTopic(HEARTBEATS);
        this.topicFailure = messageProducer.getTopic(HEARTBEATS_FAILURE);
        this.subscriptionId = topic.addMessageConsumer(this);
    }

    @Override
    public void doStart(Supplier<Event> prepareEvent) {
        LOGGER.info("Start gateway heartbeat");

        heartbeatEvent = prepareEvent.get();

        topic.publish(heartbeatEvent);

        executorService = Executors.newSingleThreadScheduledExecutor(r -> new Thread(r, "gio-heartbeat"));

        HeartbeatThread monitorThread = new HeartbeatThread(topic, heartbeatEvent);

        subscriptionFailureId = topicFailure.addMessageConsumer(monitorThread);

        LOGGER.info("Monitoring scheduled with fixed delay {} {} ", delay, unit.name());

        ((ScheduledExecutorService) executorService).scheduleWithFixedDelay(monitorThread, delay, delay, unit);

        LOGGER.info("Start gateway heartbeat: DONE");
    }

    @Override
    public void onMessage(Message<Event> message) {
        // Writing event to the repository is the responsibility of the master node
        if (clusterManager.isMasterNode()) {
            Event event = message.getMessageObject();

            String state = event.getProperties().get(EVENT_STATE_PROPERTY);
            try {
                if (state != null) {
                    eventRepository.create(event);
                    // Remove the state to not include it in the underlying repository as it's just used for internal purpose
                    heartbeatEvent.getProperties().remove(EVENT_STATE_PROPERTY);
                } else {
                    eventRepository.update(event);
                }
            } catch (Exception ex) {
                // We make the assumption that an Exception is thrown when trying to
                //  - create (duplicate key)
                //  - or update (id not found)
                // event while it is not existing in the database anymore.
                // This can be caused, for instance, by a db event cleanup without taking care of the heartbeat event.
                LOGGER.warn(
                    "An error occurred while trying to create or update the heartbeat event id[{}] type[{}]",
                    event.getId(),
                    event.getType(),
                    ex
                );
                event.getProperties().put(EVENT_STATE_PROPERTY, "recreate");
                topicFailure.publish(event);
            }
        }
    }

    @Override
    public void preStop() throws Exception {
        heartbeatEvent.setType(EventType.GATEWAY_STOPPED);
        heartbeatEvent.getProperties().put(EVENT_STOPPED_AT_PROPERTY, Long.toString(new Date().getTime()));
        LOGGER.debug("Pre-stopping Heartbeat Service");
        LOGGER.debug("Sending a {} event", heartbeatEvent.getType());

        topic.publish(heartbeatEvent);

        topic.removeMessageConsumer(subscriptionId);
    }

    @Override
    public void doStop() {
        if (!executorService.isShutdown()) {
            LOGGER.info("Stop gateway monitor");
            executorService.shutdownNow();
        } else {
            LOGGER.info("Gateway monitor already shut-downed");
        }

        heartbeatEvent.setType(EventType.GATEWAY_STOPPED);
        heartbeatEvent.getProperties().put(EVENT_STOPPED_AT_PROPERTY, Long.toString(new Date().getTime()));
        LOGGER.debug("Sending a {} event", heartbeatEvent.getType());

        topic.publish(heartbeatEvent);

        topic.removeMessageConsumer(subscriptionId);

        topicFailure.removeMessageConsumer(subscriptionFailureId);

        LOGGER.info("Stop gateway monitor : DONE");
    }
}
