"use client";

import axios from "axios"
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

const ScreenEnum = {
  IMAGE_UPLOAD: "IMAGE_UPLOAD",
  LIVE_CAPTURE: "LIVE_CAPTURE",
  // Add more screens as needed
};

const ImageUpload = ({ setScreen }) => {
  const [selectedImage, setSelectedImage] = useState(false);
  const [previewUrl, setPreviewUrl] = useState("");
  const [error, setError] = useState("");
  const fileInputRef = useRef(null);

  const [img1, setImg1] = useState(null);
  const [img2, setImg2] = useState(null);


  useEffect(()=>{
    if(img1 && img2){
      setSelectedImage(true)
    }
  },[])

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
      console.log("Uploading image:", selectedImage);

      console.log("File : ", selectedImage.name)

      // verifyImage(selectedImage)




      setScreen(ScreenEnum.LIVE_CAPTURE); // Switch to live capture screen after upload
    } else {
      setError("Please select an image before uploading.");
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create form-data
    const formData = new FormData();
    formData.append('img1', img1);
    formData.append('img2', img2);

    try {
      // Post request to your Flask backend
      const response = await axios.post('http://127.0.0.1:5000/compare', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Response:', response.data);
    } catch (error) {
      console.error('Error uploading images:', error);
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
      <div className="flex ">
        <form onSubmit={handleSubmit}>
        <div className = "flex flex-col">
          <label>Upload Image 1:</label>
          <input type="file" onChange={(e)=> setImg1(e.target.files[0])} />
       
          <label>Upload a document:</label>
          <input type="file" onChange={ (e)=>setImg2(e.target.files[0])} />
        </div>
        <Button onClick={handleSubmit}>
          Upload Image
        </Button>
      </form>
      </div>
    </>
  );
};

export function DialogButton() {
  const [screen, setScreen] = useState(ScreenEnum.IMAGE_UPLOAD);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Upload</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        {
          screen === ScreenEnum.IMAGE_UPLOAD ? (
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
          ) : screen === ScreenEnum.LIVE_CAPTURE ? (
            <>
              <DialogHeader>
                <DialogTitle>Live Image Capture</DialogTitle>
                <DialogDescription>
                  Matching your live image to the ID you uploaded.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <LiveCameraFeed setScreen={setScreen} />
              </DialogFooter>
            </>
          ) : null /* Add more screens as needed */
        }
      </DialogContent>
    </Dialog>
  );
}
