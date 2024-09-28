package com.stgi.segfault.Service;


import com.influxdb.client.InfluxDBClient;
import com.influxdb.client.QueryApi;
import com.influxdb.query.FluxRecord;
import com.influxdb.query.FluxTable;
import com.stgi.segfault.dto.InfluxQueryResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class InfluxDBService {

    @Autowired
    private InfluxDBClient influxDBClient;

    public List<InfluxQueryResult> queryInfluxDB(String queryString) {
//        String flux = "from(bucket:\"my-bucket\") |> range(start: 0)";

        QueryApi queryApi = influxDBClient.getQueryApi();

        List<FluxTable> tables = queryApi.query(queryString);

        // Prepare the list to store query results
        List<InfluxQueryResult> results = new ArrayList<>();

        // Iterate over each table and its records
        for (FluxTable fluxTable : tables) {
            List<FluxRecord> records = fluxTable.getRecords();
            for (FluxRecord fluxRecord : records) {
                InfluxQueryResult result = new InfluxQueryResult();
                result.setTime(fluxRecord.getTime());
                result.setValue(fluxRecord.getValueByKey("_value"));
                results.add(result); // Collect the result in a list
            }
        }

        // Return the results
        return results;
    }
}
