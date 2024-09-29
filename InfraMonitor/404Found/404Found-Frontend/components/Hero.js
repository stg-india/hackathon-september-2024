'use client'
import React, { useState } from 'react'
import Searchbar from './Searchbar'
import Logger from './Logger'
import Navbar from './Navbar'
import { Histogram } from './Histogram'
import { data } from '@/data'
import BarChartWithTimestamp from './BarChart'

function Hero() {

  const [data, setData] = useState([]);

  return (
    <div className='flex-1 flex flex-col'>
        <Navbar liftUp={setData} />
        {/* <Searchbar /> */}
        {/* <Histogram width={1200} height={400} data={data} /> */}
        <BarChartWithTimestamp data = {data}/>
        <Logger liftUp={setData} />
    </div>
  )
}

export default Hero