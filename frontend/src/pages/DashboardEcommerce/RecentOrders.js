import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardHeader, Col, Input } from 'reactstrap';
import DataTable from 'react-data-table-component';

const RecentOrders = (props) => {
    const tableCustomStyles = {
        // headRow: {
        //     style: {
        //         color: '#223336',
        //         backgroundColor: '#e7eef0'
        //     },
        // },
        rows: {
            style: {
                // color: "STRIPEDCOLOR",
                backgroundColor: "#FFFFFF",
            },
            stripedStyle: {
                // color: "NORMALCOLOR",
                backgroundColor: "#f1f5f5",
            },
        },
    };
    const columns = [
        {
            name: <span className='font-weight-bold fs-13'>Level</span>,
            width:"10%",
            sortable: true,
            selector: (cell) => {
                switch (cell.Level) {
                    case "INFO":
                        return <span className="badge badge-soft-info"> {cell.Level} </span>;
                    case "CRITICAL":
                        return <span className="badge badge-soft-danger"> {cell.Level} </span>;
                    case "WARNING":
                        return <span className="badge badge-soft-warning"> {cell.Level} </span>;
                    case "ERROR":
                        return <span className="badge bg-danger"> {cell.Level} </span>;
                    default:
                        return <span className="badge badge-soft-success"> {cell.Level} </span>;
                }
            },
        },
        {
            name: <span className='font-weight-bold fs-13'>Date</span>,
            selector: row => row.date,
            width:"10%",
        },
        {
            name: <span className='font-weight-bold fs-13'>Time</span>,
            selector: row => row.Time,
            sortable: true,
            width:"10%",
        },
        {
            name: <span className='font-weight-bold fs-13'>Source</span>,
            selector: row => row.Source,
            sortable: true,
            width:"20%",
        },
        {
            name: <span className='font-weight-bold fs-13'>Message</span>,
            selector: row => row.Message,
            sortable: true,
            width:"50%",
        },
        

        
    ];

    const row = props?.data
    return (
        <React.Fragment>
            <Col xl={12}>
                <Card>
                    <CardHeader className="align-items-center d-flex">
                        <h4 className="card-title mb-0 flex-grow-1">Application Logs</h4>
                        
                    </CardHeader>

                    <CardBody>
                        <div className="table-responsive table-card">
                            <DataTable
                                striped
                                columns={columns}
                                data={row}
                                pagination
                                // paginationServer
                                // progressPending={Loading}
                                // progressComponent={
                                //     <div
                                //         className="d-flex align-items-center justify-content-center"
                                //         style={{ height: "100px", width: "100%" }}
                                //     >
                                //         <Loader />
                                //     </div>
                                // }
                                noDataComponent={
                                    <p className="text-muted text-center p-2 fs-5">
                                        No Data Found.
                                    </p>
                                }
                                customStyles={tableCustomStyles}
                                paginationPerPage={10}
                                // paginationTotalRows={total_locations}
                                // onChangePage={handlePageChange}
                                // paginationRowsPerPageOptions={[10, 25, 50, 100]}
                                // onChangeRowsPerPage={handleRowsPerPage}
                                fixedHeader={true}
                            />
                        </div>
                    </CardBody>
                </Card>
            </Col>
        </React.Fragment>
    );
};

export default RecentOrders;
