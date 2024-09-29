"use client";

import React, { useState, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button"; // Use shadcn's Button

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
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        className="w-full max-w-md border rounded-lg shadow-sm" // Removed extra border for embedded look
      />
      <div className="mt-4">
        {!isStreamActive ? (
          <Button onClick={startCamera} variant="default">
            Start Camera
          </Button>
        ) : (
          <Button onClick={stopCamera} variant="destructive">
            Stop Camera
          </Button>
        )}
      </div>
    </div>
  );
};

export default LiveCameraFeed;
