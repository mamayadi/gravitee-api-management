package io.gravitee.gateway.services.sync.cache;

import io.gravitee.node.api.cache.Cache;
import io.gravitee.repository.exceptions.TechnicalException;
import io.gravitee.repository.management.api.SubscriptionRepository;
import io.gravitee.repository.management.api.search.SubscriptionCriteria;
import io.gravitee.repository.management.model.Subscription;
import java.util.List;
import java.util.Optional;

/**
 * {@inheritDoc}
 *
 * This lazy cache implementation fetches subscription in database if it was not yet fetched.
 * If the subscription is not existing (or inactive), it's cached as an empty Optional, and won't be fetched again.
 */
public class SubscriptionsFetchingCache extends SubscriptionsCache {

    private SubscriptionRepository subscriptionRepository;

    public SubscriptionsFetchingCache(Cache<String, Optional<Object>> cache, SubscriptionRepository subscriptionRepository) {
        super(cache);
        this.subscriptionRepository = subscriptionRepository;
    }

    /**
     * {@inheritDoc}
     * If subscription has not yet been cached, it fetches it in database and save it to the cache.
     * If the subscription is not existing (or inactive), it's cached as an empty Optional, and won't be fetched again.
     *
     * @param api api
     * @param clientId clientId
     * @param plan plan
     * @throws TechnicalException
     */
    @Override
    public Optional<Subscription> get(String api, String clientId, String plan) throws TechnicalException {
        Optional<Object> cachedValue = cache.get(buildCacheKeyWithPlan(api, clientId, plan));

        // return subscription if it has already been cached (as an active subscription, or a non-active)
        if (cachedValue != null) {
            return cachedValue.map(Subscription.class::cast);
        }

        // search subscription from repository if it has never been fetched
        SubscriptionCriteria criteria = new SubscriptionCriteria.Builder()
            .apis(List.of(api))
            .clientId(clientId)
            .plans(List.of(plan))
            .build();
        Optional<Subscription> subscription = subscriptionRepository.search(criteria).stream().findFirst();
        if (subscription.isPresent()) {
            save(subscription.get());
            return subscription;
        }
        saveInactive(api, clientId, plan);
        return Optional.empty();
    }

    /**
     * {{@inheritDoc}}
     * It caches the subscription as an Optional.empty(),
     * Meaning this subscription has already been retrieved, but is not active.
     *
     * @param cacheKey cache key
     */
    @Override
    protected void saveInactive(String cacheKey) {
        cache.put(cacheKey, Optional.empty());
    }
}
