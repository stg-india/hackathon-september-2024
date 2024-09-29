package com._found.consumer.config;

import co.elastic.clients.elasticsearch.ElasticsearchClient;
import co.elastic.clients.json.jackson.JacksonJsonpMapper;
import co.elastic.clients.transport.ElasticsearchTransport;
import co.elastic.clients.transport.rest_client.RestClientTransport;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.http.HttpHost;
import org.elasticsearch.client.RestClient;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ElasticsearchConfig {

    @Bean
    public RestClient restClient() {
        // Set up the low-level REST client
        return RestClient.builder(
                new HttpHost("34.93.57.52", 9200, "http")
        ).build();
    }

    @Bean
    public ElasticsearchClient elasticsearchClient() {
        // Create the transport with the RestClient
        ElasticsearchTransport transport = new RestClientTransport(
                restClient(), new JacksonJsonpMapper(new ObjectMapper())
        );

        // Create the Elasticsearch client
        return new ElasticsearchClient(transport);
    }
}
