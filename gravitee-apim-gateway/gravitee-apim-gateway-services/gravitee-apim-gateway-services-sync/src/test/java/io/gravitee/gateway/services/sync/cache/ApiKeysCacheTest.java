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
package io.gravitee.gateway.services.sync.cache;

import static org.junit.Assert.*;

import io.gravitee.gateway.handlers.api.definition.ApiKey;
import io.gravitee.node.api.cache.CacheConfiguration;
import io.gravitee.node.cache.standalone.StandaloneCache;
import io.gravitee.repository.exceptions.TechnicalException;
import io.gravitee.repository.management.model.Subscription;
import java.util.Optional;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;

@RunWith(MockitoJUnitRunner.class)
public class ApiKeysCacheTest {

    private final ApiKeysCache apiKeysCache = new ApiKeysCache(new StandaloneCache<>("ApiKeysCacheTest", new CacheConfiguration()));

    @Mock
    private ApiKey cachedApiKey1;

    @Mock
    private ApiKey cachedApiKey2;

    @Mock
    private ApiKey cachedApiKey3;

    @Before
    public void initInternalCache() {
        apiKeysCache.cache.put("another-apiId.another-key", Optional.of(cachedApiKey1));
        apiKeysCache.cache.put("api-id.key-id", Optional.of(cachedApiKey2));
        apiKeysCache.cache.put("another-apiId2.another-key", Optional.of(cachedApiKey3));
    }

    @Test
    public void get_should_return_apikey_when_it_exists() throws TechnicalException {
        Optional<ApiKey> resultKey = apiKeysCache.get("api-id", "key-id");

        assertTrue(resultKey.isPresent());
        assertSame(cachedApiKey2, resultKey.get());
    }

    @Test
    public void get_should_return_null_when_it_doesnt_exists() throws TechnicalException {
        Optional<ApiKey> resultKey = apiKeysCache.get("api-id6", "key-id");

        assertTrue(resultKey.isEmpty());
    }

    @Test
    public void saveActive_should_put_apikey_in_internal_map() {
        io.gravitee.repository.management.model.ApiKey apiKey = new io.gravitee.repository.management.model.ApiKey();
        apiKey.setKey("key-id");

        Subscription subscription = new Subscription();
        subscription.setApi("api-id6");

        ApiKey expected = new ApiKey(apiKey, subscription);
        apiKeysCache.saveActive(expected);

        assertSame(expected, apiKeysCache.cache.get("api-id6.key-id").get());
    }

    @Test
    public void saveInactive_should_remove_apikey_from_internal_map() {
        io.gravitee.repository.management.model.ApiKey apiKey = new io.gravitee.repository.management.model.ApiKey();
        apiKey.setKey("key-id");

        Subscription subscription = new Subscription();
        subscription.setApi("api-id");

        ApiKey expected = new ApiKey(apiKey, subscription);
        apiKeysCache.saveInactive(expected);

        assertEquals(2, apiKeysCache.cache.size());
        assertNull(apiKeysCache.cache.get("api-id.key-id"));
    }
}
