"use client";
import { useEffect, useRef, useState } from "react";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

const LogChart = () => {
    const canvasRef = useRef(null);
    const [chartInstance, setChartInstance] = useState(null);
    const [logData, setLogData] = useState([]); // Stores all generated log data
    const [filteredData, setFilteredData] = useState([]); // Stores data after applying the filter
    const [selectedRange, setSelectedRange] = useState("all"); // Track the selected range

    const statusOptions = [
        { label: "All Status Codes", value: "all" },
        { label: "1xx", value: "1xx" },
        { label: "2xx", value: "2xx" },
        { label: "3xx", value: "3xx" },
        { label: "4xx", value: "4xx" },
        { label: "5xx", value: "5xx" },
    ];

    // Function to generate mock log data
    const generateLogData = () => {
        const currentTime = new Date();
        const timestamp = `${currentTime.getMonth() + 1}/${currentTime.getDate()} ${currentTime.getHours()}:${String(currentTime.getMinutes()).padStart(2, '0')}:${String(currentTime.getSeconds()).padStart(2, '0')}`;
        const statusCode = Math.floor(Math.random() * (501 - 100)) + 100; // Random status code between 100 and 500
        return { timestamp, statusCode };
    };

    // Filter data based on the selected range
    const filterData = (range) => {
        if (range === "all") {
            return logData;
        }
        const rangeStart = parseInt(range[0]) * 100;  // Get the first digit of the range, e.g., '1' for 1xx
        const rangeEnd = rangeStart + 99;             // Add 99 to the rangeStart, e.g., 100-199 for 1xx
        return logData.filter(entry => entry.statusCode >= rangeStart && entry.statusCode <= rangeEnd);
    };

    // Effect to create the chart on mount
    useEffect(() => {
        const ctx = canvasRef.current.getContext('2d');

        const myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: [],
                datasets: [{
                    label: 'Status Codes',
                    data: [],
                    borderColor: 'rgba(75, 192, 192, 1)',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderWidth: 2,
                    fill: true,
                }],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: {
                        type: 'category',
                        title: {
                            display: true,
                            text: 'Time',
                        },
                        ticks: {
                            autoSkip: true,
                            maxTicksLimit: 10,
                        },
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Status Codes',
                        },
                        beginAtZero: true,
                        suggestedMin: 100,
                        suggestedMax: 500,
                        ticks: {
                            stepSize: 100,
                        },
                    },
                },
                interaction: {
                    mode: 'index',
                    intersect: false,
                },
                plugins: {
                    legend: {
                        display: true,
                    },
                },
            },
        });

        setChartInstance(myChart);

        // Cleanup the chart when component unmounts
        return () => {
            myChart.destroy();
        };
    }, []);

    // Effect to generate log data at intervals
    useEffect(() => {
        const intervalId = setInterval(() => {
            const newLog = generateLogData(); // Generate new log data
            setLogData((prevLogs) => {
                const updatedLogs = [...prevLogs, newLog];
                if (updatedLogs.length > 30) {
                    updatedLogs.shift(); // Limit to the last 30 entries
                }
                return updatedLogs;
            });
        }, 500); // Generate new data every half second

        return () => clearInterval(intervalId);
    }, []);

    // Effect to update filteredData when logData or selectedRange changes
    useEffect(() => {
        const newFilteredData = filterData(selectedRange);
        setFilteredData(newFilteredData);
    }, [logData, selectedRange]);

    // Effect to update chart when filteredData changes
    useEffect(() => {
        if (chartInstance && filteredData.length > 0) {
            chartInstance.data.labels = filteredData.map(entry => entry.timestamp);
            chartInstance.data.datasets[0].data = filteredData.map(entry => entry.statusCode);
            chartInstance.update('none'); // Update the chart without animation
        }
    }, [filteredData, chartInstance]);

    // Handle dropdown change
    const handleFilterChange = (event) => {
        setSelectedRange(event.target.value); // Update selectedRange state
    };

    return (
        <div className="w-1/3 overflow-hidden bg-[#16141A] p-3 m-2 rounded-md shadow-lg" style={{ height: '400px', position: 'relative' }}>
            <div style={{ position: 'absolute', top: '10px', right: '10px', zIndex: 1 }}>
                <select onChange={handleFilterChange} style={{ padding: '5px', backgroundColor: '#333', color: '#fff', borderRadius: '5px' }}>
                    {statusOptions.map(option => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                </select>
            </div>
            <canvas ref={canvasRef} style={{ height: '100%', width: '100%' }}></canvas>
        </div>
    );
};

export default LogChart;
