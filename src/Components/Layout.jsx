import React from "react"
import {Outlet} from "react-router-dom"

import Header from "./Header"
import Footer from "./Footer"
import VerticalNavbar from "./VerticalNavbar"

export default function Layout() {
    return(
        // <div className="site-wrapper">
        //     <VerticalNavbar />
        //     <div className="components">
        //         <Header />
        //         <Outlet />
        //         <Footer />
        //     </div>
        // </div>


        <div className="site-wrapper-grid">
            <div className="navbar">
                <VerticalNavbar/>
            </div>

            <div className="header">
                <Header />
            </div>

            <div className="outlet">
                <Outlet />
            </div>

            <div className="footer">
                <Footer />
            </div>
        </div>
    )
}