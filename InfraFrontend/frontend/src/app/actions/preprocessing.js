// preprocessing.js

// Mapping of log levels to status codes
const logLevelToStatusCode = {
    "info": 200,
    "warn": 300,
    "error": 500,
    "debug": 100, // You can adjust this value as needed
  };
  
  // Function to extract (x, y) points
  function extractPoints(logs) {
    return logs.map(log => {
      const timestamp = log.time; // x coordinate
      let statusCode = null; // y coordinate
  
      // Extract log level from log message
      const logLevelMatch = log.log.match(/(info|warn|error|debug)/);
      if (logLevelMatch) {
        const logLevel = logLevelMatch[1]; // Extract the log level
        statusCode = logLevelToStatusCode[logLevel] || null; // Map to status code
      }
  
      return {
        x: timestamp,
        y: statusCode // Use mapped status code
      };
    }).filter(point => point.y !== null); // Filter out points without a status code
  }
  
  // Function to preprocess the logs
  function preprocessLogs(inputLogs) {
    const points = extractPoints(inputLogs);
    return JSON.stringify(points, null, 2); // Return points as JSON
  }
  
  // Sample input logs
  const logs = [
    {
      "log": "2024-09-28T12:34:56.789Z - info: Application started on port 3000\n",
      "stream": "stdout",
      "time": "2024-09-28T12:34:56.789Z",
      "kubernetes": {}
    },
    {
      "log": "2024-09-28T12:35:15.123Z - error: Database connection failed\n",
      "stream": "stderr",
      "time": "2024-09-28T12:35:15.123Z",
      "kubernetes": {}
    },
    {
      "log": "2024-09-28T12:35:30.234Z - info: Health check passed\n",
      "stream": "stdout",
      "time": "2024-09-28T12:35:30.234Z",
      "kubernetes": {}
    },
    {
      "log": "2024-09-28T12:36:45.567Z - warn: API request failed with status 500\n",
      "stream": "stderr",
      "time": "2024-09-28T12:36:45.567Z",
      "kubernetes": {}
    },
    {
      "log": "2024-09-28T12:37:20.789Z - info: User login successful, userId: 12345\n",
      "stream": "stdout",
      "time": "2024-09-28T12:37:20.789Z",
      "kubernetes": {}
    },
    {
      "log": "2024-09-28T12:38:10.111Z - debug: Cache hit for user profile\n",
      "stream": "stdout",
      "time": "2024-09-28T12:38:10.111Z",
      "kubernetes": {}
    },
    {
      "log": "2024-09-28T12:39:05.222Z - error: Failed to send email notification\n",
      "stream": "stderr",
      "time": "2024-09-28T12:39:05.222Z",
      "kubernetes": {}
    },
    {
      "log": "2024-09-28T12:40:15.333Z - warn: Deprecated API endpoint accessed\n",
      "stream": "stderr",
      "time": "2024-09-28T12:40:15.333Z",
      "kubernetes": {}
    },
    {
      "log": "2024-09-28T12:41:25.444Z - info: Data processing completed successfully\n",
      "stream": "stdout",
      "time": "2024-09-28T12:41:25.444Z",
      "kubernetes": {}
    },
    {
      "log": "2024-09-28T12:42:35.555Z - error: Unexpected token in JSON response\n",
      "stream": "stderr",
      "time": "2024-09-28T12:42:35.555Z",
      "kubernetes": {}
    },
    {
      "log": "2024-09-28T12:43:45.666Z - info: User logout successful, userId: 12345\n",
      "stream": "stdout",
      "time": "2024-09-28T12:43:45.666Z",
      "kubernetes": {}
    },
    {
      "log": "2024-09-28T12:44:55.777Z - debug: User preferences retrieved\n",
      "stream": "stdout",
      "time": "2024-09-28T12:44:55.777Z",
      "kubernetes": {}
    },
    {
      "log": "2024-09-28T12:45:05.888Z - warn: Rate limit exceeded for userId: 12345\n",
      "stream": "stderr",
      "time": "2024-09-28T12:45:05.888Z",
      "kubernetes": {}
    },
    {
      "log": "2024-09-28T12:46:15.999Z - info: Scheduled job completed successfully\n",
      "stream": "stdout",
      "time": "2024-09-28T12:46:15.999Z",
      "kubernetes": {}
    },
    {
      "log": "2024-09-28T12:47:26.000Z - error: Invalid input data received\n",
      "stream": "stderr",
      "time": "2024-09-28T12:47:26.000Z",
      "kubernetes": {}
    },
    {
      "log": "2024-09-28T12:48:36.111Z - debug: User activity logged\n",
      "stream": "stdout",
      "time": "2024-09-28T12:48:36.111Z",
      "kubernetes": {}
    },
    {
      "log": "2024-09-28T12:49:46.222Z - info: Application shutting down gracefully\n",
      "stream": "stdout",
      "time": "2024-09-28T12:49:46.222Z",
      "kubernetes": {}
    },
    {
      "log": "2024-09-28T12:50:56.333Z - error: Connection to external service failed\n",
      "stream": "stderr",
      "time": "2024-09-28T12:50:56.333Z",
      "kubernetes": {}
    },
    {
      "log": "2024-09-28T12:51:06.444Z - warn: Disk space running low\n",
      "stream": "stderr",
      "time": "2024-09-28T12:51:06.444Z",
      "kubernetes": {}
    },
    {
      "log": "2024-09-28T12:52:16.555Z - info: User registered successfully, userId: 67890\n",
      "stream": "stdout",
      "time": "2024-09-28T12:52:16.555Z",
      "kubernetes": {}
    },
    {
      "log": "2024-09-28T12:53:26.666Z - debug: Token refreshed for userId: 67890\n",
      "stream": "stdout",
      "time": "2024-09-28T12:53:26.666Z",
      "kubernetes": {}
    },
    {
      "log": "2024-09-28T12:54:36.777Z - error: Email service not responding\n",
      "stream": "stderr",
      "time": "2024-09-28T12:54:36.777Z",
      "kubernetes": {}
    },
    {
      "log": "2024-09-28T12:55:46.888Z - warn: Configuration file missing\n",
      "stream": "stderr",
      "time": "2024-09-28T12:55:46.888Z",
      "kubernetes": {}
    },
    {
      "log": "2024-09-28T12:56:56.999Z - info: Backup completed successfully\n",
      "stream": "stdout",
      "time": "2024-09-28T12:56:56.999Z",
      "kubernetes": {}
    }
  ];
  
  
  // Call the function and log the results
  const result = preprocessLogs(logs);
  console.log(result);
  