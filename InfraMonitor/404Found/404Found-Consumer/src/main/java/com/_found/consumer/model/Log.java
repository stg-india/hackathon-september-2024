package com._found.consumer.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;

@Document(indexName = "logs")
public class Log {
    @Id
    private String id;

    @Field(type = FieldType.Text, name = "message")
    private String message;

    @Field(type = FieldType.Text, name = "serviceName")
    private String serviceName;

    @Field(type = FieldType.Text, name = "logType")
    private String logType;

    @Field(type = FieldType.Text, name = "time")
    private String time;
    // Getters and setters
}