// Loading.js
"use client"; 

export default function Loading() {
    return (
        <div className="flex flex-col items-center justify-center h-full p-4">
            <div className="flex flex-col w-full space-y-4">
                <div className="skeleton w-full h-20"></div>
                <div className="skeleton w-full h-20"></div>
                <div className="skeleton w-full h-20"></div>
            </div>
            <style jsx>{`
                .skeleton {
                    background: linear-gradient(90deg, #e0e0e0 25%, #f0f0f0 50%, #e0e0e0 75%);
                    background-size: 200% 100%;
                    animation: loading 1.5s infinite;
                    border-radius: 8px;
                }

                @keyframes loading {
                    0% {
                        background-position: 200% 0;
                    }
                    100% {
                        background-position: 0 0;
                    }
                }
            `}</style>
        </div>
    );
}
