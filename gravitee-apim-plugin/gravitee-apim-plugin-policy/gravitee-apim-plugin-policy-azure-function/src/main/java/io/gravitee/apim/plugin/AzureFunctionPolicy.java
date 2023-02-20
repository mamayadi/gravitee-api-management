package io.gravitee.apim.plugin;

import io.gravitee.gateway.jupiter.api.context.HttpExecutionContext;
import io.gravitee.gateway.jupiter.api.context.MessageExecutionContext;
import io.gravitee.gateway.jupiter.api.policy.Policy;
import io.reactivex.rxjava3.core.Completable;
import io.vertx.core.http.HttpMethod;
import io.vertx.core.json.JsonObject;
import io.vertx.rxjava3.core.Vertx;
import io.vertx.rxjava3.core.buffer.Buffer;
import io.vertx.rxjava3.core.http.HttpClient;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * @author Yann TAVERNIER (yann.tavernier at graviteesource.com)
 * @author GraviteeSource Team
 */
public class AzureFunctionPolicy implements Policy {

    public static final Logger LOGGER = LoggerFactory.getLogger(AzureFunctionPolicy.class);
    private final AzureFunctionPolicyConfiguration configuration;

    public AzureFunctionPolicy(AzureFunctionPolicyConfiguration configuration) {
        this.configuration = configuration;
    }

    @Override
    public String id() {
        return "azure-function-policy";
    }

    @Override
    public Completable onRequest(HttpExecutionContext ctx) {
        final HttpClient httpClient = Vertx.vertx().createHttpClient();
        JsonObject jo = new JsonObject(ctx.getAttributes());
        httpClient.rxRequest(HttpMethod.POST, configuration.getHttpTrigger())
               .flatMap(request -> request.rxSend(Buffer.buffer(jo.toBuffer().getBytes())))
               .subscribe(response -> {
            LOGGER.info("Response status: {}", response.statusCode());
        }, throwable -> {
            LOGGER.error("Error occurs: {}", throwable);
        });

        return Policy.super.onRequest(ctx);
    }

    @Override
    public Completable onResponse(HttpExecutionContext ctx) {
        return Policy.super.onResponse(ctx);
    }

    @Override
    public Completable onMessageRequest(MessageExecutionContext ctx) {
        return Policy.super.onMessageRequest(ctx);
    }

    @Override
    public Completable onMessageResponse(MessageExecutionContext ctx) {
        return Policy.super.onMessageResponse(ctx);
    }
}