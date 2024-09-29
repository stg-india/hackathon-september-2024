package com._found.consumer.repo;
import com._found.consumer.model.RMQMessage;
import org.springframework.data.elasticsearch.annotations.Query;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.stereotype.Repository;

import java.time.Instant;
import java.util.List;

public interface LogRepo extends ElasticsearchRepository<RMQMessage, String>  {

    @Query("{ \"bool\": { \"must\": [ { \"term\": { \"host.name.keyword\": \"?0\" } } ] } }")
    List<RMQMessage> findByHostName(String hostName);

    @Query("{\"bool\": {\"must\": [{\"range\": {\"timestamp\": {\"gte\": \"?0\", \"lte\": \"?1\", \"format\": \"yyyy-MM-dd'T'HH:mm:ss\"}}}]}}")
    List<RMQMessage> findByTimeRange(String startTime, String endTime);

    @Query("""
        {
          "bool": {
            "must": [
              {
                "match_phrase": {
                  "message": "?0"
                }
              }
            ]
          }
        }
    """)
    List<RMQMessage> findByExactMessage(String exactMessage);
}
