"use client";
import GraphSection from "@/components/graphSection";
import LogSection from "@/components/logSection";
import Navbar from "@/components/navbar";

export default function Page(){
    return (
        <div>
            <Navbar/>
            <GraphSection/>
            <LogSection/>
        </div>
    )
}