package io.gravitee.gateway.services.sync.cache;

import io.gravitee.gateway.handlers.api.definition.ApiKey;
import io.gravitee.node.api.cache.Cache;
import io.gravitee.repository.exceptions.TechnicalException;
import io.gravitee.repository.management.api.ApiKeyRepository;
import io.gravitee.repository.management.api.SubscriptionRepository;
import io.gravitee.repository.management.api.search.SubscriptionCriteria;
import io.gravitee.repository.management.model.Subscription;
import java.util.List;
import java.util.Optional;

/**
 * {@inheritDoc}
 *
 * This lazy cache implementation fetches Api keys in database if it was not yet fetched.
 * If the API key is not existing (or inactive), it's cached as an empty Optional, and won't be fetched again.
 */
public class ApiKeysFetchingCache extends ApiKeysCache {

    private ApiKeyRepository apiKeyRepository;
    private SubscriptionRepository subscriptionRepository;

    public ApiKeysFetchingCache(
        Cache<String, Optional<ApiKey>> cache,
        ApiKeyRepository apiKeyRepository,
        SubscriptionRepository subscriptionRepository
    ) {
        super(cache);
        this.apiKeyRepository = apiKeyRepository;
        this.subscriptionRepository = subscriptionRepository;
    }

    /**
     * {@inheritDoc}
     * If API key has not yet been cached, it fetches it in database and save it to the cache.
     * If the API key is not existing (or inactive), it's cached as an empty Optional, and won't be fetched again.
     *
     * @param api api
     * @param key api key value
     * @return Cached API key, or empty optional if not found
     * @throws TechnicalException
     */
    @Override
    public Optional<ApiKey> get(String api, String key) throws TechnicalException {
        Optional<ApiKey> cachedApiKey = cache.get(buildCacheKey(api, key));

        // return api key if it has already been cached (as an active key, or an inactive)
        if (cachedApiKey != null) {
            return cachedApiKey;
        }

        // search api key and subscription from repository if it has never been fetched
        cachedApiKey = Optional.empty();
        Optional<io.gravitee.repository.management.model.ApiKey> repositoryApiKey = apiKeyRepository.findByKeyAndApi(key, api);
        if (repositoryApiKey.isPresent()) {
            cachedApiKey =
                findSubscriptionByIdsAndApi(repositoryApiKey.get().getSubscriptions(), api)
                    .map(subscription -> new ApiKey(repositoryApiKey.get(), subscription));
        }

        return cachedApiKey.map(this::save).orElseGet(() -> saveInactive(api, key));
    }

    /**
     * {@inheritDoc}
     * It caches the api key as an Optional.empty(),
     * Meaning this API key has already been retrieved, but is not active.
     *
     * @param cacheKey api key to save to the cache
     * @return cached value
     */
    @Override
    protected Optional<ApiKey> saveInactive(String cacheKey) {
        Optional<ApiKey> cacheValue = Optional.empty();
        cache.put(cacheKey, cacheValue);
        return cacheValue;
    }

    private Optional<Subscription> findSubscriptionByIdsAndApi(List<String> subscriptionsId, String api) throws TechnicalException {
        SubscriptionCriteria criteria = new SubscriptionCriteria.Builder().ids(subscriptionsId).apis(List.of(api)).build();
        return subscriptionRepository.search(criteria).stream().findFirst();
    }
}
