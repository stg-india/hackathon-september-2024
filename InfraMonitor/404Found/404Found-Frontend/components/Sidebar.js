'use client'
import React, { useState, useCallback, useEffect } from 'react'
import { useRouter,usePathname,useSearchParams } from 'next/navigation'
import Image from 'next/image'

function Sidebar() {
  const router = useRouter();
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // State to manage checkbox values
  const [services, setServices] = useState({
    PyEditorial: false,
    CRUD_SQL: false,
  });

  const [status, setStatus] = useState({
    Error: true,
    info: true,
    Warn: true,
  });

  // Function to handle checkbox changes and update query parameters
  const handleServiceChange = (e) => {
    const { name, checked } = e.target;
    setServices((prev) => ({
      ...prev,
      [name]: checked,
    }));
    router.push(pathname + '?' + createQueryString(name,checked))
  };

  const handleStatusChange = (e) => {
    const { name, checked } = e.target;
    setStatus((prev) => ({
      ...prev,
      [name]: checked,
    }));
    router.push(pathname + '?' + createQueryString(name,checked))
  };

  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)
 
      return params.toString()
    },
    [searchParams]
  )

  useEffect(()=>{
    router.push(pathname + '?Error=true&Warn=true&info=true')
  },[])

  return (
    <div className='w-1/5 pt-10 px-5 min-h-screen border border-l-2'>
      <Image 
        src={'/assets/logo.png'}
        height={100}
        width={100}
        className=''
      />
      <h1 className='font-bold text-lg'>STGI LOGGER</h1>
      <div className='flex flex-col gap-4 mt-5'>
        <div className='hover:cursor-pointer bg-gray-300/50 py-2 px-4 rounded-md'>
          Services
        </div>
        <div className='mx-10'>
          <input
            type='checkbox'
            id='PyEditorial'
            name='PyEditorial'
            checked={services.PyEditorial}
            onChange={handleServiceChange}
          />
          <label htmlFor='PyEditorial'>  PyEditorial </label><br/>
          
          <input
            type='checkbox'
            id='crud-sql'
            name='CRUD_SQL'
            checked={services.CRUD_SQL}
            onChange={handleServiceChange}
          />
          <label htmlFor='crud-sql'>  CRUD-SQL</label><br/>
        </div>

        <div className='hover:cursor-pointer bg-gray-300/50 py-2 px-4 rounded-md'>
          Status
        </div>
        <div className='mx-10'>
          <input
            type='checkbox'
            id='Error'
            name='Error'
            checked={status.Error}
            onChange={handleStatusChange}
          />
          <label htmlFor='Error'>  Error</label><br/>
          
          <input
            type='checkbox'
            id='info'
            name='info'
            checked={status.info}
            onChange={handleStatusChange}
          />
          <label htmlFor='info'>  Info </label><br/>
          
          <input
            type='checkbox'
            id='Warn'
            name='Warn'
            checked={status.Warn}
            onChange={handleStatusChange}
          />
          <label htmlFor='Warn'>  Warning </label><br/>
        </div>
      </div>
    </div>
  )
}

export default Sidebar;
