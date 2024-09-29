"use client"

import { DialogButton } from "@/components/DialogButton";
import LiveCameraFeed from "@/components/LiveCameraFeed";
import { Button } from "@/components/ui/button";
import { RecoilRoot } from "recoil";

export default function work() {
  return (
    <RecoilRoot>

    <div className="flex h-screen justify-start items-center flex-col">
      <div className = "pt-5">
        <iframe
          src="https://lottie.host/embed/1a287881-73ad-4998-a764-fa2062eb6417/8xIATo3ey8.json"
          height={300}
          width={300}
          ></iframe>
      </div>
      <div className = "justify-center flex flex-col py-5">
        <DialogButton />
        <div className = "text-lg text-gray-500 mt-5">
        *Comparing the live image with the face in the ID document to confirm identity.
        </div>
      </div>
      <div></div>
    </div>
  </RecoilRoot>
  );
}
