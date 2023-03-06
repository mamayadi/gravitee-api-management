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
package io.gravitee.repository.management.api;

import io.gravitee.common.data.domain.Page;
import io.gravitee.repository.exceptions.TechnicalException;
import io.gravitee.repository.management.api.search.EventCriteria;
import io.gravitee.repository.management.api.search.Pageable;
import io.gravitee.repository.management.model.Event;
import java.util.List;

/**
 * Event API.
 *
 * @author David BRASSELY (david.brassely at graviteesource.com)
 * @author Titouan COMPIEGNE (titouan.compiegne at graviteesource.com)
 * @author GraviteeSource Team
 */
public interface EventRepository extends CrudRepository<Event, String> {
    /**
     * Search for {@link Event} with {@link Pageable} feature.
     *
     * <p>
     *  Note that events must be ordered by update date in DESC mode.
     * </p>
     *
     * @param filter Event criteria to search for {@link Event}.
     * @param pageable If user wants a paginable result. Can be <code>null</code>.
     * @return the list of events.
     */
    Page<Event> search(EventCriteria filter, Pageable pageable);
    /**
     * Search for {@link Event}.
     *
     * <p>
     *  Note that events must be ordered by update date in DESC mode.
     * </p>
     * @param filter Event criteria to search for {@link Event}.
     * @return the list of events.
     */
    List<Event> search(EventCriteria filter);

    /**
     * This method allows to create an event if it does not exist in database or patch it if it's present.
     *
     * <p>
     * The patch allows to pass a partial {@link Event}: <br/>
     * - For the root fields of {@link Event} object, the update will perform only on non-null fields. It's not possible to update to null one of these fields<br/>
     * - For the properties map, it will update the property value based on its key.
     * </p>
     *
     * createdAt field is not updatable
     * @param event
     * @return the event passed as parameter.
     * @throws TechnicalException
     */
    Event createOrPatch(Event event) throws TechnicalException;
}
