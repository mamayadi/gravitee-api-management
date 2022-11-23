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

import static io.gravitee.repository.management.model.Subscription.Status.*;

import io.gravitee.node.api.cache.Cache;
import io.gravitee.repository.exceptions.TechnicalException;
import io.gravitee.repository.management.model.Subscription;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * @author GraviteeSource Team
 */
public class SubscriptionsCache {

    private static final Logger LOGGER = LoggerFactory.getLogger(SubscriptionsCache.class);

    protected Cache<String, Optional<Object>> cache;

    public SubscriptionsCache(Cache<String, Optional<Object>> cache) {
        this.cache = cache;
    }

    /**
     * Get a cached subscription from the cache.
     *
     * @param api api
     * @param clientId clientId
     * @param plan plan
     * @return cached subscription, or empty optional if not found
     */
    public Optional<Subscription> get(String api, String clientId, String plan) throws TechnicalException {
        return get(buildCacheKeyWithPlan(api, clientId, plan));
    }

    public void save(Subscription subscription) {
        Optional<String> cachedSubscriptionKey = cache.get(subscription.getId()).map(String.class::cast);

        if ((CLOSED.equals(subscription.getStatus()) || PAUSED.equals(subscription.getStatus())) && cachedSubscriptionKey.isPresent()) {
            saveInactive(subscription.getId());
            String oldKey = cachedSubscriptionKey.get();
            get(oldKey)
                .ifPresent(
                    cachedSub -> {
                        saveInactive(oldKey);
                        saveInactive(buildCacheKeyWithoutPlan(cachedSub.getApi(), cachedSub.getClientId()));
                    }
                );
        } else if (ACCEPTED.equals(subscription.getStatus())) {
            LOGGER.debug(
                "Cache a subscription: plan[{}] application[{}] client_id[{}]",
                subscription.getPlan(),
                subscription.getApplication(),
                subscription.getClientId()
            );
            String cacheKeyWithPlan = buildCacheKeyWithPlan(subscription.getApi(), subscription.getClientId(), subscription.getPlan());
            cache.put(subscription.getId(), Optional.of(cacheKeyWithPlan));

            // Delete useless information to preserve memory
            subscription.setGeneralConditionsContentPageId(null);
            subscription.setRequest(null);
            subscription.setReason(null);
            subscription.setSubscribedBy(null);
            subscription.setProcessedBy(null);

            cache.put(cacheKeyWithPlan, Optional.of(subscription));
            cache.put(buildCacheKeyWithoutPlan(subscription.getApi(), subscription.getClientId()), Optional.of(subscription));

            cachedSubscriptionKey.ifPresent(
                key -> {
                    if (!key.equals(cacheKeyWithPlan)) {
                        saveInactive(key);
                    }
                }
            );
        }
    }

    /**
     * Save an inactive subscription to the cache.
     *
     * @param cacheKey cache key
     */
    protected void saveInactive(String cacheKey) {
        cache.evict(cacheKey);
    }

    private Optional<Subscription> get(String cacheKey) {
        Optional<Object> cachedValue = cache.get(cacheKey);
        return cachedValue != null ? cachedValue.map(Subscription.class::cast) : Optional.empty();
    }

    private String buildCacheKeyWithoutPlan(String api, String clientId) {
        return buildCacheKeyWithPlan(api, clientId, null);
    }

    protected String buildCacheKeyWithPlan(String api, String clientId, String plan) {
        return String.format("%s.%s.%s", api, clientId, plan);
    }

    protected void saveInactive(String api, String clientId, String plan) {
        saveInactive(buildCacheKeyWithPlan(api, clientId, plan));
    }
}
