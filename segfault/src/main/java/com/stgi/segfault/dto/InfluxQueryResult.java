package com.stgi.segfault.dto;

import lombok.*;

import java.time.Instant;

public class InfluxQueryResult {
    private Instant time;
    private Object value;

    public InfluxQueryResult(Instant time, Object value) {
        this.time = time;
        this.value = value;
    }

    public Instant getTime() {
        return time;
    }

    public Object getValue() {
        return value;
    }

    public void setValue(Object value) {
        this.value = value;
    }

    public void setTime(Instant time) {
        this.time = time;
    }

    public InfluxQueryResult() {
    }
}
