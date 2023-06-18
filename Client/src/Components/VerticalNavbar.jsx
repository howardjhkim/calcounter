import React from "react"
import {NavLink} from "react-router-dom"

import homeIcon from "../Images/home-icon.png"
import workoutIcon from "../Images/workout-icon.png"
import calculatorIcon from "../Images/calculator-icon.png"
import help from "../Images/help.svg"
import verticalNavBar from "../CSS/VerticalNavBar.css"
import supplements from "../Images/Supplements.svg"
import equipment from "../Images/Equipment.svg"
import groups from "../Images/Groups.svg"

export default function VerticalNavbar() {
    
    return (
        <div className="vertical-nav-bar">
            <div className="vertical-nav-bar-sections">
                <span className="section-small-title">Menu</span>
                <nav className="menu">
                    <NavLink to="/" className="nav-links-and-icon-container">
                            <img className="small-icon" src={homeIcon} />
                            <span className="main-typography ">Home</span>
                    </NavLink>
                
                    <NavLink to="/tdee" className="nav-links-and-icon-container">
                            <img className="small-icon" src={calculatorIcon} />
                            <span className="main-typography ">TDEE</span>
                    </NavLink>

                    {/* <NavLink to="/workouts" className="nav-links-and-icon-container">
                            <img className="small-icon" src={workoutIcon} />
                            <span className="main-typography ">Workouts</span>
                    </NavLink> */}

                    <NavLink to="/help" className="nav-links-and-icon-container">
                            <img className="small-icon" src={help} />
                            <span className="main-typography ">Help</span>
                    </NavLink>
                </nav>
            </div>
            
            <div className="line-breaker"></div>
            
            <div className="vertical-nav-bar-sections">
                <span className="section-small-title">External Links</span>
                <nav className="">
                    <NavLink to="https://www.gnc.com/" className="nav-links-and-icon-container" target="blank">
                            <img className="small-icon" src={supplements} />
                            <span className="main-typography">Supplements</span>
                    </NavLink>
                
                    <NavLink to="https://www.amazon.com/s?k=fitness&crid=33L9BLY2NNE01&sprefix=fitnes%2Caps%2C182&ref=nb_sb_noss_2" className="nav-links-and-icon-container" target="blank">
                            <img className="small-icon" src={equipment} />
                            <span className="main-typography">Fitness Gears</span>
                    </NavLink>

                    <NavLink to="https://classpass.com/" className="nav-links-and-icon-container" target="blank">
                            <img className="small-icon" src={groups} />
                            <span className="main-typography">Classes</span>
                    </NavLink>
                </nav>
            </div>
            
        </div>
    )
}


