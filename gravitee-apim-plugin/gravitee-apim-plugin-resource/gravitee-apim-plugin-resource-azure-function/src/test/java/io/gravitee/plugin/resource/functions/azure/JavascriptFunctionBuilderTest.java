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
package io.gravitee.plugin.resource.functions.azure;

import static org.assertj.core.api.Assertions.*;

import io.gravitee.plugin.resource.AzureFunctionResourceConfiguration;
import io.gravitee.plugin.resource.helpers.FunctionBuilderException;
import io.gravitee.plugin.resource.helpers.javascript.JavascriptFunctionBuilder;
import java.nio.file.Path;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

class JavascriptFunctionBuilderTest {

    @Test
    @DisplayName("Builds a JS function zip file")
    void testJsZip() throws FunctionBuilderException {
        AzureFunctionResourceConfiguration config = new AzureFunctionResourceConfiguration();
        config.setFunctionCode("console.log('hello!')");
        config.setFunctionName("yolo");
        Path path = new JavascriptFunctionBuilder(config).zipFunction();
        assertThat(path.toString()).startsWith(config.getFunctionName());
        assertThat(path.toString()).endsWith(".zip");
    }
}
