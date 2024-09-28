import LogChart from "./apiChart";
import ErrorChart from "./errorGraph";

export default function GraphSection(){
    return (
        <div className="flex flex-col  p-5 mx-10 rounded-lg shadow-xl my-20 ">
        <h1 className="text-center text-2xl font-bold mb-4 text-white">GraphSection</h1>
        <div className="flex flex-row justify-center gap-x-20 p-2">
        <LogChart/>
        <ErrorChart/>
        {/* <ErrorChart/>
        <ErrorChart/> */}
        </div>
        </div>
    )
};