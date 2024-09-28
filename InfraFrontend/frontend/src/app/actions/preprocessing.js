const fs = require('fs');

const logData = `
[09/28 12:40:25] [ info] [fluent bit] version=3.1.9, commit=431fa79ae2, pid=1
[09/28 12:41:10] [ error] [parser] invalid number of parameters in decoder
[09/28 12:41:15] [ info] [storage] ver=1.5.2, type=memory, sync=normal, checksum=off, max_chunks_up=128
[09/28 12:42:00] [ debug] [cmetrics] version=0.9.6
[09/28 12:42:25] [ info] [ctraces ] version=0.5.6
[09/28 12:43:05] [ warn] [kubernetes:kubernetes.0] missing token in request
[09/28 12:43:30] [ info] [input:tail:tail.0] initializing
[09/28 12:44:00] [ error] [output:stdout:stdout.0] worker #0 failed to start
[09/28 12:45:10] [ info] [input:tail:tail.0] storage_strategy='memory' (memory only)
[09/28 12:45:50] [ debug] [filter:kubernetes:kubernetes.0] testing connectivity with API server...
[09/28 12:46:30] [ info] [filter:kubernetes:kubernetes.0] connectivity OK
[09/28 12:47:20] [ error] [input:tail:tail.1] unable to read file
[09/28 12:48:05] [ warn] [output:stdout:stdout.1] log buffer overflow
[09/28 12:49:00] [ info] [filter:kubernetes:kubernetes.0] token updated
[09/28 12:49:40] [ debug] [cmetrics] metrics collection started
[09/28 12:50:15] [ info] [sp] stream processor started
[09/28 12:51:10] [ error] [parser] parsing failed due to missing fields
[09/28 12:52:00] [ warn] [filter:kubernetes:kubernetes.0] high latency detected
[09/28 12:53:00] [ info] [output:stdout:stdout.0] worker #1 started
[09/28 12:54:15] [ error] [input:tail:tail.0] file not found
[09/28 12:55:25] [ info] [storage] cache cleared
[09/28 12:56:30] [ debug] [ctraces ] trace logging enabled
[09/28 12:57:40] [ warn] [output:stdout:stdout.1] retrying due to network error
[09/28 12:58:05] [ info] [input:tail:tail.2] monitoring new file
[09/28 12:59:10] [ error] [filter:kubernetes:kubernetes.1] authentication failed
[09/28 13:00:00] [ info] [storage] new configuration loaded
[09/28 13:01:20] [ debug] [cmetrics] metrics collection stopped
[09/28 13:02:15] [ warn] [input:tail:tail.1] rate limit exceeded
[09/28 13:03:00] [ info] [output:stdout:stdout.0] worker #2 started
[09/28 13:04:30] [ error] [parser] unexpected token encountered
[09/28 13:05:20] [ info] [filter:kubernetes:kubernetes.0] local POD info OK
[09/28 13:06:05] [ debug] [ctraces ] trace session ended
[09/28 13:07:10] [ warn] [sp] stream processor stalled
[09/28 13:08:15] [ info] [input:tail:tail.3] cleanup complete
[09/28 13:09:25] [ error] [output:stdout:stdout.1] unexpected output format
[09/28 13:10:00] [ info] [filter:kubernetes:kubernetes.1] metrics updated
[09/28 13:11:30] [ debug] [cmetrics] version 0.10.0 released
[09/28 13:12:00] [ warn] [parser] data truncation warning
[09/28 13:13:45] [ info] [input:tail:tail.0] restart successful
[09/28 13:14:25] [ error] [filter:kubernetes:kubernetes.0] connection reset by peer
[09/28 13:15:15] [ info] [storage] cleanup completed
[09/28 13:16:05] [ debug] [ctraces ] configuration reloaded
[09/28 13:17:00] [ warn] [output:stdout:stdout.0] slow consumer detected
[09/28 13:18:20] [ info] [filter:kubernetes:kubernetes.0] deployment status OK
[09/28 13:19:15] [ error] [parser] failed to parse log entry
[09/28 13:20:30] [ info] [input:tail:tail.2] monitoring stopped
[09/28 13:21:05] [ debug] [cmetrics] metrics cleared
[09/28 13:22:00] [ warn] [sp] stream processor restarted
[09/28 13:23:10] [ info] [output:stdout:stdout.1] worker #3 started
[09/28 13:24:15] [ error] [input:tail:tail.1] timeout occurred
[09/28 13:25:25] [ info] [storage] memory usage report generated
[09/28 13:26:00] [ debug] [ctraces ] trace logging disabled
[09/28 13:27:30] [ warn] [filter:kubernetes:kubernetes.1] node unreachable
[09/28 13:28:05] [ info] [input:tail:tail.0] reading file...
[09/28 13:29:15] [ error] [output:stdout:stdout.0] write failed
[09/28 13:30:00] [ info] [sp] stream processor shutting down
[09/28 13:31:05] [ debug] [cmetrics] metrics resampling started
[09/28 13:32:20] [ warn] [parser] log format changed
[09/28 13:33:15] [ info] [filter:kubernetes:kubernetes.0] health check passed
[09/28 13:34:00] [ error] [input:tail:tail.2] invalid file descriptor
[09/28 13:35:25] [ info] [output:stdout:stdout.1] operation successful
`;

const logLevelToStatusCode = {
    'info': 200,
    'error': 500,
    'warn': 400,
    'debug': 300,
};

const extractPoints = (logs) => {
    const lines = logs.trim().split('\n');
    const points = [];

    lines.forEach(line => {
        const timestampMatch = line.match(/\[(.*?)\]/);
        const levelMatch = line.match(/\[\s*(\w+)\s*\]/); // Updated regex to capture space before and after log level
        
        if (timestampMatch && levelMatch) {
            const timestamp = timestampMatch[1];
            const logLevel = levelMatch[1].trim();
            const statusCode = logLevelToStatusCode[logLevel.toLowerCase()] || null;

            if (statusCode) {
                // Convert the timestamp to epoch time
                const epochTime = Math.floor(new Date(timestamp).getTime() / 1000);
                
                // Push an array with original date-time, epoch, and status code
                points.push([timestamp, epochTime, statusCode]);
            }
        }
    });

    return points;
};

const points = extractPoints(logData);
console.log(JSON.stringify(points, null, 2));