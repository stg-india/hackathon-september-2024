'use client'
import React, { useState } from "react";
import DataContext from "./DataContext";

const DataState = (props) => {
  const [myData,setData] = useState([]);

  return (
    <DataContext.Provider
      value={{myData,setData}}
   >
      {props.children}
    </DataContext.Provider>
  )

}

export default DataState

