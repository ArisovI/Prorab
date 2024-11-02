import React from 'react'
import './styles/Layout.css'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom'

export default function Layout() {
  return (
    <div className='layout'>
        <Sidebar />

        <div className="content">
          <Outlet />
        </div>
    </div>
  )
}
