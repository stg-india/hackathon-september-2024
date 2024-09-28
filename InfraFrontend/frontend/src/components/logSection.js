import React, { useEffect, useState } from 'react';
import axios from 'axios';


export default function LogSection(){
    //  api poll
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchLogs = async () => {
        setLoading(true); // Set loading state to true
        try {
          const response = await axios.get('http://localhost:3001/api/logs'); // Adjust the URL to your API
          setLogs(response.data); // Set fetched logs
          setError(null); // Reset error state
        } catch (err) {
          setError('Error fetching logs'); // Handle error
          console.error('Error fetching logs:', err);
        } finally {
          setLoading(false); // Set loading state to false
        }
      };
    useEffect(() => {
        fetchLogs(); // Fetch initial logs
        const interval = setInterval(() => {
          fetchLogs(); // Poll for new logs every 5 seconds
        }, 5000);
    
        // Cleanup the interval on component unmount
        return () => clearInterval(interval);
      }, []);
    return (
        <div>
        Logsection
        </div>
    )
};