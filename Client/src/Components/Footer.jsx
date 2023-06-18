import React from "react"
import footer from "../CSS/Footer.css"
import {NavLink, Link} from "react-router-dom"

import profile from "../Images/Profile.svg"
import tdee from "../Images/calculator-icon.png"
import workouts from "../Images/workout-icon.png"
import help from "../Images/help.svg"
import home from "../Images/Home.svg"





export default function Footer() {
    return (
        // <footer>&#169; 2023 CALCOUNT</footer>
        <footer>
            <nav className="footer-nav">
                
                
                <Link to="/help" className="footer-elements-container">
                    <img src={help} alt="" className="footer-icon"/>
                    <p>Help</p>
                </Link>
                
                <Link to="/tdee" className="footer-elements-container">
                    <img src={tdee} alt="" className="footer-icon"/>
                    <p>TDEE</p>
                </Link>
                
                <Link to="/" className="footer-elements-container">
                    <img src={home} alt="" className="footer-icon"/>
                    <p>Home</p>
                </Link>

                {/* <Link to="/workouts" className="footer-elements-container">
                    <img src={workouts} alt="" className="footer-icon"/>
                    <p>Workouts</p>
                </Link> */}


                <Link to="/profile" className="footer-elements-container">
                    <img src={profile} alt="" className="footer-icon"/>
                    <p>Profile</p>
                </Link>

            </nav>



        </footer>
    )
}