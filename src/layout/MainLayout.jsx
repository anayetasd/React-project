import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Topbar from './Topbar'
import Footer from './Footer'

const MainLayout = () => {
    return (
        <>

            <Sidebar/>
            <div className="content">
                <Topbar />
                <Outlet />
                <Footer />
            </div>


        </>
    )
}

export default MainLayout