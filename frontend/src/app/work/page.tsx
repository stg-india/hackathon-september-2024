import { DialogButton } from "@/components/DialogButton";
import LiveCameraFeed from "@/components/LiveCameraFeed";
import { Button } from "@/components/ui/button";

export default function work() {
  return (
    <div className="flex h-screen justify-start items-center flex-col">
      <div>
        <iframe
          src="https://lottie.host/embed/1a287881-73ad-4998-a764-fa2062eb6417/8xIATo3ey8.json"
          height={300}
          width={300}
        ></iframe>
      </div>
      <div>
        <DialogButton />
      </div>
      <div></div>
    </div>
  );
}
