import React from "react"
import {Outlet} from "react-router-dom"

import Header from "./Header"
import Footer from "./Footer"
import VerticalNavbar from "./VerticalNavbar"

export default function Layout() {
    return(
        <div className="site-wrapper">
            <div>
                <VerticalNavbar />
            </div>

            <div className="components">
                <Header />
                <Outlet />
                <Footer />
            </div>
        </div>
    )
}