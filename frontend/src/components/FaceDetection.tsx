import React, { useRef, useEffect, useState } from 'react';
import * as faceapi from 'face-api.js';

const FaceDetection = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [modelsLoaded, setModelsLoaded] = useState(false);
  
  const EYE_AR_THRESH = 0.2;
  const EYE_AR_CONSEC_FRAMES = 3;
  let blinkCounter = 0;
  let totalBlinks = 0;

  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = '/models'; // Updated model URL
      try {
        await faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL);
        await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
        await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL);
        setModelsLoaded(true);
      } catch (error) {
        console.error('Error loading models:', error);
      }
    };

    if (typeof window !== 'undefined') {
      loadModels(); // Only load models on the client side
    }
  }, []);

  useEffect(() => {
    if (modelsLoaded) {
      startVideo();
    }
  }, [modelsLoaded]);

  const startVideo = () => {
    navigator.mediaDevices.getUserMedia({ video: {} })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch((err) => console.error('Error accessing the camera:', err));
  };

  const eyeAspectRatio = (eye) => {
    const A = Math.sqrt(Math.pow(eye[1].y - eye[5].y, 2) + Math.pow(eye[1].x - eye[5].x, 2));
    const B = Math.sqrt(Math.pow(eye[2].y - eye[4].y, 2) + Math.pow(eye[2].x - eye[4].x, 2));
    const C = Math.sqrt(Math.pow(eye[0].y - eye[3].y, 2) + Math.pow(eye[0].x - eye[3].x, 2));
    return (A + B) / (2.0 * C);
  };

  const handleVideoPlay = () => {
    setInterval(async () => {
      if (videoRef.current && canvasRef.current) {
        const detections = await faceapi.detectAllFaces(videoRef.current, new faceapi.SsdMobilenetv1Options())
          .withFaceLandmarks()
          .withFaceExpressions();

        const displaySize = { width: videoRef.current.width, height: videoRef.current.height };
        faceapi.matchDimensions(canvasRef.current, displaySize);

        const resizedDetections = faceapi.resizeResults(detections, displaySize);
        
        const ctx = canvasRef.current.getContext('2d');
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        faceapi.draw.drawDetections(canvasRef.current, resizedDetections);
        faceapi.draw.drawFaceLandmarks(canvasRef.current, resizedDetections);
        faceapi.draw.drawFaceExpressions(canvasRef.current, resizedDetections);

        // Liveness detection logic
        if (resizedDetections.length > 0) {
          const landmarks = resizedDetections[0].landmarks._positions; // Get landmark positions
          const leftEye = landmarks.slice(36, 42); // Landmarks for left eye
          const rightEye = landmarks.slice(42, 48); // Landmarks for right eye

          const leftEAR = eyeAspectRatio(leftEye);
          const rightEAR = eyeAspectRatio(rightEye);
          const ear = (leftEAR + rightEAR) / 2.0;

          // Check for blink
          if (ear < EYE_AR_THRESH) {
            blinkCounter++;
          } else {
            if (blinkCounter >= EYE_AR_CONSEC_FRAMES) {
              totalBlinks++;
              console.log("Blink Detected", totalBlinks);
            }
            blinkCounter = 0;
          }
        }
      }
    }, 100);
  };

  return (
    <div>
      {modelsLoaded ? (
        <>
          <video ref={videoRef} onPlay={handleVideoPlay} width="720" height="560" autoPlay muted />
          <canvas ref={canvasRef} width="720" height="560" />
        </>
      ) : (
        <p>Loading models...</p>
      )}
    </div>
  );
};

export default FaceDetection;
