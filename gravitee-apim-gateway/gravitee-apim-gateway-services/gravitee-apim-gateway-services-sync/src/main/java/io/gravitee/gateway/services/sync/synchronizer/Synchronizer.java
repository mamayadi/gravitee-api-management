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
package io.gravitee.gateway.services.sync.synchronizer;

import io.gravitee.common.component.LifecycleComponent;
import java.util.List;

/**
 * @author Guillaume LAMIRAND (guillaume.lamirand at graviteesource.com)
 * @author GraviteeSource Team
 */
public interface Synchronizer extends LifecycleComponent<Synchronizer> {
    /**
     * Synchronize the elements retrieving events from the datasource.
     *
     * @param lastRefreshAt the last timestamp the synchronization has been made. If -1 an initial synchronization will be perform, then incremental synchronization will be made.
     * @param nextLastRefreshAt the timestamp of the next synchronization planed.
     * @param environments the list of environments to filter events
     */
    void synchronize(Long lastRefreshAt, Long nextLastRefreshAt, List<String> environments);
}
