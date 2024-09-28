// "use client";
// import GraphSection from "@/components/graphSection";
// import Hero from "@/components/Hero";
// import LogSection from "@/components/logSection";
// import Navbar from "@/components/navbar";

// export default function Page() {
//     return (
//         <div className="w-full flex flex-col bg-black">
//             <Navbar />
//             <div><Hero/></div>
//             <div className="flex-1 mx-10 "><GraphSection /></div> {/* Take up 1/3 of the space */}
//             <div ><LogSection /></div> {/* Take up 2/3 of the space */}
//         </div>
//     );
// }


"use client"; // Ensure this is at the top

import { useState, useEffect } from "react";
import GraphSection from "@/components/GraphSection";
import LogSection from "@/components/LogSection";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Loading from "../loading";

export default function Page() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 3000); // Simulated delay

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="w-full flex flex-col bg-black">
            <Navbar />
            {loading ? (
                <div className="flex-1"><Loading /></div>
            ) : (
                <>
                    <div><Hero/></div>
                    <div className="flex-1"><GraphSection /></div>
                    <div className="flex-2 overflow-y-auto"><LogSection /></div>
                </>
            )}
        </div>
    );
}
