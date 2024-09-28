package com.stgi.segfault.Configuration;

import com.influxdb.client.InfluxDBClient;
import com.influxdb.client.InfluxDBClientFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class InfluxDBConfig {

    @Value("${influxdb.url}")
    private String influxDBUrl;

    @Value("${influxdb.name}")
    private String influxUsername;

    @Value("${influxdb.password}")
    private String influxPassword;

    @Value("${influxdb.token}")
    private String influxDBToken;

    @Value("${influxdb.org}")
    private String influxDBOrg;

    @Value("${influxdb.bucket}")
    private String influxBucket;

    @Bean
    public InfluxDBClient influxDB() {
        return InfluxDBClientFactory.create(influxDBUrl, influxDBToken.toCharArray(), influxDBOrg, influxBucket);
    }
}
