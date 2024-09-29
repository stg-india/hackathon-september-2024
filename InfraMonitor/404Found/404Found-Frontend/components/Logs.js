import React from 'react'

function Logs({log}) {

  const message = log['message'];
  let status = 'DEBUG'

  if(message.includes('INFO')){
    status = 'INFO'
  }
  else if(message.includes('WARN')){
    status = 'WARN'
  }
  else if(message.includes('ERROR')){
    status = 'ERROR'
  }

  const logData = {
    'timestamp': log['@timestamp'], 
    'host': log['host']?.name || 'host-11',
    'status': status,
    'message': message,
    'service': log['message'].includes('django') ? 'PyEditorial' : 'Match Fetcher' 
  }

  return (
   <div className='w-full grid grid-cols-5 px-2 p-1 border border-1'>
        <div>{ logData.timestamp } 
          <br />

        </div>
        <div>{ logData.host } </div>
        <div> { logData.service } </div>
        <div> { logData.status } </div>
        <div>{logData.message } </div>
   </div>
  )
}

export default Logs