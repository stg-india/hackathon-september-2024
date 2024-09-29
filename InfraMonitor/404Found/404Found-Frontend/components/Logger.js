'use client'
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Logs from './Logs'
import { useContext } from 'react'
import DataContext from '@/context/Data/DataContext'

function Logger({liftUp}) {
  const searchParams = useSearchParams(); 
  const [data, setData] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [filteredData, setFilteredData] = useState([]); 
  const [error, setError] = useState(null);

  const {myData,setData:setMyData} = useContext(DataContext);

  const paramsString = searchParams.toString();



  const fetchLogs = async () => {
    setLoading(true);
    setError(null);
    try {
      const params = searchParams.toString(); 
      const response = await fetch(`/api/logs?${params}`); 
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      const result = await response.json(); 
      console.log(result)
      setData(result); 

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchLogs();
    }, 800);
    return () => clearTimeout(timer)
  }, []); 

  useEffect(()=>{

    if (!data || data.length === 0) {
      setFilteredData([]);
      return;
    }

    const isError = searchParams.get('Error');
    const isInfo = searchParams.get('info');
    const isWarn = searchParams.get('Warn');

    let filtered = [...data];

    let filteredNew = filtered.filter((item)=>{
      return ((isError=='true') ? item.message.includes('ERROR'):false) || ((isInfo=='true') ? item.message.includes('INFO'):false) || ((isWarn=='true') ? item.message.includes('WARN'):false)
    });
    setFilteredData(filteredNew);
    liftUp(filteredNew);
    setMyData(filteredNew)

  },[data, paramsString])


  return (
    <div className='flex-1 my-4'>
      <div className='w-full grid grid-cols-5 bg-gray-300/50 px-2 py-4 rounded-lg'>
        <h2>Date</h2>
        <h2>Host</h2>
        <h2>Service</h2>
        <h2>Status</h2>
        <h2>Message</h2>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        myData?.map((d, index) => (
          <Logs key={index} log={d} />
        ))
      )}
    </div>
  )
}

export default Logger;
