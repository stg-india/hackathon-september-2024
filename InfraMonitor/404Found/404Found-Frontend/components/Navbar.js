    'use client'
    import React from 'react'
    import Searchbar from './Searchbar'
    import TimeFilter from './TimeFilter.jsx'
    
    function Navbar() {
      return (
        <div className='flex w-full p-4 bg-sky-200/40'>
            <div className='w-1/2 font-semibold'>Logs</div>
            <div className='flex-1 flex justify-between'>
                <TimeFilter />
                <Searchbar />
            </div>
        </div>
      )
    }
    
    export default Navbar