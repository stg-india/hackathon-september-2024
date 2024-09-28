package com.stgi.segfault.Controller;

import com.influxdb.query.FluxTable;
import com.stgi.segfault.Service.InfluxDBService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/influxdb")
public class InfluxDBController {

    @Autowired
    private InfluxDBService influxDBService;

    @GetMapping("/query")
    public List<FluxTable> query(@RequestParam String query) {
        return influxDBService.queryInfluxDB(query);
    }
}