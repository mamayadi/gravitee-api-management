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
package io.gravitee.rest.api.service;

import io.gravitee.plugin.core.api.PluginMoreInformation;
import io.gravitee.rest.api.model.platform.plugin.PlatformPluginEntity;
import java.util.Set;

/**
 * @author David BRASSELY (david.brassely at graviteesource.com)
 * @author GraviteeSource Team
 */
public interface PluginService<T extends PlatformPluginEntity> {
    Set<T> findAll();

    T findById(String plugin);

    String getSchema(String plugin);

    String getIcon(String plugin);

    String getDocumentation(String plugin);

    PluginMoreInformation getMoreInformation(String pluginId);
}
