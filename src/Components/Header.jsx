import React from "react"
import {NavLink, Link} from "react-router-dom"
import logo from "../Images/logo.png"
import hamburger from "../Images/hamburger.png"
import profilePicture from "../Images/profile-picture.png"
import { ReactComponent as IconName } from '../Images/add.svg';
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
                        
                        <span>
                            <IconName/>
                        </span>
                        
                        <span style={{
                            color:"white"}}>Add</span>
                    </button>
                    <img className="profilepic-img" src={profilePicture} />
                </div>
                {/* <div>
                    <NavLink className="navlinks" to="/tdee">TDEE</NavLink>
                    <NavLink className="navlinks" to="/workouts">Workouts</NavLink>
                </div> */}
            </nav>
        </header>
    )
}