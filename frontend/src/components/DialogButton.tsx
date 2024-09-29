"use client";

import axios from "axios";
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import LiveCameraFeed from "./LiveCameraFeed";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { img1Atom, img2Atom } from "@/state/atom";
import { imgSelector } from "@/state/selector";

export enum ScreenEnum {
  DOCUMENT_UPLOAD = "DOCUMENT_UPLOAD",
  FACE_CAPTURE = "FACE_CAPTURE",
  LIVE_FEED = "LIVE_FEED",
}

export const ImageUpload = ({ setScreen }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [error, setError] = useState("");
  const fileInputRef = useRef(null);
  const setImg1 = useSetRecoilState(img1Atom);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
      setError("");
    } else {
      setSelectedImage(null);
      setPreviewUrl("");
      setError("Please select a valid image file.");
    }
  };

  const handleUpload = () => {
    if (selectedImage) {
      console.log("Uploading document:", selectedImage);
      setImg1(selectedImage);
      setScreen(ScreenEnum.FACE_CAPTURE);
    } else {
      setError("Please select a document image before proceeding.");
    }
  };

  return (
    <>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        ref={fileInputRef}
        style={{ display: "none" }}
      />
      {previewUrl && (
        <div className="mt-4 mb-4">
          <img
            src={previewUrl}
            alt="Preview"
            className="max-w-full h-auto rounded-lg"
          />
        </div>
      )}
      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <div className="flex justify-between">
        <Button
          variant="secondary"
          onClick={() => fileInputRef.current.click()}
        >
          Select Document
        </Button>
        <Button onClick={handleUpload} disabled={!selectedImage}>
          Upload Document
        </Button>
      </div>
    </>
  );
};

const FaceCapture = ({ setScreen }) => {
  const videoRef = useRef(null);
  const [error, setError] = useState("");
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);

  const { img1 } = useRecoilValue(imgSelector);
  console.log("Img1 from recoil:", img1);

  const handleSubmit = async (image2) => {
    console.log("handleSubmit called");
    setIsLoading(true);
    setError("");
    setResult(null);
    
    if (!img1) {
      console.error("img1 is missing");
      setError("Document image is missing. Please upload a document first.");
      setIsLoading(false);
      return;
    }
  
    if (!image2) {
      console.error("image2 is missing");
      setError("Face image capture failed. Please try again.");
      setIsLoading(false);
      return;
    }
  
    try {
      const formData = new FormData();
      formData.append('img1', img1, 'live_photo.jpg'); // Live photo
      formData.append('img2', image2, 'document_photo.jpg'); // Document photo

      const response = await axios.post(
        "http://127.0.0.1:5000/compare",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Response:", response.data);
      setResult(response.data);
    } catch (error) {
      console.error("Error uploading images:", error);
      setError("Failed to upload images. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    startCamera();
    return () => stopCamera();
  }, []);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsCameraActive(true);
      }
    } catch (err) {
      setError("Failed to access the camera. Please ensure you have granted the necessary permissions.");
      console.error("Error accessing the camera:", err);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      setIsCameraActive(false);
    }
  };

  const captureImage = () => {
    console.log("captureImage called");
    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    canvas.getContext("2d").drawImage(videoRef.current, 0, 0);
    canvas.toBlob((blob) => {
      console.log("Image blob created:", blob);
      handleSubmit(blob);
    }, "image/jpeg");
  };

  return (
    <div className="flex flex-col">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        className="w-full max-w-sm mb-4 rounded-lg"
      />
      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      {result && (
        <Alert variant="success" className="mb-4">
          <AlertDescription>
            Match: {result.verified ? "Yes" : "No"}<br/>
            Distance: {result.distance}<br/>
            Lower the distance, better the match.
          </AlertDescription>
        </Alert>
      )}
      <div className="flex justify-between">
        <Button onClick={captureImage} disabled={!isCameraActive || isLoading}>
          {isLoading ? "Processing..." : (isCameraActive ? "Capture Face Image" : "Starting Camera...")}
        </Button>
      </div>
    </div>
  );
};

export function DialogButton() {
  const [screen, setScreen] = useState(ScreenEnum.DOCUMENT_UPLOAD);
  const setImg1 = useSetRecoilState(img1Atom);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Upload</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        {screen === ScreenEnum.DOCUMENT_UPLOAD && (
          <>
            <DialogHeader>
              <DialogTitle>Upload your ID</DialogTitle>
              <DialogDescription>
                Please upload a clear photo of your government ID.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <ImageUpload setScreen={setScreen} />
            </DialogFooter>
          </>
        )}
        {screen === ScreenEnum.FACE_CAPTURE && (
          <>
            <DialogHeader>
              <DialogTitle>Capture Face Image</DialogTitle>
              <DialogDescription>
                Please capture a clear image of your face.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <FaceCapture setScreen={setScreen} />
            </DialogFooter>
          </>
        )}
        {screen === ScreenEnum.LIVE_FEED && (
          <>
            <DialogHeader>
              <DialogTitle>Live Image Capture</DialogTitle>
              <DialogDescription>
                Matching your live image to the ID you uploaded.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <LiveCameraFeed
                setScreen={setScreen}
              />
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}