import React from "react"
import {NavLink, Link} from "react-router-dom"
import { ReactComponent as IconName } from '../Images/add.svg';

import logo from "../Images/logo.png"
import hamburger from "../Images/hamburger.png"
import profilePicture from "../Images/profile-picture.png"
import header from "../CSS/Header.css"

export default function Header() {

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
                        
                        <span><IconName/></span>
                        
                        <span style={{color:"white"}}>Add</span>
                    
                    </button>
                    <img className="profilepic-img" src={profilePicture} />
                </div>
            </nav>
        </header>
    )
}