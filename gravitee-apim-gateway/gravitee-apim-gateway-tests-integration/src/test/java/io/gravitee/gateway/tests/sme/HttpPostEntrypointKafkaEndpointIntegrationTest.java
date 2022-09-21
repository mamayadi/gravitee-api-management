package io.gravitee.gateway.tests.sme;/**
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

import static org.assertj.core.api.Assertions.assertThat;

import io.gravitee.apim.gateway.tests.sdk.AbstractGatewayTest;
import io.gravitee.apim.gateway.tests.sdk.annotations.DeployApi;
import io.gravitee.apim.gateway.tests.sdk.annotations.GatewayTest;
import io.gravitee.apim.gateway.tests.sdk.configuration.GatewayConfigurationBuilder;
import io.gravitee.apim.gateway.tests.sdk.connector.EndpointBuilder;
import io.gravitee.apim.gateway.tests.sdk.connector.EntrypointBuilder;
import io.gravitee.definition.model.v4.Api;
import io.gravitee.gateway.reactor.ReactableApi;
import io.gravitee.plugin.endpoint.EndpointConnectorPlugin;
import io.gravitee.plugin.endpoint.kafka.KafkaEndpointConnectorFactory;
import io.gravitee.plugin.endpoint.kafka.vertx.client.consumer.KafkaConsumer;
import io.gravitee.plugin.endpoint.kafka.vertx.client.consumer.KafkaConsumerRecord;
import io.gravitee.plugin.endpoint.kafka.vertx.client.producer.KafkaHeader;
import io.gravitee.plugin.entrypoint.EntrypointConnectorPlugin;
import io.gravitee.plugin.entrypoint.http.post.HttpPostEntrypointConnectorFactory;
import io.reactivex.observers.TestObserver;
import io.reactivex.subscribers.TestSubscriber;
import io.vertx.core.json.JsonObject;
import io.vertx.reactivex.core.Vertx;
import io.vertx.reactivex.core.buffer.Buffer;
import io.vertx.reactivex.ext.web.client.HttpResponse;
import io.vertx.reactivex.ext.web.client.WebClient;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;
import org.apache.kafka.clients.admin.AdminClient;
import org.apache.kafka.clients.admin.AdminClientConfig;
import org.apache.kafka.clients.admin.NewTopic;
import org.apache.kafka.clients.consumer.ConsumerConfig;
import org.apache.kafka.common.serialization.ByteArrayDeserializer;
import org.apache.kafka.common.serialization.StringDeserializer;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.testcontainers.containers.KafkaContainer;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;
import org.testcontainers.shaded.com.google.common.collect.ImmutableMap;
import org.testcontainers.utility.DockerImageName;

/**
 * @author Yann TAVERNIER (yann.tavernier at graviteesource.com)
 * @author GraviteeSource Team
 */
@Testcontainers
@GatewayTest
@DeployApi({ "/apis/v4/http-post-entrypoint-kafka-endpoint.json" })
class HttpPostEntrypointKafkaEndpointIntegrationTest extends AbstractGatewayTest {

    @Container
    private static final KafkaContainer kafka = new KafkaContainer(DockerImageName.parse("confluentinc/cp-kafka:6.2.1"));

    public static final String TEST_TOPIC = "test-topic";

    @Override
    public void configureEndpoints(Map<String, EndpointConnectorPlugin<?, ?>> endpoints) {
        endpoints.putIfAbsent("kafka", EndpointBuilder.build("kafka", KafkaEndpointConnectorFactory.class));
    }

    @Override
    public void configureEntrypoints(Map<String, EntrypointConnectorPlugin<?, ?>> entrypoints) {
        entrypoints.putIfAbsent("http-post", EntrypointBuilder.build("http-post", HttpPostEntrypointConnectorFactory.class));
    }

    @Override
    protected void configureGateway(GatewayConfigurationBuilder gatewayConfigurationBuilder) {
        gatewayConfigurationBuilder.set("api.jupiterMode.enabled", "true");
        gatewayConfigurationBuilder.set("api.jupiterMode.default", "always");
    }

    @Override
    public void configureApi(ReactableApi<?> api, Class<?> definitionClass) {
        if (definitionClass.isAssignableFrom(Api.class)) {
            Api apiDefinition = (Api) api.getDefinition();
            apiDefinition
                .getEndpointGroups()
                .stream()
                .flatMap(eg -> eg.getEndpoints().stream())
                .filter(endpoint -> endpoint.getType().equals("kafka"))
                .forEach(
                    endpoint -> {
                        endpoint.setConfiguration(endpoint.getConfiguration().replace("bootstrap-server", kafka.getBootstrapServers()));
                    }
                );
        }
    }

    @BeforeEach
    void setUp() throws ExecutionException, InterruptedException, TimeoutException {
        try (
            AdminClient adminClient = AdminClient.create(
                ImmutableMap.of(AdminClientConfig.BOOTSTRAP_SERVERS_CONFIG, kafka.getBootstrapServers())
            )
        ) {
            Collection<NewTopic> topics = List.of(new NewTopic(TEST_TOPIC, 1, (short) 1));
            adminClient.createTopics(topics).all().get(30, TimeUnit.SECONDS);
        }
    }

    @Test
    @DisplayName("Should deploy a V4 API with a HTTP Post entrypoint and Kafka endpoint")
    void shouldBeAbleToSubscribeToKafkaEndpointWithHTTPPostEntrypoint(WebClient client, Vertx vertx) {
        JsonObject requestBody = new JsonObject();
        requestBody.put("field", "value");

        final TestObserver<HttpResponse<Buffer>> obs = client
            .post("/test")
            .putHeader("X-Test-Header", "header-value")
            .rxSendJsonObject(requestBody)
            .test();

        awaitTerminalEvent(obs)
            .assertComplete()
            .assertValue(
                response -> {
                    assertThat(response.statusCode()).isEqualTo(200);
                    return true;
                }
            )
            .assertNoErrors();

        // Configure a KafkaConsumer to read messages published on topic test-topic.
        KafkaConsumer<String, byte[]> kafkaConsumer = getKafkaConsumer(vertx);
        io.vertx.kafka.client.common.TopicPartition topicPartition = new io.vertx.kafka.client.common.TopicPartition(TEST_TOPIC, 0);
        TestSubscriber<KafkaConsumerRecord<String, byte[]>> testSubscriber = kafkaConsumer
            .assign(topicPartition)
            .rxSeekToBeginning(topicPartition)
            .andThen(kafkaConsumer.toFlowable())
            .take(1)
            .test();
        testSubscriber.awaitTerminalEvent(10, TimeUnit.SECONDS);

        testSubscriber
            .assertValueCount(1)
            .assertValueAt(
                0,
                value -> {
                    assertThat(value.headers()).contains(KafkaHeader.header("X-Test-Header", "header-value"));
                    final io.vertx.kafka.client.consumer.KafkaConsumerRecord kafkaConsumerRecord = value.getDelegate();
                    assertThat(kafkaConsumerRecord.value()).isEqualTo(requestBody.toBuffer().getBytes());
                    return true;
                }
            );
        kafkaConsumer.close();
    }

    /**
     * Creates a KafkaConsumer to be able to read messages from topic
     * @param vertx
     * @return
     */
    private static KafkaConsumer<String, byte[]> getKafkaConsumer(Vertx vertx) {
        Map<String, String> config = new HashMap<>();
        config.put(ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG, kafka.getBootstrapServers());
        config.put(ConsumerConfig.KEY_DESERIALIZER_CLASS_CONFIG, StringDeserializer.class.getName());
        config.put(ConsumerConfig.VALUE_DESERIALIZER_CLASS_CONFIG, ByteArrayDeserializer.class.getName());
        config.put(ConsumerConfig.GROUP_ID_CONFIG, UUID.randomUUID().toString());
        config.put(ConsumerConfig.CLIENT_ID_CONFIG, UUID.randomUUID().toString());
        config.put(ConsumerConfig.AUTO_OFFSET_RESET_CONFIG, "earliest");
        KafkaConsumer<String, byte[]> kafkaConsumer = KafkaConsumer.create(vertx, config);
        return kafkaConsumer;
    }
}
