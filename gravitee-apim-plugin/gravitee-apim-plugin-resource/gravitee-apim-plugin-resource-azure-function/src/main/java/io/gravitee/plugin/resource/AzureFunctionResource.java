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
package io.gravitee.plugin.resource;

import io.gravitee.plugin.resource.helpers.java.JavaFunctionBuilder;
import io.gravitee.resource.api.AbstractConfigurableResource;
import java.nio.file.Path;

/**
 * @author Yann TAVERNIER (yann.tavernier at graviteesource.com)
 * @author GraviteeSource Team
 */
public class AzureFunctionResource extends AbstractConfigurableResource<AzureFunctionResourceConfiguration> {

    @Override
    protected void doStart() throws Exception {
        super.doStart();
        // Get java code from configuration
        // Use what's in resource folder to generate a zip fpr the function
        // Then, push the zip to javascript thanks to https://learn.microsoft.com/en-us/azure/azure-functions/deployment-zip-push#rest

        // ⚠️ what if we restart the gateway and function has already been deployed ? Maybe add a "force redeploy" configuration to override the deployed one.

        // FIXME: pass the configuration code as a parameter to generate the function needed by the user.
        final Path javaZipPath = new JavaFunctionBuilder().buildFunction();
    }
}
