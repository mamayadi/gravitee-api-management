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
package io.gravitee.repository.mongodb.management;

import io.gravitee.repository.exceptions.TechnicalException;
import io.gravitee.repository.management.api.EventLatestRepository;
import io.gravitee.repository.management.api.search.EventCriteria;
import io.gravitee.repository.management.model.Event;
import io.gravitee.repository.management.model.EventType;
import io.gravitee.repository.mongodb.management.internal.eventLatest.event.EventLatestMongoRepository;
import io.gravitee.repository.mongodb.management.internal.model.EventLatestMongo;
import io.gravitee.repository.mongodb.management.mapper.GraviteeMapper;
import java.util.List;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

/**
 * @author Guillaume LAMIRAND (guillaume.lamirand at graviteesource.com)
 * @author GraviteeSource Team
 */
@Slf4j
@Component
public class MongoEventLatestRepository implements EventLatestRepository {

    @Autowired
    private EventLatestMongoRepository internalEventRepo;

    @Autowired
    private GraviteeMapper mapper;

    @Override
    public Event createOrPatch(Event event) {
        if (event == null || event.getId() == null || event.getType() == null) {
            throw new IllegalStateException("Event to create or update must have an id and a type");
        }

        EventLatestMongo eventMongo = mapEvent(event);
        EventLatestMongo createdEventMongo = internalEventRepo.save(eventMongo);

        return mapEvent(createdEventMongo);
    }

    @Override
    public void delete(String id) throws TechnicalException {
        try {
            internalEventRepo.deleteById(id);
        } catch (Exception e) {
            log.error("An error occurred when deleting event [{}]", id, e);
            throw new TechnicalException("An error occurred when deleting event");
        }
    }

    @Override
    public List<Event> search(EventCriteria criteria, Event.EventProperties group, Long page, Long size) {
        List<EventLatestMongo> eventsMongo = internalEventRepo.search(criteria, group, page, size);
        return mapper.collection2list(eventsMongo, EventLatestMongo.class, Event.class);
    }

    private EventLatestMongo mapEvent(Event event) {
        if (event == null) {
            return null;
        }

        EventLatestMongo eventMongo = new EventLatestMongo();
        eventMongo.setId(event.getId());
        eventMongo.setEnvironments(event.getEnvironments());
        eventMongo.setType(event.getType().toString());
        eventMongo.setPayload(event.getPayload());
        eventMongo.setParentId(event.getParentId());
        eventMongo.setProperties(event.getProperties());
        eventMongo.setCreatedAt(event.getCreatedAt());
        eventMongo.setUpdatedAt(event.getUpdatedAt());

        return eventMongo;
    }

    private Event mapEvent(EventLatestMongo eventMongo) {
        if (eventMongo == null) {
            return null;
        }

        Event event = new Event();
        event.setId(eventMongo.getId());
        event.setEnvironments(eventMongo.getEnvironments());
        event.setType(EventType.valueOf(eventMongo.getType()));
        event.setPayload(eventMongo.getPayload());
        event.setParentId(eventMongo.getParentId());
        event.setProperties(eventMongo.getProperties());
        event.setCreatedAt(eventMongo.getCreatedAt());
        event.setUpdatedAt(eventMongo.getUpdatedAt());

        return event;
    }
}
