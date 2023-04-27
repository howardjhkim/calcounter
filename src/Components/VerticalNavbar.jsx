import React from "react"
import {NavLink} from "react-router-dom"

import homeIcon from "../Images/home-icon.png"
import workoutIcon from "../Images/workout-icon.png"
import calculatorIcon from "../Images/calculator-icon.png"
import settingsIcon from "../Images/settings-icon.png"

export default function VerticalNavbar() {
    
    return (
        <div className="vertical-nav-bar">
            <span className="vertical-nav-bar-li-title">Menu</span>
            
            <nav className="nav-links-container">

                <div className="nav-links-and-icon-container">
                    <img className="small-icon" src={homeIcon} />
                    <NavLink className="side-bar-links" to="/">Home</NavLink>
                </div>

                
                <div className="nav-links-and-icon-container">
                    <img className="small-icon" src={calculatorIcon} />
                    <NavLink className="side-bar-links" to="/tdee">TDEE</NavLink>
                </div>


                <div className="nav-links-and-icon-container">
                    <img className="small-icon" src={workoutIcon} />
                    <NavLink className="side-bar-links" to="/workouts">Workouts</NavLink>
                </div>

                <div className="nav-links-and-icon-container">
                    <img className="small-icon" src={settingsIcon} />
                    <NavLink className="side-bar-links" to="/settings">Settings</NavLink>
                </div>

            </nav>
        </div>
    )
}


