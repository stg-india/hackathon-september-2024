import React, { useState, useEffect } from 'react';
import { Card, CardBody, CardHeader, Col, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from 'reactstrap';
import { useSelector, useDispatch } from "react-redux";
import { PrjectsStatusCharts } from './DashboardProjectCharts';


const ProjectsStatus = (props) => {
    const dispatch = useDispatch();

    const [chartData, setchartData] = useState(Object.values(props?.series));
    return (
        <React.Fragment>
            <Col xxl={4} lg={6}>
                <Card className="card-height-100">
                    <CardHeader className="align-items-center d-flex">
                        <h4 className="card-title mb-0 flex-grow-1">Log Status</h4>
                    </CardHeader>

                    <CardBody>
                        <PrjectsStatusCharts series={chartData}/>
                        <div className="mt-3">
                            <div className="d-flex justify-content-center align-items-center mb-4">
                                <h2 className="me-3 ff-secondary mb-0">{chartData[0] + chartData[1] + chartData[2] + chartData[3] + chartData[4] || 100}</h2>
                                <div>
                                    <p className="text-muted mb-0 fs-3">Total Logs</p>
                                    {/* <p className="text-success fw-medium mb-0">
                                        <span className="badge badge-soft-success p-1 rounded-circle"><i className="ri-arrow-right-up-line"></i></span> +3 New
                                    </p> */}
                                </div>
                            </div>

                            <div className="d-flex justify-content-between border-bottom border-bottom-dashed py-2">
                                <p className="fw-medium mb-0"><i className="ri-checkbox-blank-circle-fill text-success align-middle me-2"></i> Debug</p>
                                <div>
                                    <span className="text-muted pe-5">{chartData[0]} logs</span>
                                    {/* <span className="text-success fw-medium fs-12">15870hrs</span> */}
                                </div>
                            </div>
                            <div className="d-flex justify-content-between border-bottom border-bottom-dashed py-2">
                                <p className="fw-medium mb-0"><i className="ri-checkbox-blank-circle-fill text-primary align-middle me-2"></i> Critical</p>
                                <div>
                                    <span className="text-muted pe-5">{chartData[2]} logs</span>
                                    {/* <span className="text-success fw-medium fs-12">~2050hrs</span> */}
                                </div>
                            </div>
                            <div className="d-flex justify-content-between py-2">
                                <p className="fw-medium mb-0"><i color='' className="ri-checkbox-blank-circle-fill text-warning align-middle me-2"></i> Warning</p>
                                <div>
                                    <span className="text-muted pe-5">{chartData[3]} logs</span>
                                    {/* <span className="text-success fw-medium fs-12">~900hrs</span> */}
                                </div>
                            </div>
                            <div className="d-flex justify-content-between py-2">
                                <p className="fw-medium mb-0"><i className="ri-checkbox-blank-circle-fill text-danger align-middle me-2"></i> Error</p>
                                <div>
                                    <span className="text-muted pe-5">{chartData[4]} logs</span>
                                    {/* <span className="text-success fw-medium fs-12">~900hrs</span> */}
                                </div>
                            </div>
                            <div className="d-flex justify-content-between border-bottom border-bottom-dashed py-2">
                                <p className="fw-medium mb-0"><i className="ri-checkbox-blank-circle-fill text-info align-middle me-2"></i> Info</p>
                                <div>
                                    <span className="text-muted pe-5">{chartData[1]} logs</span>
                                    {/* <span className="text-success fw-medium fs-12">243hrs</span> */}
                                </div>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </Col>
        </React.Fragment>
    );
};

export default ProjectsStatus;