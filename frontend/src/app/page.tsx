import { NavBar } from "@/components/NavBar";
import { Button } from "@/components/ui/button";
import { RainbowButton } from "@/components/ui/rainbow-button";
import Link from "next/link";
import AnimatedGridPattern from "@/components/ui/animated-grid-pattern";
import classNames from "classnames";

export default function Home() {
  return (
    <div className="flex justify-start flex-col  h-screen">
      <div className="flex justify-around items-center">
        <div className="mx-20">
          <iframe
            src="https://lottie.host/embed/ceb1af02-9d0e-42f4-b8c9-fee02ef02590/pwrz2XaGkX.json"
            height={550}
            width={500}
          ></iframe>
        </div>
        <div className="flex flex-col mx-20 my-10">
          <div className="font-bold text-5xl my-10">
            Please complete your KYC process now for a seamless experience.
          </div>
          <div className=" items-center justify-center flex my-10">
            <Link href={"/upload"}>
              <RainbowButton>Get Started</RainbowButton>
            </Link>
          </div>
        </div>
      </div>
      <AnimatedGridPattern
        numSquares={30}
        maxOpacity={0.1}
        duration={3}
        repeatDelay={1}
        className={classNames(
          "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
          "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12"
        )}
      />
    </div>
  );
}
