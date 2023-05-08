import React from "react"
import {NavLink} from "react-router-dom"

import homeIcon from "../Images/home-icon.png"
import workoutIcon from "../Images/workout-icon.png"
import calculatorIcon from "../Images/calculator-icon.png"
import settingsIcon from "../Images/settings-icon.png"
import logo from "../Images/logo.png"
import help from "../Images/help.svg"

export default function VerticalNavbar() {
    
    return (
        <div className="vertical-nav-bar">
            <div className="vertical-nav-bar-sections">
                <span className="vertical-nav-bar-title">Menu</span>
                <nav className="nav-links-container">
                    <NavLink to="/" className="nav-links-and-icon-container">
                            <img className="small-icon" src={homeIcon} />
                            <span className="nav-name">Home</span>
                    </NavLink>
                
                    <NavLink to="/tdee" className="nav-links-and-icon-container">
                            <img className="small-icon" src={calculatorIcon} />
                            <span className="nav-name">TDEE</span>
                    </NavLink>

                    <NavLink to="/workouts" className="nav-links-and-icon-container">
                            <img className="small-icon" src={workoutIcon} />
                            <span className="nav-name">Workouts</span>
                    </NavLink>

                    <NavLink to="/help" className="nav-links-and-icon-container">
                            <img className="small-icon" src={help} />
                            <span className="nav-name">Help</span>
                    </NavLink>
                </nav>
            </div>
            
            <div className="line-breaker"></div>
            
            <div className="vertical-nav-bar-sections">
                <span className="vertical-nav-bar-title">Menu</span>
                <nav className="nav-links-container">
                    <NavLink to="/a" className="nav-links-and-icon-container">
                            <img className="small-icon" src={homeIcon} />
                            <span className="nav-name">Home</span>
                    </NavLink>
                
                    <NavLink to="/a" className="nav-links-and-icon-container">
                            <img className="small-icon" src={calculatorIcon} />
                            <span className="nav-name">TDEE</span>
                    </NavLink>

                    <NavLink to="/a" className="nav-links-and-icon-container">
                            <img className="small-icon" src={workoutIcon} />
                            <span className="nav-name">Workouts</span>
                    </NavLink>
                </nav>
            </div>
            
        </div>
    )
}


