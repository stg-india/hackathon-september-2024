"use client"
import React, { useEffect, useState } from "react";
import axios from "axios";
import Log from "./log";

export default function LogSection() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  // Fetching function

  // const fetchLogs = async () => {
  //   setLoading(true); // Set loading state to true
  //   try {
  //     const response = await axios.get("http://localhost:3001/api/logs"); // Adjust the URL to your API
  //     setLogs((prevLogs) => [...prevLogs, ...response.data]); // Set fetched logs
  //     setError(null); // Reset error state
  //   } catch (err) {
  //     setError("Error fetching logs"); // Handle error
  //     console.error("Error fetching logs:", err);
  //   } finally {
  //     setLoading(false); // Set loading state to false
  //   }
  // };

  // // Polling

  // useEffect(() => {
  //   fetchLogs(); // Fetch initial logs
  //   const interval = setInterval(() => {
  //     fetchLogs(); // Poll for new logs every 5 seconds
  //   }, 5000);

  //   // Cleanup the interval on component unmount
  //   return () => clearInterval(interval);
  // }, []);
  const logData = [];
  const currentTime = new Date();

  // Generate log data (120 entries representing the last 2 hours)
  for (let i = 0; i < 120; i++) {
    const time = new Date(currentTime.getTime() - i * 60000); // Subtract i minutes
    const timestamp = `${time.getMonth() + 1}/${time.getDate()} ${time.getHours()}:${String(time.getMinutes()).padStart(2, '0')}:${String(time.getSeconds()).padStart(2, '0')}`;
    const statusCode = Math.floor(Math.random() * (501 - 100)) + 100; // Random status code between 100 and 500
    logData.push([timestamp, Math.floor(time.getTime() / 1000), statusCode]);
  }

  // Reverse log data so most recent logs come first
  logData.reverse();

  // Debugging: Print logData to the console
  console.log('logData:', logData);

  return (
    <div className="log-section">
      <h1>Log Section</h1>
      {logData.length === 0 ? (
        <p>No logs available.</p>
      ) : (
        <ul>
          {logData.map((log, index) => (
            <li key={index}>
              <Log logData={log} /> {/* Log component displays log details */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
