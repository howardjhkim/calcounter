import React, {useState} from "react"
import {NavLink, Link} from "react-router-dom"
import { ReactComponent as IconName } from '../Images/add.svg';

import logo from "../Images/logo.png"
import hamburger from "../Images/hamburger.png"
import profilePicture from "../Images/profile-picture.png"
import header from "../CSS/Header.css"
// import toggle from "../CSS/Toggle.css"


export default function Header() {





    const [userNameReg, setUserNameReg] = useState('')
    const [passwordReg, setPasswordReg] = useState('')










    return(
        <header>
            <nav className="header-master-container">
                
                <div className="header-leftside-container">
                    <img className="small-icon dropdown" src={hamburger} alt="" />
                    <Link to="/">
                        <img className="home-logo" src={logo} />
                    </Link>
                </div>

                
                <div className="header-rightside-container">
                    <button className="header-button">
                        
                        <span className="aaa"><IconName/></span>
                        
                        <span style={{color:"white"}}>Add</span>
                    
                    </button>
                    <img className="profilepic-img" src={profilePicture} />
                    <nav className="">
                        <NavLink to="/login">Log In</NavLink>
                        <NavLink to="/register">Register</NavLink>
                    </nav>
                </div>
            </nav>
        </header>
    )
}