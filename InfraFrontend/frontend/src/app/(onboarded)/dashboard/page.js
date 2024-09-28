"use client";
import GraphSection from "@/components/graphSection";
import LogSection from "@/components/logSection";
import Navbar from "@/components/navbar";

export default function Page() {
    return (
        <div className="w-full flex flex-col bg-black">
            <Navbar />
            <div className="flex-1 mx-10 "><GraphSection /></div> {/* Take up 1/3 of the space */}
            <div ><LogSection /></div> {/* Take up 2/3 of the space */}
        </div>
    );
}
