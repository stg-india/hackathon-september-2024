import LogChart from "./apiChart";
import ErrorChart from "./errorGraph";
import { styles } from "./styles";

export default function GraphSection(){
    return (
        <div>
        <div id="graphSection" className="flex flex-col  px-5 mx-10 rounded-lg shadow-xl my-10 ">
        <h1 className={`${styles.heroHeadText} text-white flex justify-center mb-10`}>
            Chart<span className='text-[#915EFF]'>Section</span>
          </h1>
        <div className="flex flex-row justify-center gap-x-20 p-2">
        <LogChart/>
        <ErrorChart/>
        </div>
        </div>
        </div>
    )
};