"use client";
import React, { useState } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import Globe from "@/components/ui/globe";
export default function Neighbour() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");
  const { toast } = useToast();

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast({
        variant: "destructive",
        description: "Please select a file ",
      });
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/generate_embedding",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast({
        title: "Upload successful!",
        description: "your image will now do his thing",
      });
      console.log(response.data);
    } catch (error) {
      setUploadStatus("Upload failed. Please try again.");
      toast({
        title: "Upload failed!",
        description: "Upload failed. Please try again.  ",
      });
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex justify-center flex-col items-center p-4">
      <div className="mb-4 justify-center items-center flex flex-col">
        {/* <input type="file" onChange={handleFileChange} className="mb-2" /> */}
        <div>
          <Input type="file" onChange={handleFileChange} className="mb-6" />
        </div>
        <Button onClick={handleUpload}>Upload Image</Button>
        <div className=" m-72  ">
          <Globe className=" top-48" />
        </div>
        <div className="m-6 flex m-10"></div>
      </div>
    </div>
  );
}
