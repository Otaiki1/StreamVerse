import React from 'react'
import CalenderBox from './CalenderBox'

const TicketInfo = () => {
  return (
    <div className='flex flex-col space-y-11 items-start mt-9'>
    <div className='flex items-start space-x-4'>
    <span className='text-center font-bold text-[24px] pt-4 font-Inter-Bold'>Date :</span>
    <CalenderBox />
    </div>
    <div className='flex items-start space-x-4'>
    <span className='text-center font-bold text-[24px]   font-Inter-Bold'>Time:</span>
   <input type="time" className='border-2 border-[#000] w-[75px] h-[35px] outline-none px-4 py-2' />
    </div>
    <div className='flex items-start space-x-4'>
    <span className='text-center font-bold text-[24px] pt-4 font-Inter-Bold'>Price:</span>
      0.025 usdc
    </div>
</div>
  )
}

export default TicketInfo