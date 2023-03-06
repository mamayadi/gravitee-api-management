/**
 * Copyright (C) 2015 The Gravitee team (http://gravitee.io)
 * <p>
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * <p>
 * http://www.apache.org/licenses/LICENSE-2.0
 * <p>
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package io.gravitee.plugin.resource.helpers.java;

import io.gravitee.plugin.resource.AzureFunctionResourceConfiguration;
import io.gravitee.plugin.resource.helpers.AbstractFunctionBuilder;
import io.gravitee.plugin.resource.helpers.FunctionBuilderException;

import java.io.IOException;
import java.net.URISyntaxException;
import java.nio.file.FileVisitResult;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.SimpleFileVisitor;
import java.nio.file.attribute.BasicFileAttributes;
import java.util.List;

import org.apache.maven.shared.invoker.DefaultInvocationRequest;
import org.apache.maven.shared.invoker.DefaultInvoker;
import org.apache.maven.shared.invoker.InvocationRequest;
import org.apache.maven.shared.invoker.Invoker;
import org.apache.maven.shared.invoker.MavenInvocationException;

/**
 * @author Yann TAVERNIER (yann.tavernier at graviteesource.com)
 * @author GraviteeSource Team
 */
public class JavaFunctionBuilder extends AbstractFunctionBuilder {

    private final Invoker mavenInvoker;

    public JavaFunctionBuilder(AzureFunctionResourceConfiguration configuration) {
        super(configuration);
        this.mavenInvoker = new DefaultInvoker();
        // FIXME: work on my local env, to adapt
        mavenInvoker.setMavenHome(Paths.get("/usr/local/Cellar/maven/3.9.0/libexec").toFile());
        mavenInvoker.getWorkingDirectory();
    }

    public Path zipFunction() throws FunctionBuilderException {
        try {
            InvocationRequest request = new DefaultInvocationRequest();
            request.setPomFile(Paths.get(this.getClass().getClassLoader().getResource("javaFunction/pom.xml").toURI()).toFile());
            request.setGoals(List.of("package"));
            Invoker invoker = new DefaultInvoker();
            // FIXME: work on my local env, to adapt
            invoker.setMavenHome(Paths.get("/usr/local/Cellar/maven/3.9.0/libexec").toFile());
            invoker.getWorkingDirectory();
            invoker.execute(request);
            final FunctionZipVisitor functionZipVisitor = new FunctionZipVisitor();
            final Path targetClasses = Paths.get(this.getClass().getProtectionDomain().getCodeSource().getLocation().getPath());
            Files.walkFileTree(targetClasses, functionZipVisitor);
            final Path zipPath = functionZipVisitor.getFunctionZip();
            return zipPath;
        } catch (MavenInvocationException |
                 IOException |
                 URISyntaxException e) {
            throw new FunctionBuilderException(e);
        }
    }


    /**
     * Run `mvn clean package` to prepare function in resources/javaFunction/target/azure-functions
     * @throws URISyntaxException
     * @throws MavenInvocationException
     * @throws IOException
     */
    public void packageFunction() throws FunctionBuilderException {
        try {
        InvocationRequest request = new DefaultInvocationRequest();
        request.setPomFile(Paths.get(this.getClass().getClassLoader().getResource("javaFunction/pom.xml").toURI()).toFile());
        request.setGoals(List.of("clean package"));

            mavenInvoker.execute(request);
        } catch (MavenInvocationException |
                 URISyntaxException e) {
            throw new FunctionBuilderException(e);
        }
    }

    /**
     * Run `mvn azure-functions:deploy` to deploy function to azure
     * ⚠️ Needs to be logged in thanks to `az login`
     * @throws URISyntaxException
     * @throws MavenInvocationException
     * @throws IOException
     */
    public void deployFunction() throws FunctionBuilderException {
        try {
            InvocationRequest deployRequest = new DefaultInvocationRequest();
            deployRequest.setPomFile(Paths.get(this.getClass().getClassLoader().getResource("javaFunction/pom.xml").toURI()).toFile());
            deployRequest.setGoals(List.of("azure-functions:deploy"));

            mavenInvoker.execute(deployRequest);
        } catch (MavenInvocationException |
                 URISyntaxException e) {
            throw new FunctionBuilderException(e);
        }
    }


    /**
     * Looks for the zip to upload
     */
    static class FunctionZipVisitor extends SimpleFileVisitor<Path> {

        private Path functionZip = null;

        @Override
        public FileVisitResult visitFile(Path file, BasicFileAttributes attrs) throws IOException {
            if (
                   file.getFileName().toString().startsWith("gravitee-cloud-functions") &&
                          file.getFileName().toString().endsWith("SNAPSHOT.zip")
            ) {
                functionZip = file;
                return FileVisitResult.TERMINATE;
            }
            return FileVisitResult.CONTINUE;
        }

        public Path getFunctionZip() {
            return functionZip;
        }
    }
}
