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

import io.gravitee.plugin.resource.functions.azure.Function;
import io.gravitee.plugin.resource.helpers.java.JavaFunctionBuilder;
import io.gravitee.resource.api.AbstractConfigurableResource;
import java.io.*;
import java.nio.file.FileVisitResult;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.SimpleFileVisitor;
import java.nio.file.attribute.BasicFileAttributes;
import java.util.List;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;
import org.apache.maven.shared.invoker.DefaultInvocationRequest;
import org.apache.maven.shared.invoker.DefaultInvoker;
import org.apache.maven.shared.invoker.InvocationRequest;
import org.apache.maven.shared.invoker.InvocationResult;
import org.apache.maven.shared.invoker.Invoker;

/**
 * @author Yann TAVERNIER (yann.tavernier at graviteesource.com)
 * @author GraviteeSource Team
 */
public class AzureFunctionResource extends AbstractConfigurableResource<AzureFunctionResourceConfiguration> {

    private static final String ZIP_FILE_NAME = "graviteeio-azure-function.zip";
    private static final String HOST_FILE = "azure/host.json";
    private static final String BINDINGS_FILE = "azure/function.json";

    @Override
    protected void doStart() throws Exception {
        super.doStart();
        zipFunction(new Function(configuration().getFunctionCode()));
        // Get java code from configuration
        // Use what's in resource folder to generate a zip fpr the function
        // Then, push the zip to azure thanks to https://learn.microsoft.com/en-us/azure/azure-functions/deployment-zip-push#rest

        // ⚠️ what if we restart the gateway and function has already been deployed ? Maybe add a "force redeploy" configuration to override the deployed one.

        // FIXME: pass the configuration code as a parameter to generate the function needed by the user.
        final Path javaZipPath = new JavaFunctionBuilder().buildFunction();
    }

    private void zipFunction(Function function) throws IOException {
        try (ZipOutputStream zos = new ZipOutputStream(new FileOutputStream(ZIP_FILE_NAME))) {
            zipFunctionCode(function, zos);
            zipFunctionDescriptor(HOST_FILE, zos);
            zipFunctionDescriptor(BINDINGS_FILE, zos);
            zos.closeEntry();
        }
    }

    private void zipFunctionCode(Function function, ZipOutputStream zos) throws IOException {
        ZipEntry functionEntry = new ZipEntry(function.fileName());
        zos.putNextEntry(functionEntry);
        ByteArrayInputStream functionContent = new ByteArrayInputStream(function.toString().getBytes());
        zos.write(functionContent.readAllBytes());
    }

    private void zipFunctionDescriptor(String fileName, ZipOutputStream zos) throws IOException {
        ZipEntry hostEntry = new ZipEntry(fileName);
        zos.putNextEntry(hostEntry);
        InputStream stream = getClass().getResourceAsStream(fileName);
        if (stream == null) {
            throw new IllegalStateException("Resource " + fileName + "not found");
        }
        zos.write(stream.readAllBytes());
    }
}
