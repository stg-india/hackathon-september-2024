import React, { useCallback, useEffect, useState } from "react";
import { Col, Container, Input, Row } from "reactstrap";
import RecentOrders from "./RecentOrders";
import Flatpickr from "react-flatpickr";
import ProjectsStatus from "../DashboardProject/ProjectsStatus";
import axios from 'axios';
import Select from 'react-select';
import Loader from './../../Components/Common/Loader'

const DashboardEcommerce = () => {
  document.title = "Dashboard";
  const [dateRange, setDateRange] = useState([null, null]);
  const [rowData, setrowData] = useState([])
  const [loading, setloading] = useState(false)
  const logLevelOptions = [
    { value: 'ALL', label: 'ALL' },
    { value: 'ERROR', label: 'ERROR' },
    { value: 'DEBUG', label: 'DEBUG' },
    { value: 'INFO', label: 'INFO' },
    { value: 'WARNING', label: 'WARNING' },
    { value: 'CRITICAL', label: 'CRITICAL' },
  ];
  const [Level, setLevel] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  useEffect(() => {

    const today = new Date();
    const sevenDaysAgo = new Date(today);
    sevenDaysAgo.setDate(today.getDate() - 7);
    setDateRange([sevenDaysAgo, today]);
  }, []);

  const [chartData, setChartData] = useState([])

  // Function to send date range to the API
  const sendDateRangeToAPI = useCallback(async () => {
    const payload = {
      startDate: dateRange[0].toISOString(),
      endDate: dateRange[1].toISOString(),
      level: Level,
      searchKeyword: searchKeyword
    };
    setloading(true);
    console.log("Sending to API:", payload);
    try {
      const chartt = await axios.post('http:localhost:5000/logs', payload, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const response = await axios.post('http:localhost:5000/logs', payload, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      console.log(response.data);
      setChartData(chartt.data)
      setrowData(response.data)
      setloading(false)
    } catch (error) {
      setloading(false)
      console.error('Error sending log data to API:', error);
    }
  }, [Level, searchKeyword, dateRange]);

  useEffect(() => {
    sendDateRangeToAPI()
  }, [sendDateRangeToAPI])

  const handleLogLevelChange = (selectedOption) => {
    setLevel(selectedOption);
    sendDateRangeToAPI(dateRange[0], dateRange[1], selectedOption.value);
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* <BreadCrumb title="Dashboard" pageTitle="Dashboards" /> */}
          <Row>
            <Col>
              <div className="h-100">
                {/* <Section /> */}
                <Row className="mb-3 pb-1">
                  <Col xs={12}>
                    <div className="d-flex align-items-lg-center flex-lg-row flex-column">
                      <div className="flex-grow-1">
                        <h4 className="fs-16 mb-1">Good Morning, Anna!</h4>
                        <p className="text-muted mb-0">Here's what's happening with your store today.</p>
                      </div>
                      <div className="mt-3 mt-lg-0">
                        <form action="#">
                          <Row className="g-3 mb-0 align-items-center">

                            <div className="col-xl-auto d-flex align-items-center mb-2">
                              <Select
                                className="mt-3"
                                value={Level}
                                onChange={handleLogLevelChange}
                                options={logLevelOptions}
                                placeholder="Select Level"
                              />
                            </div>
                            <div className="col-sm-auto">
                              <div className="input-group">
                                <Flatpickr
                                  className="form-control border-0 dash-filter-picker shadow"
                                  options={{
                                    mode: "range",
                                    dateFormat: "d M, Y",
                                    defaultDate: dateRange?.map(date => date?.toISOString().split('T')[0]), // Set default to last 7 days
                                  }}
                                  value={dateRange}
                                  onChange={([start, end]) => {
                                    if (start && end) {
                                      setDateRange([start, end]);

                                    }
                                  }}

                                />
                                <div className="input-group-text bg-primary border-primary text-white"><i className="ri-calendar-2-line"></i></div>
                              </div>
                            </div>
                            <div className="col-auto">
                              <Input
                                type="text"
                                className="form-control"
                                placeholder="Search..."
                                id="search-options"
                                onChange={(e) => setSearchKeyword(e.target.value)}
                                value={searchKeyword}
                                autocomplete="off"
                              />
                              {searchKeyword.length ? (
                                <span
                                  style={{
                                    right: 10,
                                    top: "50%",
                                    transform: "translateY(-50%)",
                                    color: "#878a99",
                                    fontSize: "16px",
                                    zIndex: 100,
                                  }}
                                  className="mdi mdi-close-circle position-absolute custom-pointer"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setSearchKeyword("");
                                  }}
                                />
                              ) : null}
                            </div>

                          </Row>
                        </form>
                      </div>
                    </div>
                  </Col>
                </Row>


                {
                  loading ? <Loader /> :
                    <Row>
                      <ProjectsStatus series={chartData} />
                      <Col xl={8}>
                        <RecentOrders data={rowData} />
                      </Col>
                    </Row>}

                <Row>
                </Row>
              </div>
            </Col>

          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default DashboardEcommerce;
