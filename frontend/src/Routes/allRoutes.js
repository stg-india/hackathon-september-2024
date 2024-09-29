import React from "react";
import { Redirect } from "react-router-dom";

//Dashboard

import DashboardEcommerce from "../pages/DashboardEcommerce";





const authProtectedRoutes =[]

const publicRoutes = [



  { path: "/dashboard", component: DashboardEcommerce },
 
];

export { authProtectedRoutes, publicRoutes };