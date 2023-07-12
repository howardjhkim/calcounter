import React, {useContext} from "react"
import {NavLink, Link} from "react-router-dom"
import {Context} from "../Context/DataContext"
import footer from "../CSS/Footer.css"

import profile from "../Images/Profile.svg"
import help from "../Images/help.svg"
import home from "../Images/Home.svg"
import tdee from "../Images/calculator-icon.png"
import workouts from "../Images/workout-icon.png"

export default function Footer() {
    
    ///////////// Checks if user is logged /////////////
    const {userContext, addUserContext} = useContext(Context)
    const data = localStorage.getItem('userContext')
    const userContextData = data ? JSON.parse(data) : null;
    const id = userContextData?.id
    
    
    return (
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


                {id ? <Link to="/profile/:id" className="footer-elements-container">
                    <img src={profile} alt="" className="footer-icon"/>
                    <p>Profile</p>
                </Link> : null}

            </nav>



        </footer>
    )
}