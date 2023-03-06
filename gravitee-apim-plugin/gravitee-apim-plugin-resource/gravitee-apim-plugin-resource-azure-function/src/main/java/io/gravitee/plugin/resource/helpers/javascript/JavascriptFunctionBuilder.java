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
package io.gravitee.plugin.resource.helpers.javascript;

import io.gravitee.plugin.resource.AzureFunctionResourceConfiguration;
import io.gravitee.plugin.resource.helpers.AbstractFunctionBuilder;
import io.gravitee.plugin.resource.helpers.FunctionBuilderException;
import java.io.*;
import java.nio.file.Path;
import java.util.UUID;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

/**
 * @author GraviteeSource Team
 */
public class JavascriptFunctionBuilder extends AbstractFunctionBuilder {

    private static final String HOST_FILE_NAME = "host.json";
    private static final String FUNCTION_FILE_NAME = "index.js";
    private static final String BINDINGS_FILE_NAME = "function.json";

    private static final String RESOURCES = "javascript";

    private static final String LEADING_BLOCK = "module.exports = async function (context, req) {";
    private static final String CLOSING_BLOCK = "}";

    private final String functionFile;
    private final String bindingsFile;
    private final String functionCode;
    private final String zipFile;

    public JavascriptFunctionBuilder(AzureFunctionResourceConfiguration configuration) {
        super(configuration);
        functionFile = Path.of(configuration.getFunctionName(), FUNCTION_FILE_NAME).toString();
        bindingsFile = Path.of(configuration.getFunctionName(), BINDINGS_FILE_NAME).toString();
        functionCode = configuration.getFunctionCode();
        zipFile = getZipFileName(configuration);
    }

    @Override
    public String toString() {
        return LEADING_BLOCK.concat(functionCode).concat(CLOSING_BLOCK);
    }

    public Path zipFunction() throws FunctionBuilderException {
        try (ZipOutputStream zip = new ZipOutputStream(new FileOutputStream(zipFile))) {
            addEntry(zip, functionFile, getCodeAsStream());
            addEntry(zip, bindingsFile, getResourceAsStream(BINDINGS_FILE_NAME));
            addEntry(zip, HOST_FILE_NAME, getResourceAsStream(HOST_FILE_NAME));
            return Path.of(zipFile);
        } catch (IOException e) {
            throw new FunctionBuilderException(e);
        }
    }

    @Override
    public void packageFunction() throws FunctionBuilderException {
        // Do nothing
    }

    @Override
    public void deployFunction() throws FunctionBuilderException {
        // Do nothing
    }

    private void addEntry(ZipOutputStream zip, String fileName, InputStream content) throws IOException {
        ZipEntry entry = new ZipEntry(fileName);
        zip.putNextEntry(entry);
        zip.write(content.readAllBytes());
        zip.closeEntry();
        content.close();
    }

    private InputStream getResourceAsStream(String fileName) {
        String path = Path.of(RESOURCES, fileName).toString();
        InputStream stream = getClass().getClassLoader().getResourceAsStream(path);
        if (stream == null) {
            throw new IllegalStateException("Resource " + path + " not found");
        }
        return stream;
    }

    private InputStream getCodeAsStream() {
        return new ByteArrayInputStream(toString().getBytes());
    }

    private static String getZipFileName(AzureFunctionResourceConfiguration configuration) {
        return String.format("%s-%s.zip", configuration.getFunctionName(), UUID.randomUUID());
    }
}
