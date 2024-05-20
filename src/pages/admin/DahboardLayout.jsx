import React from 'react'
import { Outlet } from 'react-router-dom'
import HeaderAdmin from '../../components/admin/HeaderAdmin'

const DahboardLayout = () => {
  return (
    <>
    <HeaderAdmin />
    <Outlet />
    </>
  )
}

export default DahboardLayout