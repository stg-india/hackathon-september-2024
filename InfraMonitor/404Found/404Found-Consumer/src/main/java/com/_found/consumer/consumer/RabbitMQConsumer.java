package com._found.consumer.consumer;


import com._found.consumer.config.RabbitMQConfig;
//import com._found.consumer.model.Log;
//import com._found.consumer.repo.LogRepo;
import com._found.consumer.model.RMQMessage;
//import com._found.consumer.repo.LogRepo;
//import com._found.consumer.repo.LogRepo;
import com._found.consumer.repo.LogRepo;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;

@Service
public class RabbitMQConsumer {

    @Autowired
    private LogRepo logRepo;

    // Listen to the queue for incoming messages
    @RabbitListener(queues = RabbitMQConfig.QUEUE_NAME)
    public void receiveMessage(String message){
        System.out.println("Received message from RabbitMQ: " + message);
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            // Convert the JSON message to the RMQMessage object
            RMQMessage rmqMessage = objectMapper.readValue(message, RMQMessage.class);
            System.out.println("RMQMessage:" + rmqMessage);
//            System.out.println("Host:" + rmqMessage.getHost().toString());
            RMQMessage.Host host = rmqMessage.getHost();
//            System.out.println("Host:" + host.getName());

            System.out.println(rmqMessage.getTimestamp());

            ZonedDateTime zonedDateTime = ZonedDateTime.parse(rmqMessage.getTimestamp());
            ZonedDateTime updatedTime = zonedDateTime.plusHours(5).plusMinutes(30);
            DateTimeFormatter formatter = DateTimeFormatter.ISO_ZONED_DATE_TIME;
            String formattedTime = updatedTime.format(formatter);
            rmqMessage.setTimestamp(formattedTime);

            System.out.println(rmqMessage.getTimestamp());

            // Persist the RMQMessage to Elasticsearch
            logRepo.save(rmqMessage);

            System.out.println("Message persisted to Elasticsearch: " + rmqMessage);

        } catch (Exception e) {
            System.err.println("Error processing message: " + e.getMessage());
            e.printStackTrace();
        }

    }
}

//{"log":{
//    "file":{
//        "path":"/home/prranavbabbar2317/out.log"
//    }
//    },
//        "@timestamp":"2024-09-28T14:44:35.325475Z",
//        "event":{"original":"2024-09-28T13:21:07.641Z  INFO 134276 --- [MatchFetcher] [2u9.mongodb.net] org.mongodb.driver.cluster               : Adding discovered server ac-fema6yu-shard-00-00.lyj92u9.mongodb.net:27017 to client view of cluster"
//        },
//        "host":{"name":"instance-20240928-064732"},
//        "@version":"1","message":"2024-09-28T13:21:07.641Z  INFO 134276 --- [MatchFetcher] [2u9.mongodb.net] org.mongodb.driver.cluster               : Adding discovered server ac-fema6yu-shard-00-00.lyj92u9.mongodb.net:27017 to client view of cluster"}
