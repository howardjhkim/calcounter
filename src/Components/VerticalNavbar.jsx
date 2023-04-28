import React from "react"
import {NavLink} from "react-router-dom"

import homeIcon from "../Images/home-icon.png"
import workoutIcon from "../Images/workout-icon.png"
import calculatorIcon from "../Images/calculator-icon.png"
import settingsIcon from "../Images/settings-icon.png"

export default function VerticalNavbar() {
    
    return (
        <div className="vertical-nav-bar">
            
            <div>
                <NavLink className="home-logo" to="/">#CALCOUNT</NavLink>
            </div>

            <div className="vertical-nav-bar-sections">
                <span className="vertical-nav-bar-li-title">Menu</span>
                
                <nav className="nav-links-container">
                    <div className="nav-links-and-icon-container">
                        <img className="small-icon" src={homeIcon} />
                        <NavLink className="nav-links" to="/">Home</NavLink>
                    </div>
                    <div className="nav-links-and-icon-container">
                        <img className="small-icon" src={calculatorIcon} />
                        <NavLink className="nav-links" to="/tdee">TDEE</NavLink>
                    </div>
                    <div className="nav-links-and-icon-container">
                        <img className="small-icon" src={workoutIcon} />
                        <NavLink className="nav-links" to="/workouts">Workouts</NavLink>
                    </div>
                    <div className="nav-links-and-icon-container">
                        <img className="small-icon" src={settingsIcon} />
                        <NavLink className="nav-links" to="/settings">Settings</NavLink>
                    </div>
                </nav>
            </div>

            <div className="vertical-nav-bar-sections">
                <span className="vertical-nav-bar-li-title">Menu</span>
                
                <nav className="nav-links-container">
                    <div className="nav-links-and-icon-container">
                        <img className="small-icon" src={homeIcon} />
                        <NavLink className="nav-links" to="/">Home</NavLink>
                    </div>
                    <div className="nav-links-and-icon-container">
                        <img className="small-icon" src={calculatorIcon} />
                        <NavLink className="nav-links" to="/tdee">TDEE</NavLink>
                    </div>
                    <div className="nav-links-and-icon-container">
                        <img className="small-icon" src={workoutIcon} />
                        <NavLink className="nav-links" to="/workouts">Workouts</NavLink>
                    </div>
                    <div className="nav-links-and-icon-container">
                        <img className="small-icon" src={settingsIcon} />
                        <NavLink className="nav-links" to="/settings">Settings</NavLink>
                    </div>
                </nav>
            </div>

        </div>
    )
}


