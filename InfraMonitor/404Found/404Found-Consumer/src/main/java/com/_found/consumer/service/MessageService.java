package com._found.consumer.service;

import com._found.consumer.model.RMQMessage;
import com._found.consumer.repo.LogRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;

@Service
public class MessageService {
    @Autowired
    private LogRepo logRepo;

    public Iterable<RMQMessage> fetchAllMessages() {
        Pageable pageable = PageRequest.of(1, 300);
        Page<RMQMessage> messagesPage = logRepo.findAll(pageable);
        return messagesPage.getContent();
    }

    public List<RMQMessage> fetchMessagesByHostName(String hostName) {
        System.out.println("hostname:" + hostName);
        List<RMQMessage> messages = logRepo.findByHostName(hostName);
        System.out.println("messages:" + messages.toString());
        return messages;
    }

    public List<RMQMessage> getMessagesByTimestampRange(String startDate, String endDate) {
            return logRepo.findByTimeRange(startDate, endDate);
    }

    public List<RMQMessage> getExactMatch(String exactMatch) {
        return logRepo.findByExactMessage(exactMatch);
    }
}
