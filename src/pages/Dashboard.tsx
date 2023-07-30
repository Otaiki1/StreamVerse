import React from 'react'
import { DNavbar, MainBody, Sidebar } from '../components'

const Dashboard = () => {
  return (
    <>
    <DNavbar />
    <div className='flex items-center gap-'>
      <Sidebar />
      <MainBody />
    </div>
    </>
  )
}

export default Dashboard