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
package io.gravitee.gateway.handlers.api.processor.transaction;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import io.gravitee.gateway.api.ExecutionContext;
import io.gravitee.gateway.api.Request;
import io.gravitee.gateway.api.Response;
import io.gravitee.gateway.api.context.SimpleExecutionContext;
import io.gravitee.gateway.api.http.HttpHeaders;
import io.gravitee.gateway.reactor.processor.transaction.TransactionHeader;
import io.gravitee.node.api.configuration.Configuration;
import java.util.List;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

class TransactionResponseProcessorTest {

    private TransactionResponseProcessor transactionResponseProcessor;

    @Test
    @DisplayName("Should keep only transaction ID and request ID headers set by APIM, discard backend ones")
    void handleWithOverrideBackendModeNone() {
        instantiateTransactionResponseProcess(BackendOverrideMode.NONE, BackendOverrideMode.NONE);

        Request request = mock(Request.class);
        HttpHeaders requestHeaders = HttpHeaders.create();
        requestHeaders.set(TransactionHeader.DEFAULT_TRANSACTION_ID_HEADER, "transaction-id");
        requestHeaders.set(TransactionHeader.DEFAULT_REQUEST_ID_HEADER, "request-id");
        when(request.headers()).thenReturn(requestHeaders);

        Response response = mock(Response.class);
        HttpHeaders responseHeaders = HttpHeaders.create();
        responseHeaders.set(TransactionHeader.DEFAULT_TRANSACTION_ID_HEADER, "backend-transaction-id");
        responseHeaders.set(TransactionHeader.DEFAULT_REQUEST_ID_HEADER, "backend-request-id");
        when(response.headers()).thenReturn(responseHeaders);

        ExecutionContext context = new SimpleExecutionContext(request, response);
        transactionResponseProcessor.handle(context);

        assertEquals(List.of("transaction-id"), context.response().headers().getAll(TransactionHeader.DEFAULT_TRANSACTION_ID_HEADER));
        assertEquals(List.of("request-id"), context.response().headers().getAll(TransactionHeader.DEFAULT_REQUEST_ID_HEADER));
    }

    @Test
    @DisplayName("Should merge transaction ID and request ID headers set by APIM and the backend")
    void handleWithOverrideBackendModeMerge() {
        instantiateTransactionResponseProcess(BackendOverrideMode.MERGE, BackendOverrideMode.MERGE);

        Request request = mock(Request.class);
        HttpHeaders requestHeaders = HttpHeaders.create();
        requestHeaders.set(TransactionHeader.DEFAULT_TRANSACTION_ID_HEADER, "transaction-id");
        requestHeaders.set(TransactionHeader.DEFAULT_REQUEST_ID_HEADER, "request-id");
        when(request.headers()).thenReturn(requestHeaders);

        Response response = mock(Response.class);
        HttpHeaders responseHeaders = HttpHeaders.create();
        responseHeaders.set(TransactionHeader.DEFAULT_TRANSACTION_ID_HEADER, "backend-transaction-id");
        responseHeaders.set(TransactionHeader.DEFAULT_REQUEST_ID_HEADER, "backend-request-id");
        when(response.headers()).thenReturn(responseHeaders);

        ExecutionContext context = new SimpleExecutionContext(request, response);
        transactionResponseProcessor.handle(context);

        assertEquals(
            List.of("backend-transaction-id", "transaction-id"),
            context.response().headers().getAll(TransactionHeader.DEFAULT_TRANSACTION_ID_HEADER)
        );
        assertEquals(
            List.of("backend-request-id", "request-id"),
            context.response().headers().getAll(TransactionHeader.DEFAULT_REQUEST_ID_HEADER)
        );
    }

    @Test
    @DisplayName("Should override transaction ID and request ID headers set by APIM with the ones from the backend")
    void handleWithOverrideBackendModeOverride() {
        instantiateTransactionResponseProcess(BackendOverrideMode.OVERRIDE, BackendOverrideMode.OVERRIDE);

        Request request = mock(Request.class);
        HttpHeaders requestHeaders = HttpHeaders.create();
        requestHeaders.set(TransactionHeader.DEFAULT_TRANSACTION_ID_HEADER, "transaction-id");
        requestHeaders.set(TransactionHeader.DEFAULT_REQUEST_ID_HEADER, "request-id");
        when(request.headers()).thenReturn(requestHeaders);

        Response response = mock(Response.class);
        HttpHeaders responseHeaders = HttpHeaders.create();
        responseHeaders.set(TransactionHeader.DEFAULT_TRANSACTION_ID_HEADER, "backend-transaction-id");
        responseHeaders.set(TransactionHeader.DEFAULT_REQUEST_ID_HEADER, "backend-request-id");
        when(response.headers()).thenReturn(responseHeaders);

        ExecutionContext context = new SimpleExecutionContext(request, response);
        transactionResponseProcessor.handle(context);

        assertEquals(
            List.of("backend-transaction-id"),
            context.response().headers().getAll(TransactionHeader.DEFAULT_TRANSACTION_ID_HEADER)
        );
        assertEquals(List.of("backend-request-id"), context.response().headers().getAll(TransactionHeader.DEFAULT_REQUEST_ID_HEADER));
    }

    private void instantiateTransactionResponseProcess(
        BackendOverrideMode transactionOverrideMode,
        BackendOverrideMode requestBackendOverrideMode
    ) {
        Configuration nodeConfiguration = mock(Configuration.class);
        when(nodeConfiguration.getProperty(eq("handlers.request.transaction.backendOverrideMode"), anyString()))
            .thenReturn(transactionOverrideMode.name());
        when(nodeConfiguration.getProperty(eq("handlers.request.request.backendOverrideMode"), anyString()))
            .thenReturn(requestBackendOverrideMode.name());
        when(nodeConfiguration.getProperty(eq("handlers.request.transaction.header"), anyString()))
            .thenReturn(TransactionHeader.DEFAULT_TRANSACTION_ID_HEADER);
        when(nodeConfiguration.getProperty(eq("handlers.request.request.header"), anyString()))
            .thenReturn(TransactionHeader.DEFAULT_REQUEST_ID_HEADER);

        TransactionResponseProcessorConfiguration processorConfiguration = new TransactionResponseProcessorConfiguration(nodeConfiguration);

        transactionResponseProcessor = new TransactionResponseProcessor(processorConfiguration);
        transactionResponseProcessor.handler(context -> {});
    }
}
