import React, { useRef, useEffect } from 'react';
import * as faceapi from 'face-api.js';

const FaceDetection = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const loadModels = async () => {
      await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
      await faceapi.nets.faceLandmark68Net.loadFromUri('/models');
    };

    loadModels();
    startVideo();
  }, []);

  const startVideo = () => {
    navigator.mediaDevices.getUserMedia({ video: {} })
      .then((stream) => {
        videoRef.current.srcObject = stream;
      })
      .catch((err) => console.error(err));
  };

  const handleVideoPlay = () => {
    setInterval(async () => {
      if (videoRef.current && canvasRef.current) {
        const detections = await faceapi.detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
          .withFaceLandmarks();

        const displaySize = { width: videoRef.current.width, height: videoRef.current.height };
        faceapi.matchDimensions(canvasRef.current, displaySize);

        const resizedDetections = faceapi.resizeResults(detections, displaySize);
        canvasRef.current.getContext('2d').clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        faceapi.draw.drawDetections(canvasRef.current, resizedDetections);
        faceapi.draw.drawFaceLandmarks(canvasRef.current, resizedDetections);
      }
    }, 100);
  };

  return (
    <div>
      <video ref={videoRef} onPlay={handleVideoPlay} width="720" height="560" autoPlay muted />
      <canvas ref={canvasRef} width="720" height="560" />
    </div>
  );
};

export default FaceDetection;