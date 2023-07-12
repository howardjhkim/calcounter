import React from "react"
import {Outlet} from "react-router-dom"

import Header from "./Header"
import Footer from "./Footer"
import VerticalNavbar from "./VerticalNavbar"
import ProfileBar from "./ProfileBar"

export default function Layout() {
    return(

        <div className="site-wrapper-grid">
            <div className="navbar"><VerticalNavbar/></div>
            <div className="header"><Header /></div>
            <div className="profile-bar"><ProfileBar/></div>
            <div className="outlet"><Outlet /></div>
            <div className="footer"><Footer /></div>
        </div>
    )
}