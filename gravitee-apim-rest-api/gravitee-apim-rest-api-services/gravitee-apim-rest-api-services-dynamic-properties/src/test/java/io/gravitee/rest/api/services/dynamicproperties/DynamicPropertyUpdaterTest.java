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
package io.gravitee.rest.api.services.dynamicproperties;

import static org.mockito.Mockito.*;

import io.gravitee.definition.model.Properties;
import io.gravitee.rest.api.model.api.ApiEntity;
import io.gravitee.rest.api.model.api.UpdateApiEntity;
import io.gravitee.rest.api.service.ApiService;
import io.gravitee.rest.api.service.common.GraviteeContext;
import io.gravitee.rest.api.service.converter.ApiConverter;
import io.gravitee.rest.api.service.exceptions.TechnicalManagementException;
import io.gravitee.rest.api.services.dynamicproperties.model.DynamicProperty;
import io.gravitee.rest.api.services.dynamicproperties.provider.Provider;
import java.util.Collection;
import java.util.Collections;
import java.util.concurrent.*;
import org.junit.Before;
import org.junit.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

/**
 * @author David BRASSELY (david.brassely at graviteesource.com)
 * @author GraviteeSource Team
 */
public class DynamicPropertyUpdaterTest {

    private static final DynamicProperty property = new DynamicProperty("my-key", "my-value");

    private DynamicPropertyUpdater poller;

    @Mock
    private ApiEntity apiEntity;

    @Mock
    private Provider provider;

    @Mock
    ApiService apiService;

    @Mock
    ApiConverter apiConverter;

    @Before
    public void setUp() {
        MockitoAnnotations.openMocks(this);
        poller = new DynamicPropertyUpdater(apiEntity, Executors.newSingleThreadExecutor());
        when(provider.name()).thenReturn("mock");
        reset(provider, apiService, apiConverter);
        poller.setProvider(provider);
        poller.setApiService(apiService);
        poller.setApiConverter(apiConverter);
    }

    @Test
    public void shouldNotUpdatePropertiesBecauseOfProviderException() {
        when(provider.get())
            .thenReturn(
                CompletableFuture
                    .completedFuture((Collection<DynamicProperty>) Collections.<DynamicProperty>emptyList())
                    .whenCompleteAsync(
                        (dynamicProperties, throwable) -> {
                            throw new IllegalStateException();
                        }
                    )
            );

        poller.handle(1L);
        verifyNoInteractions(apiService);
    }

    @Test
    public void shouldUpdateProperties() throws ExecutionException, InterruptedException {
        when(provider.get()).thenReturn(CompletableFuture.completedFuture(Collections.singletonList(property)));

        ApiEntity api = new ApiEntity();
        apiEntity.setId("api-id");
        apiEntity.setProperties(new Properties());

        when(apiService.findById(any(), any())).thenReturn(api);
        when(apiService.isSynchronized(any(), any())).thenReturn(true);
        when(apiService.update(eq(GraviteeContext.getExecutionContext()), eq("api-id"), any(UpdateApiEntity.class))).thenReturn(api);

        poller.handle().get();

        verify(apiService, times(1)).update(any(), any(), any(), eq(false), eq(false));
        verify(apiService, times(1)).deploy(any(), any(), eq("dynamic-property-updater"), any(), any());
    }

    @Test
    public void shouldNotUpdatePropertyOnUpdateError() throws ExecutionException, InterruptedException {
        DynamicProperty property = new DynamicProperty("my-key", "my-value");
        when(provider.get()).thenReturn(CompletableFuture.completedFuture(Collections.singletonList(property)));

        ApiEntity api = new ApiEntity();
        apiEntity.setId("api-id");
        apiEntity.setProperties(new Properties());

        when(apiService.findById(any(), any())).thenReturn(api);
        when(apiService.isSynchronized(GraviteeContext.getExecutionContext(), "api-id")).thenReturn(true);
        when(apiService.update(eq(GraviteeContext.getExecutionContext()), eq("api-id"), any()))
            .thenThrow(new TechnicalManagementException());

        poller.handle().get();

        verify(apiService, times(1)).update(any(), any(), any(), eq(false), eq(false));
        verify(apiService, never()).deploy(eq(GraviteeContext.getExecutionContext()), eq("api-id"), eq(null), any(), any());
    }
}
