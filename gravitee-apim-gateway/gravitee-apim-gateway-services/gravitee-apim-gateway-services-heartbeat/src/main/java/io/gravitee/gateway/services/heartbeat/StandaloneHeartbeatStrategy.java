package io.gravitee.gateway.services.heartbeat;

import static io.gravitee.gateway.services.heartbeat.HeartbeatService.EVENT_LAST_HEARTBEAT_PROPERTY;

import io.gravitee.gateway.services.heartbeat.spring.configuration.HeartbeatDependencies;
import io.gravitee.repository.exceptions.TechnicalException;
import io.gravitee.repository.management.api.EventRepository;
import io.gravitee.repository.management.model.Event;
import java.util.Date;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;
import java.util.function.Supplier;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class StandaloneHeartbeatStrategy implements HeartbeatStrategy {

    private static final Logger LOGGER = LoggerFactory.getLogger(StandaloneHeartbeatStrategy.class);

    private ExecutorService executorService;
    private EventRepository eventRepository;
    private final int delay;
    private final TimeUnit unit;
    private Event createdHeartbeatEvent;

    public StandaloneHeartbeatStrategy(HeartbeatDependencies heartbeatDependencies) {
        this.delay = heartbeatDependencies.getDelay();
        this.unit = heartbeatDependencies.getUnit();
        this.eventRepository = heartbeatDependencies.getEventRepository();
    }

    @Override
    public void doStart(Supplier<Event> prepareEvent) throws Exception {
        LOGGER.info("Start gateway heartbeat");

        createdHeartbeatEvent = prepareEvent.get();

        executorService = Executors.newSingleThreadScheduledExecutor(r -> new Thread(r, "gio-heartbeat"));

        LOGGER.info("Monitoring scheduled with fixed delay {} {} ", delay, unit.name());

        ((ScheduledExecutorService) executorService).scheduleWithFixedDelay(this::sendHeartbeatEvent, 0, delay, unit);

        LOGGER.info("Start gateway heartbeat: DONE");
    }

    @Override
    public void doStop() {}

    private void sendHeartbeatEvent() {
        // Try to create till the event is effectively created
        if (createdHeartbeatEvent == null) {
            sendInitHeartbeatEvent();
        } else {
            sendUpdatedHeartbeatEvent();
        }
    }

    private void sendInitHeartbeatEvent() {
        try {
            createdHeartbeatEvent = eventRepository.create(prepareEvent());
        } catch (TechnicalException e) {
            throw new RuntimeException(e);
        }
    }

    private void sendUpdatedHeartbeatEvent() {
        Date updatedAt = new Date();
        createdHeartbeatEvent.setUpdatedAt(updatedAt);
        createdHeartbeatEvent.getProperties().put(EVENT_LAST_HEARTBEAT_PROPERTY, Long.toString(updatedAt.getTime()));
        try {
            createdHeartbeatEvent = eventRepository.update(createdHeartbeatEvent);
        } catch (TechnicalException e) {
            throw new RuntimeException(e);
        }
    }

    private Event prepareEvent() {
        return null;
    }
}
