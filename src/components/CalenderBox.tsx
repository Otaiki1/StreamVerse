import React from 'react'

const CalenderBox = () => {
  return (
    <div className='bg-black relative width-[50px] h-[70px]'>
        CalenderBox
        <div className='bg-white w-3 h-3 rounded-full absolute top-0 left-[45%]' />
        <div className='bg-white w-3 h-3 rounded-full absolute top-[50%] -left-0' />
        <div className='bg-white w-3 h-3 rounded-full absolute top-[50%] -right-0' />
    </div>
  )
}

export default CalenderBox