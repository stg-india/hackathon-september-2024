//jshint esversion:6
const k8s = require("@kubernetes/client-node");
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const lodash = require("lodash");
const zlib = require('zlib');
const { Readable } = require('stream');
const { InfluxDB, Point } = require('@influxdata/influxdb-client');


const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.static(__dirname + "/public"));

// InfluxDB Setup
const influxDBUrl = 'https://us-east-1-1.aws.cloud2.influxdata.com'; // Replace with your InfluxDB URL
const influxDBToken = '6pp7Z5tLxW2d3vVBvXilch10xxtJgarDkx598w-HtUkwoYmR4yHFIbHJL8DCM-aAnpS6jtIF3a12D-A_DJYv1A=='; // Replace with your InfluxDB token
const influxDBOrg = 'Peacemakers'; // Replace with your organization
const influxDBBucket = 'log-data'; // Replace with your bucket name

const influxDB = new InfluxDB({ url: influxDBUrl, token: influxDBToken });
const influxWriteApi = influxDB.getWriteApi(influxDBOrg, influxDBBucket, 'ns');
const queryApi = influxDB.getQueryApi(influxDBOrg);

let posts = [];

const kc = new k8s.KubeConfig();
kc.loadFromDefault();
const k8sApi = kc.makeApiClient(k8s.CoreV1Api);


app.get("/logs", async (req, res) => {
  try {
    // Fetch the logs from the Kubernetes pod
    const logs = await k8sApi.readNamespacedPodLog(
      "logger-hackathon-pod",
      "default"
    );

    // Split the logs by line
    const logLines = logs.body.split("\n");

    // Use regex to extract parts of each log line into the required format
    const parsedLogs = logLines
      .filter((line) => line.trim()) // Filter out empty lines
      .map((line) => {
        const regex =
          /(\d{4}-\d{2}-\d{2}) (\d{2}:\d{2}:\d{2}) (\w+) \[(.*?)\] (.+)/;
        const match = line.match(regex);

        if (match) {
          return {
            date: match[1],
            Time: match[2],
            Level: match[3],
            Source: match[4],
            Message: match[5],
          };
        } else {
          return { raw: line };
        }
      });

    
    // Convert parsed logs to JSON
    const jsonLogs = JSON.stringify(parsedLogs);

    // Compress the JSON logs using Gzip
    zlib.gzip(jsonLogs, (err, buffer) => {
      if (err) {
        console.error('Error during compression:', err);
        res.status(500).send('Error compressing logs');
      } else {
        // Store compressed logs in InfluxDB
        const point = new Point('compressed_logs')
          .tag('source', 'k8s_logs') // Add tags if needed
          .floatField('data', buffer.length) // Store the size of the compressed log
          .stringField('compressed_data', buffer.toString('base64')); // Store compressed data as base64

        influxWriteApi.writePoint(point);
        influxWriteApi.flush()
          .then(() => {
            console.log('Compressed logs written to InfluxDB');
          })
          .catch((error) => {
            console.error('Error writing logs to InfluxDB:', error);
          });

        // Set the appropriate headers for gzip content
        res.set('Content-Encoding', 'gzip');
        res.set('Content-Type', 'application/json');
        res.send(buffer);
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching logs");
  }
});


app.get("/", function (req, res) {
  res.render("home", { content: homeStartingContent, postArr: posts });
});


// const fluxQuery = `from(bucket: "${influxDBBucket}")
//   |> range(start: -1h)
//   |> filter(fn: (r) => r._measurement == "compressed_logs")
//   |> filter(fn: (r) => r._field == "compressed_data")
//   |> filter(fn: (r) => r.source == "k8s_logs")`;

// queryApi.queryRows(fluxQuery, {
//   next(row, tableMeta) {
//     const rowObject = tableMeta.toObject(row);
//     console.log(rowObject);
//   },
//   error(error) {
//     console.error('Query error', error);
//   },
//   complete() {
//     console.log('Query completed');
//   },
// });

app.post("/fetch/logs", async (req, res) => {
  const { startDate, endDate, level, searchKeyword } = req.body;

  // Validate the date range
  if (!startDate || !endDate) {
      return res.status(400).json({ error: "Start date and end date are required." });
  }

  try {
      // Construct the query
      let query = `
          from(bucket: "${influxDBBucket}")
          |> range(start: ${startDate}, stop: ${endDate})
          |> filter(fn: (r) => r._measurement == "compressed_logs")
      `;

      // Add level filter if provided
      if (level) {
          query += ` |> filter(fn: (r) => r.Level == "${level}")`;
      }

      // Execute the query
      const result = await influxDB.getQueryApi(influxDBOrg).queryRows(query, {
          next: (row, tableMeta) => {
              const logEntry = tableMeta.get(row, '_value');
              const compressedData = Buffer.from(logEntry, 'base64');

              // Decompress the log entry using zlib
              zlib.gunzip(compressedData, (err, buffer) => {
                  if (err) {
                      console.error('Error decompressing log data:', err);
                  } else {
                      const logString = buffer.toString();
                      // Check if logString contains the searchKeyword
                      if (!searchKeyword || logString.includes(searchKeyword)) {
                          res.write(logString + "\n"); // Send each log entry
                      }
                  }
              });
          },
          error: (error) => {
              console.error('Error querying InfluxDB:', error);
              res.status(500).send('Error querying InfluxDB');
          },
          complete: () => {
              console.log('Query completed');
              res.end();
          }
      });
  } catch (error) {
      console.error('Error processing request:', error);
      res.status(500).json({ error: 'Error processing request' });
  }
});


app.post("/log-level-count", async (req, res) => {
  const { startDate, endDate, searchKeyword } = req.body;

  // Validate the date range
  if (!startDate || !endDate) {
      return res.status(400).json({ error: "Start date and end date are required." });
  }

  try {
      // Query InfluxDB for logs within the date range
      const query = `
          from(bucket: "${influxDBBucket}")
          |> range(start: ${startDate}, stop: ${endDate})
          |> filter(fn: (r) => r._measurement == "compressed_logs")
      `;
      
      const counts = {
          ERROR: 0,
          WARNING: 0,
          CRITICAL: 0,
          INFO: 0,
          DEBUG: 0,
      };

      const result = await influxDB.getQueryApi(influxDBOrg).queryRows(query, {
          next: (row, tableMeta) => {
              const logEntry = tableMeta.get(row, '_value');
              const compressedData = Buffer.from(logEntry, 'base64');

              // Decompress the log entry
              zlib.gunzip(compressedData, (err, buffer) => {
                  if (err) {
                      console.error('Error decompressing log data:', err);
                  } else {
                      const logString = buffer.toString();
                      // If searchKeyword is provided, filter logs
                      if (!searchKeyword || logString.includes(searchKeyword)) {
                          // Count log levels
                          const logLevel = JSON.parse(logString).Level; // Assuming the log is JSON formatted
                          if (counts.hasOwnProperty(logLevel)) {
                              counts[logLevel]++;
                          }
                      }
                  }
              });
          },
          error: (error) => {
              console.error('Error querying InfluxDB:', error);
              res.status(500).send('Error querying InfluxDB');
          },
          complete: () => {
              console.log('Query completed');
              res.json(counts); // Send the counts as response
          }
      });
  } catch (error) {
      console.error('Error processing request:', error);
      res.status(500).json({ error: 'Error processing request' });
  }
});



app.listen(3000, function () {
  console.log("Server started on port 3000");
});
