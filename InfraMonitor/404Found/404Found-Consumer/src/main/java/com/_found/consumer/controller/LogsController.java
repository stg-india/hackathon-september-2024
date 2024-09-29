package com._found.consumer.controller;

import com._found.consumer.model.RMQMessage;
import com._found.consumer.service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.time.ZoneOffset;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.List;

@CrossOrigin
@RestController
public class LogsController {

    @Autowired
    private MessageService messageService;

    @GetMapping("/messages")
    public List<RMQMessage> getAllMessages() {
        return (List<RMQMessage>) messageService.fetchAllMessages();
    }

    @GetMapping("/messages/by-host")
    public List<RMQMessage> getMessagesByHost(@RequestParam String hostName) {
        return messageService.fetchMessagesByHostName(hostName);
    }

    @GetMapping("/messages/timestamp")
    public Iterable<RMQMessage> getMessagesByTimestampRange(@RequestParam String interval) {

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss.SSSX");
        System.out.println(interval);
        // Get the current time in UTC
        ZonedDateTime currentTime = ZonedDateTime.now().withZoneSameInstant(java.time.ZoneOffset.UTC);
        ZonedDateTime updatedTime = currentTime.plusHours(5).plusMinutes(30);

        // Define the number of minutes to subtract
        long number = Long.parseLong(interval);

        // Subtract x minutes from the current time
        ZonedDateTime timeMinusXMinutes = updatedTime.minus(number, ChronoUnit.MINUTES);

        // Format both times as strings
        String endDate = updatedTime.format(formatter);
        String startDate = timeMinusXMinutes.format(formatter);
        String newStartDate = startDate.substring(0, startDate.length() - 5);
        String newEndDate = endDate.substring(0, endDate.length() - 5);
        System.out.println(newStartDate + " " + newEndDate);
        return messageService.getMessagesByTimestampRange(newStartDate, newEndDate);
    }

    @GetMapping("/messages/keyword")
    public List<RMQMessage> getMessagesByWord(@RequestParam String word) {
        return messageService.getExactMatch(word);
    }

}
