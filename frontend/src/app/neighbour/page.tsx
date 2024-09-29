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

  const handleFileChange = async (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast({
        variant: "destructive",
        description: "Please select a file",
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


      if(response.data){
        console.log("Run ANN here")
        const embeddings = response.data.embedding;
        const k =5;

        const data = {
          embedding : Array.from(embeddings),
          k : 5
        }

        const jsonData = JSON.stringify(data);

      

        console.log("Sending request to find neighbours with formdata :", jsonData);

        const nearestNeighboursResponse = await  axios.post('http://127.0.0.1:5000/find_neighbors', data, {
          headers: {
            'Content-Type': 'application/json'
          }
        })
        if(nearestNeighboursResponse.data){
          console.log(nearestNeighboursResponse.data);
          toast({
            title: "Nearest Neighbours found!",
            description: "Nearest Neighbours found",
          });
        }
        else{
          toast({
            title: "Nearest Neighbours not found!",
            description: "User doesn't exist in our database",
          });
        }
      }
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
        <div className = "text-gray-500 my-5 text-lg"> *Checking the second image against a large database to find top 5 similar images with respective similarity scores.</div>
        <div className=" m-72  ">
          <Globe className=" top-48" />
        </div>
        <div className="m-6 flex m-10"></div>
      </div>
    </div>
  );
}
