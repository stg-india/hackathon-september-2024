"use client";
import GraphSection from "@/components/graphSection";
import LogSection from "@/components/logSection";
import Navbar from "@/components/navbar";

export default function Page() {
    return (
        <div className="h-screen w-full flex flex-col">
            <Navbar />
            <div className="flex-1"><GraphSection /></div> {/* Take up 1/3 of the space */}
            <div className="flex-2 overflow-y-auto"><LogSection /></div> {/* Take up 2/3 of the space */}
        </div>
    );
}
