'use client'
import React, { useState } from 'react'
import DataContext from '@/context/Data/DataContext';
import { useContext } from 'react';

function Searchbar() {

  const [searchText,setSearchText] = useState('');

  const {myData,setData:setMyData} = useContext(DataContext);

  const findData = async () => {
    const d = await fetch(`http://localhost:8081/messages/keyword?word=${searchText}`);
    const jsonData = await d.json();

    setMyData(jsonData);
  }
    
  return (
    <div className='flex items-center gap-5'>
        <input type="text" className='px-4 bg-gray-400/10 border-2' placeholder='Type Keyword' 
          onChange={(e)=>{
            setSearchText(e.target.value)
          }}
        />
        <button className='p-1 rounded-lg bg-blue-500 hover:bg-blue-600 text-white text-sm'
          onClick={findData}
        >
            Search
        </button>
    </div>
  )
}

export default Searchbar