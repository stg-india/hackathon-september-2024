// 'use client';
// // Import necessary libraries
// import React from 'react';
// import { Bar } from 'react-chartjs-2';
// import { Chart as ChartJS, TimeScale, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';
// import 'chartjs-adapter-date-fns'; // Import adapter for date handling

// // Register necessary Chart.js components
// ChartJS.register(TimeScale, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

// const BarChartWithTimestamp = ({data}) => {
//   // Data for the bar chart
//     // "log": {
//     //   "file": {
//     //     "path": "/home/prranavbabbar2317/out.log"
//     //   }
//     // },
//     // "event": {
//     //   "original": "2024-09-28T21:41:13.052Z  INFO 134276 --- [MatchFetcher] [pool-3-thread-5] c.f.MatchFetcher.Service.MatchPoller     : Matches Fetched from the api endpoint"
//     // },
//     // "host": {
//     //   "name": "instance-20240928-064732"
//     // },
//     // "message": "2024-09-28T21:41:13.052Z  INFO 134276 --- [MatchFetcher] [pool-3-thread-5] c.f.MatchFetcher.Service.MatchPoller     : Matches Fetched from the api endpoint",
//     // "@timestamp": "2024-09-28T21:41:13.091098815Z",
//     // "@version": "1"
// //   },

//   const frequencyMap = {};

//   data.forEach(prev => {
//     const dateString = prev.message.slice(0,24);
//     const date = new Date(dateString);

//     const year = date.getFullYear();
//     const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed, so add 1
//     const day = String(date.getDate()).padStart(2, '0');
//     const hours = String(date.getHours()).padStart(2, '0');
//     const minutes = String(date.getMinutes()).padStart(2, '0');

//     const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}`;
//     frequencyMap[formattedDate] = (frequencyMap[formattedDate] || 0) + 1;

//   })

//   console.log(frequencyMap)

//   let xAxis = [];
//   let yAxis = [];

//   Object.entries(frequencyMap).forEach(([key, val]) => {
//     xAxis.push(key);
//     yAxis.push(val);
//   });

//   console.log(xAxis)
//   console.log(yAxis)

//   const data1 = {
//     labels: [...xAxis], // Passing actual Date objects, not formatted strings
//     datasets: [
//       {
//         label: 'Dataset 1',
//         data: [...yAxis],
//         backgroundColor: 'rgba(75, 192, 192, 0.2)',
//         borderColor: 'rgba(75, 192, 192, 1)',
//         borderWidth: 1,
//       },
//     ],
//   };

//   // Options for the chart
//   const options = {
//     scales: {
//       x: {
//         type: 'time',  // Specify that the x-axis should be a time scale
//         time: {
//           unit: 'day',  // Adjust the unit to 'day', 'month', 'year', etc.
//         },
//         title: {
//           display: true,
//           text: 'Date',
//         },
//       },
//       y: {
//         beginAtZero: true,
//         title: {
//           display: true,
//           text: 'Values',
//         },
//       },
//     },
//     plugins: {
//       legend: {
//         display: true,
//       },
//     },
//   };

//   return (
//     <div>
//       <Bar data={data1} options={options} />
//     </div>
//   );
// };

// export default BarChartWithTimestamp;

'use client';
// Import necessary libraries
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, TimeScale, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';
import 'chartjs-adapter-date-fns'; // Import adapter for date handling

// Register necessary Chart.js components
ChartJS.register(TimeScale, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const BarChartWithTimestamp = ({data}) => {

  const frequencyMap = {};


  data.forEach(prev => {
    const dateString = prev.message.slice(0,24);
    const date = new Date(dateString);

    // Formatting the date to use it as the key for frequencyMap
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed, so add 1
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}`;
    frequencyMap[formattedDate] = (frequencyMap[formattedDate] || 0) + 1;
  });

  // Extracting the keys and values from frequencyMap for x and y axis
  let xAxis = [];
  let yAxis = [];

  Object.entries(frequencyMap).forEach(([key, val]) => {

    if (key!="NaN-NaN-NaN NaN:NaN") {
      xAxis.push(key); // these will be time-based labels
      yAxis.push(val); // these are the corresponding values
    }
    
  });

  
  console.log(frequencyMap)

  // Data for the chart
  const chartData = {
    labels: xAxis, // Time-based labels
    datasets: [
      {
        label: 'Frequency of Events',
        data: yAxis, // Data corresponding to the labels
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Options for the chart
  const options = {
    scales: {
      x: {
        type: 'time',  // Specify that the x-axis should be a time scale
        time: {
          unit: 'day',  // Adjust the unit to 'day', 'month', etc. based on your need
          tooltipFormat: 'yyyy-MM-dd HH:mm',
        },
        title: {
          display: true,
          text: 'Timestamp',
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Frequency',
        },
      },
    },
    plugins: {
      legend: {
        display: true,
      },
    },
  };

  return (
    <div>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default BarChartWithTimestamp;



// 'use client';
// // Import necessary libraries
// import React from 'react';
// import { Bar } from 'react-chartjs-2';
// import { Chart as ChartJS, TimeScale, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';
// import { Line } from 'react-chartjs-2';

// import { LineElement, PointElement } from 'chart.js';
// ChartJS.register(LineElement, PointElement);

// import 'chartjs-adapter-date-fns'; // Import adapter for date handling

// // Register necessary Chart.js components
// // ChartJS.register(TimeScale, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

// const BarChartWithTimestamp = ({data}) => {

//   const frequencyMap = {};

//   data.forEach(prev => {
//     const dateString = prev.message.slice(0,24);
//     const date = new Date(dateString);

//     const year = date.getFullYear();
//     const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed, so add 1
//     const day = String(date.getDate()).padStart(2, '0');
//     const hours = String(date.getHours()).padStart(2, '0');
//     const minutes = String(date.getMinutes()).padStart(2, '0');

//     const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}`;
//     frequencyMap[date] = (frequencyMap[date] || 0) + 1; // Store Date object as key
//   });

//   console.log(frequencyMap);

//   let xAxis = [];
//   let yAxis = [];

//   Object.entries(frequencyMap).forEach(([key, val]) => {
//     xAxis.push(new Date(key)); // Ensure that keys are Date objects
//     yAxis.push(val);
//   });

//   const data1 = {
//     labels: xAxis, // Date objects for time scale
//     datasets: [
//       {
//         label: 'Dataset 1',
//         data: yAxis,
//         backgroundColor: 'rgba(75, 192, 192, 0.2)',
//         borderColor: 'rgba(75, 192, 192, 1)',
//         borderWidth: 1,
//       },
//     ],
//   };

//   // Options for the chart
//   const options = {
//     scales: {
//       x: {
//         type: 'time',  // Specify that the x-axis should be a time scale
//         time: {
//           unit: 'minute',  // Adjust the unit to 'day', 'month', 'minute', etc.
//         },
//         title: {
//           display: true,
//           text: 'Date',
//         },
//       },
//       y: {
//         beginAtZero: true,
//         title: {
//           display: true,
//           text: 'No of Logs',
//         },
//         ticks: {
//             stepSize: 0.5, // Set step size for y-axis to 0.5
//           },
//       },
//     },
//     plugins: {
//       legend: {
//         display: true,
//       },
//     },
//   };

//   return (
//     <div style={{ overflowX: 'scroll' }}> {/* Horizontal scrollable container */}
//       <div style={{ width: '2000px' }}> {/* Set a large width to enable scrolling */}
//         <Line data={data1} options={options} />
//       </div>
//     </div>
//   );
// };

// export default BarChartWithTimestamp;
