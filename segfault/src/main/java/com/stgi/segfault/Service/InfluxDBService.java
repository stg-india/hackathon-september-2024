package com.stgi.segfault.Service;


import com.influxdb.client.InfluxDBClient;
import com.influxdb.client.QueryApi;
import com.influxdb.query.FluxTable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InfluxDBService {

    @Autowired
    private InfluxDBClient influxDBClient;

    public List<FluxTable> queryInfluxDB(String queryString) {
//        String flux = "from(bucket:\"my-bucket\") |> range(start: 0)";

        QueryApi queryApi = influxDBClient.getQueryApi();

        List<FluxTable> tables = queryApi.query(queryString);
        return tables;
//        for (FluxTable fluxTable : tables) {
//            List<FluxRecord> records = fluxTable.getRecords();
//            for (FluxRecord fluxRecord : records) {
//                System.out.println(fluxRecord.getTime() + ": " + fluxRecord.getValueByKey("_value"));
//            }
//        }
    }
}
