import React,{useState} from 'react'
import DataContext from '@/context/Data/DataContext';
import { useContext } from 'react';

function TimeFilter() {

    const [timer,setTimer] = useState('15min');

    const {myData,setData:setMyData} = useContext(DataContext);

    const handleSelectTimer = async (e)=>{

      const d = await fetch(`http://localhost:8081/messages/timestamp?interval=${e.target.value}`);
      const jsonData = await d.json();
  
      setMyData(jsonData);
    }    

  return (
    <select name="time" id="" onChange={handleSelectTimer}>
        <option value="15">Past 15 minutes</option>
        <option value="60">Past 1 hour</option>
        <option value="360">Past 6 hours</option>
        <option value="720">Past 12 hours</option>
        <option value="1440">Past 24 hours</option>
    </select>
    )
}

export default TimeFilter