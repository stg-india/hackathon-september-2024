"use client";

import React, { useState, useRef, useCallback } from "react";

const LiveCameraFeed: React.FC = ({ setScreen }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isStreamActive, setIsStreamActive] = useState(false);

  const startCamera = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsStreamActive(true);
      }
    } catch (error) {
      console.error("Error accessing the camera:", error);
      alert(
        "Unable to access the camera. Please make sure you have granted the necessary permissions."
      );
    }
  }, []);

  const stopCamera = useCallback(() => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach((track) => track.stop());
      videoRef.current.srcObject = null;
      setIsStreamActive(false);
      setTimeout(() => setScreen(true), 10000);
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center  bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          className="w-full max-w-md border-2 border-gray-300 rounded-lg"
        />
        <div className="mt-4">
          {!isStreamActive ? (
            <button
              onClick={startCamera}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              Start Camera
            </button>
          ) : (
            <button
              onClick={stopCamera}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
            >
              Stop Camera
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default LiveCameraFeed;
