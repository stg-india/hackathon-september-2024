// components/LogChart.js
"useClient"
import { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const LogChart = () => {
    const canvasRef = useRef(null);

    // Generate data for the last 2 hours at 1-minute intervals
    const logData = [];
    const currentTime = new Date();

    for (let i = 0; i < 120; i++) {
        const time = new Date(currentTime.getTime() - i * 60000); // subtract i minutes from current time
        const timestamp = `${time.getMonth() + 1}/${time.getDate()} ${time.getHours()}:${String(time.getMinutes()).padStart(2, '0')}:${String(time.getSeconds()).padStart(2, '0')}`;
        const statusCode = Math.floor(Math.random() * (501 - 100)) + 100; // Random status code between 100 and 500
        logData.push([timestamp, Math.floor(time.getTime() / 1000), statusCode]);
    }

    // Reverse data to show the most recent time first
    logData.reverse();
    console.log(logData);

    useEffect(() => {
        const labels = logData.map(entry => entry[0]);
        const statusCodes = logData.map(entry => entry[2]);

        const ctx = canvasRef.current.getContext('2d');

        const myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Status Codes',
                    data: statusCodes,
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
                        min: 90,  // Start viewing at the 90th minute (i.e., the last 30 minutes)
                        max: 120, // End at the most recent timestamp
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

        // Cleanup the chart when component unmounts
        return () => {
            myChart.destroy();
        };
    }, []);

    return (
        <div style={{ overflowX: 'scroll', width: '100%' }}>
            <div style={{ width: '2000px', height: '400px' }}>
                <canvas ref={canvasRef}></canvas>
            </div>
        </div>
    );
};

export default LogChart;
