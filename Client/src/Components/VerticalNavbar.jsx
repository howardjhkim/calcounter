import React from "react"
import {NavLink} from "react-router-dom"

import homeIcon from "../Images/home-icon.png"
import workoutIcon from "../Images/workout-icon.png"
import calculatorIcon from "../Images/calculator-icon.png"
import help from "../Images/help.svg"
import verticalNavBar from "../CSS/VerticalNavBar.css"


export default function VerticalNavbar() {
    
    return (
        <div className="vertical-nav-bar">
            <div className="vertical-nav-bar-sections">
                <span className="section-small-title">Menu</span>
                <nav className="">
                    <NavLink to="/" className="nav-links-and-icon-container">
                            <img className="small-icon" src={homeIcon} />
                            <span className="main-typography ">Home</span>
                    </NavLink>
                
                    <NavLink to="/tdee" className="nav-links-and-icon-container">
                            <img className="small-icon" src={calculatorIcon} />
                            <span className="main-typography ">TDEE</span>
                    </NavLink>

                    <NavLink to="/workouts" className="nav-links-and-icon-container">
                            <img className="small-icon" src={workoutIcon} />
                            <span className="main-typography ">Workouts</span>
                    </NavLink>

                    <NavLink to="/help" className="nav-links-and-icon-container">
                            <img className="small-icon" src={help} />
                            <span className="main-typography ">Help</span>
                    </NavLink>
                </nav>
            </div>
            
            <div className="line-breaker"></div>
            
            <div className="vertical-nav-bar-sections">
                <span className="section-small-title">Menu</span>
                <nav className="">
                    <NavLink to="/a" className="nav-links-and-icon-container">
                            <img className="small-icon" src={homeIcon} />
                            <span className="main-typography">Home</span>
                    </NavLink>
                
                    <NavLink to="/a" className="nav-links-and-icon-container">
                            <img className="small-icon" src={calculatorIcon} />
                            <span className="main-typography">TDEE</span>
                    </NavLink>

                    <NavLink to="/a" className="nav-links-and-icon-container">
                            <img className="small-icon" src={workoutIcon} />
                            <span className="main-typography">Workouts</span>
                    </NavLink>
                </nav>
            </div>
            
        </div>
    )
}


