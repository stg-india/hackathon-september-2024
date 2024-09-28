"use client";
import { useEffect, useRef, useState } from "react";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

const ErrorChart = () => {
    const canvasRef = useRef(null);
    const [chartInstance, setChartInstance] = useState(null);

    // Function to generate mock log data
    const generateLogData = () => {
        const currentTime = new Date();
        const timestamp = `${currentTime.getMonth() + 1}/${currentTime.getDate()} ${currentTime.getHours()}:${String(currentTime.getMinutes()).padStart(2, '0')}:${String(currentTime.getSeconds()).padStart(2, '0')}`;
        const statusCode = Math.floor(Math.random() * (501 - 100)) + 100; // Random status code between 100 and 500
        return [timestamp, Math.floor(currentTime.getTime() / 1000), statusCode];
    };

    // Effect to create the chart on mount
    useEffect(() => {
        const ctx = canvasRef.current.getContext('2d');
    
        const myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: [],
                datasets: [{
                    label: 'Error Codes',
                    data: [],
                    // Change to light reddish color for error indication
                    borderColor: 'rgba(255, 99, 132, 1)', // Light reddish color for the line
                    backgroundColor: 'rgba(255, 99, 132, 0.2)', // Light reddish background
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
                            text: 'Error Codes',
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
    

    // Effect to fetch and update log data
    useEffect(() => {
        const intervalId = setInterval(() => {
            const newLog = generateLogData(); // Generate new log data
            const newTimestamp = newLog[0];
            const newStatusCode = newLog[2];

            // Append new data to the chart
            if (chartInstance) {
                chartInstance.data.labels.push(newTimestamp);
                chartInstance.data.datasets[0].data.push(newStatusCode);

                // Limit the number of points displayed in the chart
                if (chartInstance.data.labels.length > 30) {
                    chartInstance.data.labels.shift(); // Remove the first label
                    chartInstance.data.datasets[0].data.shift(); // Remove the first data point
                }

                chartInstance.update('none'); // Update the chart without animation
            }
        }, 500); // Update every half second

        return () => clearInterval(intervalId);
    }, [chartInstance]);

    return (
        <div className="w-1/3 overflow-hidden bg-[#16141A] p-3 m-2 rounded-md shadow-lg" style={{ height: '400px' }}>
            <canvas ref={canvasRef} style={{ height: '100%', width: '100%' }}></canvas>
        </div>
    );
};

export default ErrorChart;
