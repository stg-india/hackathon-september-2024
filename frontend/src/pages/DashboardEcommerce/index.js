import React, { useCallback, useEffect, useState } from "react";
import { Col, Container, Input, Row } from "reactstrap";
import RecentActivity from "./RecentActivity";
import RecentOrders from "./RecentOrders";
import Flatpickr from "react-flatpickr";
import ProjectsStatus from "../DashboardProject/ProjectsStatus";
import axios from 'axios';
import Select from 'react-select';
const DATA = [
  {
    "date": "2024-09-28",
    "Time": "20:14:04",
    "Level": "CRITICAL",
    "Source": "django.security",
    "Message": "Potential security issue detected on /api/v1/users from 198.51.100.12. Status 404."
  },
  {
    "date": "2024-09-28",
    "Time": "20:14:06",
    "Level": "DEBUG",
    "Source": "django",
    "Message": "Processing GET request to /api/v1/reports. Status 400."
  },
  {
    "date": "2024-09-28",
    "Time": "20:14:07",
    "Level": "INFO",
    "Source": "django.db.backends",
    "Message": "Query executed on /api/v1/notifications. Response: 200 in 2.707s."
  },
  {
    "date": "2024-09-28",
    "Time": "20:14:08",
    "Level": "CRITICAL",
    "Source": "django",
    "Message": "Processing PUT request to /api/v1/cart. Status 500."
  },
  {
    "date": "2024-09-28",
    "Time": "20:14:09",
    "Level": "CRITICAL",
    "Source": "django",
    "Message": "Processing PATCH request to /api/v1/products. Status 500."
  },
  {
    "date": "2024-09-28",
    "Time": "20:14:10",
    "Level": "CRITICAL",
    "Source": "django.db.backends",
    "Message": "Query executed on /api/v1/login. Response: 503 in 0.497s."
  },
  {
    "date": "2024-09-28",
    "Time": "20:14:11",
    "Level": "DEBUG",
    "Source": "django.security",
    "Message": "Potential security issue detected on /api/v1/cart from 172.16.0.23. Status 500."
  },
  {
    "date": "2024-09-28",
    "Time": "20:14:11",
    "Level": "ERROR",
    "Source": "django.security",
    "Message": "Potential security issue detected on /api/v1/products from 192.168.1.10. Status 503."
  },
  {
    "date": "2024-09-28",
    "Time": "20:14:12",
    "Level": "ERROR",
    "Source": "django",
    "Message": "Processing PATCH request to /api/v1/notifications. Status 503."
  },
  {
    "date": "2024-09-28",
    "Time": "20:14:14",
    "Level": "CRITICAL",
    "Source": "django",
    "Message": "Processing POST request to /api/v1/cart. Status 200."
  },
  {
    "date": "2024-09-28",
    "Time": "20:14:15",
    "Level": "CRITICAL",
    "Source": "django.request",
    "Message": "PATCH /api/v1/notifications - Status: 502 - Response Time: 2.652s - IP: 10.0.0.8"
  },
  {
    "date": "2024-09-28",
    "Time": "20:14:16",
    "Level": "WARNING",
    "Source": "django.db.backends",
    "Message": "Query executed on /api/v1/login. Response: 401 in 2.97s."
  },
  {
    "date": "2024-09-28",
    "Time": "20:14:17",
    "Level": "WARNING",
    "Source": "django.security",
    "Message": "Potential security issue detected on /api/v1/cart from 172.16.0.23. Status 502."
  },
  {
    "date": "2024-09-28",
    "Time": "20:14:19",
    "Level": "ERROR",
    "Source": "django",
    "Message": "Processing PATCH request to /api/v1/reports. Status 502."
  },
  {
    "date": "2024-09-28",
    "Time": "20:14:21",
    "Level": "WARNING",
    "Source": "django.request",
    "Message": "GET /api/v1/login - Status: 201 - Response Time: 1.349s - IP: 198.51.100.12"
  },
  {
    "date": "2024-09-28",
    "Time": "20:14:22",
    "Level": "DEBUG",
    "Source": "django.request",
    "Message": "DELETE /api/v1/products - Status: 200 - Response Time: 1.208s - IP: 198.51.100.12"
  },
  {
    "date": "2024-09-28",
    "Time": "20:14:23",
    "Level": "CRITICAL",
    "Source": "django",
    "Message": "Processing POST request to /api/v1/users. Status 403."
  },
  {
    "date": "2024-09-28",
    "Time": "20:14:25",
    "Level": "CRITICAL",
    "Source": "django.request",
    "Message": "PATCH /api/v1/login - Status: 404 - Response Time: 1.084s - IP: 192.168.1.10"
  },
  {
    "date": "2024-09-28",
    "Time": "20:14:26",
    "Level": "WARNING",
    "Source": "django",
    "Message": "Processing DELETE request to /api/v1/notifications. Status 201."
  },
  {
    "date": "2024-09-28",
    "Time": "20:14:28",
    "Level": "ERROR",
    "Source": "django.db.backends",
    "Message": "Query executed on /api/v1/login. Response: 401 in 2.332s."
  },
  {
    "date": "2024-09-28",
    "Time": "20:14:30",
    "Level": "WARNING",
    "Source": "django.db.backends",
    "Message": "Query executed on /api/v1/products. Response: 502 in 1.654s."
  },
  {
    "date": "2024-09-28",
    "Time": "20:14:31",
    "Level": "WARNING",
    "Source": "django.request",
    "Message": "PATCH /api/v1/users - Status: 400 - Response Time: 2.154s - IP: 10.0.0.8"
  },
  {
    "date": "2024-09-28",
    "Time": "20:14:33",
    "Level": "CRITICAL",
    "Source": "django",
    "Message": "Processing GET request to /api/v1/notifications. Status 502."
  },
  {
    "date": "2024-09-28",
    "Time": "20:14:35",
    "Level": "ERROR",
    "Source": "django.db.backends",
    "Message": "Query executed on /api/v1/login. Response: 200 in 0.976s."
  },
  {
    "date": "2024-09-28",
    "Time": "20:14:37",
    "Level": "ERROR",
    "Source": "django.request",
    "Message": "PATCH /api/v1/products - Status: 201 - Response Time: 0.525s - IP: 203.0.113.5"
  },
  {
    "date": "2024-09-28",
    "Time": "20:14:38",
    "Level": "WARNING",
    "Source": "django.security",
    "Message": "Potential security issue detected on /api/v1/orders from 192.168.1.10. Status 200."
  },
  {
    "date": "2024-09-28",
    "Time": "20:14:39",
    "Level": "ERROR",
    "Source": "django",
    "Message": "Processing PATCH request to /api/v1/cart. Status 201."
  },
  {
    "date": "2024-09-28",
    "Time": "20:14:40",
    "Level": "ERROR",
    "Source": "django.db.backends",
    "Message": "Query executed on /api/v1/reports. Response: 403 in 0.422s."
  },
  {
    "date": "2024-09-28",
    "Time": "20:14:41",
    "Level": "ERROR",
    "Source": "django.db.backends",
    "Message": "Query executed on /api/v1/login. Response: 401 in 1.197s."
  },
  {
    "date": "2024-09-28",
    "Time": "20:14:42",
    "Level": "CRITICAL",
    "Source": "django.request",
    "Message": "GET /api/v1/orders - Status: 500 - Response Time: 0.22s - IP: 203.0.113.5"
  },
  {
    "date": "2024-09-28",
    "Time": "20:14:44",
    "Level": "DEBUG",
    "Source": "django.db.backends",
    "Message": "Query executed on /api/v1/login. Response: 500 in 0.325s."
  },
  {
    "date": "2024-09-28",
    "Time": "20:14:46",
    "Level": "INFO",
    "Source": "django.server",
    "Message": "Server started handling DELETE request to /api/v1/login. Status 201."
  },
  {
    "date": "2024-09-28",
    "Time": "20:14:47",
    "Level": "INFO",
    "Source": "django.server",
    "Message": "Server started handling PUT request to /api/v1/orders. Status 201."
  },
  {
    "date": "2024-09-28",
    "Time": "20:14:49",
    "Level": "ERROR",
    "Source": "django",
    "Message": "Processing POST request to /api/v1/cart. Status 404."
  },
  {
    "date": "2024-09-28",
    "Time": "20:14:51",
    "Level": "DEBUG",
    "Source": "django.security",
    "Message": "Potential security issue detected on /api/v1/products from 10.0.0.8. Status 404."
  },
  {
    "date": "2024-09-28",
    "Time": "20:14:51",
    "Level": "CRITICAL",
    "Source": "django.db.backends",
    "Message": "Query executed on /api/v1/login. Response: 503 in 2.98s."
  },
  {
    "date": "2024-09-28",
    "Time": "20:14:53",
    "Level": "DEBUG",
    "Source": "django.server",
    "Message": "Server started handling DELETE request to /api/v1/cart. Status 201."
  },
  {
    "date": "2024-09-28",
    "Time": "20:14:54",
    "Level": "CRITICAL",
    "Source": "django.server",
    "Message": "Server started handling DELETE request to /api/v1/logout. Status 502."
  },
  {
    "date": "2024-09-28",
    "Time": "20:14:55",
    "Level": "WARNING",
    "Source": "django.server",
    "Message": "Server started handling GET request to /api/v1/products. Status 401."
  },
  {
    "date": "2024-09-28",
    "Time": "20:14:57",
    "Level": "WARNING",
    "Source": "django.request",
    "Message": "POST /api/v1/notifications - Status: 400 - Response Time: 2.991s - IP: 198.51.100.12"
  },
  {
    "date": "2024-09-28",
    "Time": "20:14:58",
    "Level": "WARNING",
    "Source": "django.security",
    "Message": "Potential security issue detected on /api/v1/reports from 10.0.0.8. Status 200."
  },
  {
    "date": "2024-09-28",
    "Time": "20:14:59",
    "Level": "DEBUG",
    "Source": "django.server",
    "Message": "Server started handling POST request to /api/v1/notifications. Status 503."
  },
  {
    "date": "2024-09-28",
    "Time": "20:15:00",
    "Level": "CRITICAL",
    "Source": "django.request",
    "Message": "PUT /api/v1/orders - Status: 503 - Response Time: 1.742s - IP: 198.51.100.12"
  },
  {
    "date": "2024-09-28",
    "Time": "20:15:02",
    "Level": "DEBUG",
    "Source": "django.security",
    "Message": "Potential security issue detected on /api/v1/users from 192.168.1.10. Status 200."
  },
  {
    "date": "2024-09-28",
    "Time": "20:15:03",
    "Level": "ERROR",
    "Source": "django",
    "Message": "Processing DELETE request to /api/v1/orders. Status 500."
  },
  {
    "date": "2024-09-28",
    "Time": "20:15:04",
    "Level": "ERROR",
    "Source": "django",
    "Message": "Processing GET request to /api/v1/notifications. Status 201."
  },
  {
    "date": "2024-09-28",
    "Time": "20:15:05",
    "Level": "INFO",
    "Source": "django.server",
    "Message": "Server started handling GET request to /api/v1/login. Status 502."
  },
  {
    "date": "2024-09-28",
    "Time": "20:15:06",
    "Level": "WARNING",
    "Source": "django.security",
    "Message": "Potential security issue detected on /api/v1/logout from 10.0.0.8. Status 403."
  },
  {
    "date": "2024-09-28",
    "Time": "20:15:07",
    "Level": "CRITICAL",
    "Source": "django.server",
    "Message": "Server started handling DELETE request to /api/v1/orders. Status 404."
  },
  {
    "date": "2024-09-28",
    "Time": "20:15:09",
    "Level": "ERROR",
    "Source": "django.server",
    "Message": "Server started handling POST request to /api/v1/login. Status 403."
  }
]
const DashboardEcommerce = () => {
  document.title = "Dashboard";
  const [dateRange, setDateRange] = useState([null, null]);
  const [rowData,setrowData]=useState([])
  const logLevelOptions = [
    { value: 'ALL', label: 'ALL' },
    { value: 'ERROR', label: 'ERROR' },
    { value: 'DEBUG', label: 'DEBUG' },
    { value: 'INFO', label: 'INFO' },
    { value: 'WARNING', label: 'WARNING' },
    { value: 'CRITICAL', label: 'CRITICAL' },
  ];
  const [Level, setLevel] = useState("");
  const [searchKeyword,setSearchKeyword]=useState("");
  useEffect(() => {

    const today = new Date();
    const sevenDaysAgo = new Date(today);
    sevenDaysAgo.setDate(today.getDate() - 7);
    setDateRange([sevenDaysAgo, today]);
  }, []);

  const [chartData,setChartData]=useState([])
  
  // Function to send date range to the API
  const sendDateRangeToAPI = useCallback(async () => {
    const payload = {
      startDate: dateRange[0].toISOString(),
      endDate: dateRange[1].toISOString(),
      level: Level,
      searchKeyword:searchKeyword
    };

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
    } catch (error) {
      console.error('Error sending log data to API:', error);
    }
  },[Level,searchKeyword,dateRange]);

  useEffect(()=>{
    sendDateRangeToAPI()
  },[sendDateRangeToAPI])

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
                                      sendDateRangeToAPI(start, end);
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

                <Row>
                  <ProjectsStatus series={chartData}/>
                  <Col xl={8}>
                    <RecentOrders data={DATA} />
                  </Col>
                </Row>
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
