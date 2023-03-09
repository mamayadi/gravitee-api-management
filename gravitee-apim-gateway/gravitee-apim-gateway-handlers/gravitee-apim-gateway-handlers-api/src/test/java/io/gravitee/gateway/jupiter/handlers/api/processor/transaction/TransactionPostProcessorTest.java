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
package io.gravitee.gateway.jupiter.handlers.api.processor.transaction;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import io.gravitee.gateway.jupiter.handlers.api.processor.AbstractProcessorTest;
import io.gravitee.gateway.reactor.processor.transaction.TransactionHeader;
import io.gravitee.node.api.configuration.Configuration;
import java.util.List;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

class TransactionPostProcessorTest extends AbstractProcessorTest {

    private TransactionPostProcessor transactionPostProcessor;

    @Test
    @DisplayName("Should keep only transaction ID and request ID headers set by APIM, discard backend ones")
    void handleWithOverrideBackendModeNone() {
        instantiateTransactionPostProcessor(BackendOverrideMode.NONE, BackendOverrideMode.NONE);

        ctx.request().headers().set(TransactionHeader.DEFAULT_TRANSACTION_ID_HEADER, "transaction-id");
        ctx.request().headers().set(TransactionHeader.DEFAULT_REQUEST_ID_HEADER, "request-id");

        ctx.response().headers().set(TransactionHeader.DEFAULT_TRANSACTION_ID_HEADER, "backend-transaction-id");
        ctx.response().headers().set(TransactionHeader.DEFAULT_REQUEST_ID_HEADER, "backend-request-id");

        transactionPostProcessor.execute(ctx).test().assertResult();

        assertThat(spyResponseHeaders.getAll(TransactionHeader.DEFAULT_TRANSACTION_ID_HEADER)).isEqualTo(List.of("transaction-id"));
        assertThat(spyResponseHeaders.getAll(TransactionHeader.DEFAULT_REQUEST_ID_HEADER)).isEqualTo(List.of("request-id"));
    }

    @Test
    @DisplayName("Should merge transaction ID and request ID headers set by APIM and the backend")
    void handleWithOverrideBackendModeMerge() {
        instantiateTransactionPostProcessor(BackendOverrideMode.MERGE, BackendOverrideMode.MERGE);

        ctx.request().headers().set(TransactionHeader.DEFAULT_TRANSACTION_ID_HEADER, "transaction-id");
        ctx.request().headers().set(TransactionHeader.DEFAULT_REQUEST_ID_HEADER, "request-id");

        ctx.response().headers().set(TransactionHeader.DEFAULT_TRANSACTION_ID_HEADER, "backend-transaction-id");
        ctx.response().headers().set(TransactionHeader.DEFAULT_REQUEST_ID_HEADER, "backend-request-id");

        transactionPostProcessor.execute(ctx).test().assertResult();

        assertThat(spyResponseHeaders.getAll(TransactionHeader.DEFAULT_TRANSACTION_ID_HEADER))
            .isEqualTo(List.of("backend-transaction-id", "transaction-id"));
        assertThat(spyResponseHeaders.getAll(TransactionHeader.DEFAULT_REQUEST_ID_HEADER))
            .isEqualTo(List.of("backend-request-id", "request-id"));
    }

    @Test
    @DisplayName("Should override transaction ID and request ID headers set by APIM with the ones from the backend")
    void handleWithOverrideBackendModeOverride() {
        instantiateTransactionPostProcessor(BackendOverrideMode.OVERRIDE, BackendOverrideMode.OVERRIDE);

        ctx.request().headers().set(TransactionHeader.DEFAULT_TRANSACTION_ID_HEADER, "transaction-id");
        ctx.request().headers().set(TransactionHeader.DEFAULT_REQUEST_ID_HEADER, "request-id");

        ctx.response().headers().set(TransactionHeader.DEFAULT_TRANSACTION_ID_HEADER, "backend-transaction-id");
        ctx.response().headers().set(TransactionHeader.DEFAULT_REQUEST_ID_HEADER, "backend-request-id");

        transactionPostProcessor.execute(ctx).test().assertResult();

        assertThat(spyResponseHeaders.getAll(TransactionHeader.DEFAULT_TRANSACTION_ID_HEADER)).isEqualTo(List.of("backend-transaction-id"));
        assertThat(spyResponseHeaders.getAll(TransactionHeader.DEFAULT_REQUEST_ID_HEADER)).isEqualTo(List.of("backend-request-id"));
    }

    private void instantiateTransactionPostProcessor(
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

        TransactionPostProcessorConfiguration processorConfiguration = new TransactionPostProcessorConfiguration(nodeConfiguration);

        transactionPostProcessor = new TransactionPostProcessor(processorConfiguration);
    }
}
