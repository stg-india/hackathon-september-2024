import React from 'react';

export default function Log({ logData }) {
  // Check if logData is present
  if (!logData) {
    return <div>No log data available.</div>;
  }

  // logData contains [formattedTimestamp, unixTimestamp, statusCode]
  const [formattedTimestamp, unixTimestamp, statusCode] = logData;

  // Convert the Unix timestamp to a human-readable format
  const logTime = new Date(unixTimestamp * 1000).toLocaleString(); // Format the time for display

  return (
    <div className="flex justify-between bg-[#16141A]  border-b border-gray-200 py-2 px-4">
      <span className="w-1/3"><strong>Original Timestamp:</strong> {formattedTimestamp}</span>
      <span className="w-1/3"><strong>Converted Timestamp:</strong> {logTime}</span>
      <span className="w-1/3"><strong>Status Code:</strong> {statusCode}</span>
    </div>
  );
}
