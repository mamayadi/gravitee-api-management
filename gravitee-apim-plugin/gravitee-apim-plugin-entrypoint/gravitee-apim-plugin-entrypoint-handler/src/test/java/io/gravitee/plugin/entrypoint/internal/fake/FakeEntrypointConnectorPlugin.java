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
package io.gravitee.plugin.entrypoint.internal.fake;

import io.gravitee.gateway.jupiter.api.connector.AbstractConnectorFactory;
import io.gravitee.plugin.core.api.PluginManifest;
import io.gravitee.plugin.entrypoint.EntrypointConnectorPlugin;
import java.net.URL;
import java.nio.file.Path;

/**
 * @author Guillaume LAMIRAND (guillaume.lamirand at graviteesource.com)
 * @author GraviteeSource Team
 */
public class FakeEntrypointConnectorPlugin implements EntrypointConnectorPlugin {

    @Override
    public String id() {
        return "fake-entrypoint";
    }

    @Override
    public String clazz() {
        return FakeEntrypointConnectorFactory.class.getCanonicalName();
    }

    @Override
    public Class<? extends AbstractConnectorFactory<?>> entrypointConnectorFactory() {
        return FakeEntrypointConnectorFactory.class;
    }

    @Override
    public String type() {
        return "entrypoint-connector";
    }

    @Override
    public Path path() {
        return null;
    }

    @Override
    public PluginManifest manifest() {
        return null;
    }

    @Override
    public URL[] dependencies() {
        return new URL[0];
    }

    @Override
    public Class<?> configuration() {
        return null;
    }
}