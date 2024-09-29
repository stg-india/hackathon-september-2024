import React from 'react';
import { Spinner } from 'reactstrap';
import { ThreeCircles, Bars } from 'react-loader-spinner';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './loader.css'

const Loader = (props) => {
    return (
        <React.Fragment>
            {/* <div className='align-item-center' style={{ 'margin-top': '30%' }}> */}
                {/* <div className="d-flex justify-content-center"> */}
                    {/* <Spinner color="primary"> Loading... </Spinner> */}
                    {/* <Bars
                        height="80"
                        width="80"
                        color="#A0A0A0"
                        ariaLabel="bars-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                        visible={true}
                    /> */}
                {/* </div> */}
            {/* </div> */}
            <div id="cover-spin"></div>

            {toast.error(props.error, { position: "top-right", hideProgressBar: false, progress: undefined, toastId: "" })}
        </React.Fragment>
    );
};

export default Loader;
