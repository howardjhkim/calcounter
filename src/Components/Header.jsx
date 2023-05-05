import React from "react"
import {NavLink} from "react-router-dom"
import logo from "../Images/logo.png"

export default function Header() {

    return(
        <header>
            <nav className="header-container">
                <NavLink to="/">
                    <img className="home-logo" src={logo} />
                </NavLink>
                {/* <div>
                    <NavLink className="navlinks" to="/tdee">TDEE</NavLink>
                    <NavLink className="navlinks" to="/workouts">Workouts</NavLink>
                </div> */}
            </nav>
        </header>
    )
}