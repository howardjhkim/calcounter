import React, {useState} from "react"
import {NavLink, Link} from "react-router-dom"
import { ReactComponent as IconName } from '../Images/add.svg';

import logo from "../Images/logo.png"
import hamburger from "../Images/hamburger.png"
import profilePicture from "../Images/profile-picture.png"
import header from "../CSS/Header.css"
import Search from "../Images/Search.svg"
import exit from "../Images/exit.svg"


// import toggle from "../CSS/Toggle.css"


export default function Header() {





    const [userNameReg, setUserNameReg] = useState('')
    const [passwordReg, setPasswordReg] = useState('')




    const [isOpen, setIsOpen] = useState(false);


    function toggleModal() {
        setIsOpen(!isOpen)
    }

    return(
        <header>
            <div className="header-master">
                {!isOpen && (
                    <div className="header-master-container">

                        <div className="desktopview-master-container">
                            <nav className="">   
                                <Link to="/"><img className="home-logo" src={logo} /> </Link>
                            </nav>       
                            <div className="header-searchbar" onClick={toggleModal}>
                                <img src={Search} className="small-icon"></img>
                                <input className="searchbar-input" type="text" placeholder="What did you eat today?"/>
                            </div>
                            <nav className="header-right-container">
                                <NavLink to="/login"><p>Login</p></NavLink>
                                <NavLink to="/register"><p>Register</p></NavLink>
                            </nav>
                        </div>

                        <div className="mobileview-master-container">
                            <div className="mobileview-first-row">
                                <nav className="">   
                                    <Link to="/">
                                        <img className="home-logo" src={logo} />
                                    </Link>
                                </nav>
                                <nav className="header-right-container">
                                    <NavLink to="/login"><p>Login</p></NavLink>
                                    <NavLink to="/register"><p>Register</p></NavLink>
                                </nav>
                            </div>
                            
                            <div className="header-searchbar" onClick={toggleModal}>
                                <img src={Search} className="small-icon"></img>
                                <input className="searchbar-input" type="text" placeholder="What did you eat today?"/>
                            </div>

                        </div>

                    </div>
                )}
                
                {isOpen && (
                    <div className="toggledInput" >
                        <div className="backdrop"></div>
                        <div className="contents-container">
                            <div className="contents-top-row">
                                <img className="small-icon exit-btn" src={exit} alt="" onClick={toggleModal}/>
                                <p>What did you eat today?</p>
                            </div>

                            <div className="test header-widget">


                                <h4>Basic Info</h4>

                                <input type="text" placeholder="Food"/>
                                <input type="text" placeholder="Calories Per Serving"/>
                                <input type="text" placeholder="Amount of Servings"/>
                                <input type="text" placeholder="Grams"/>
                                
                                <h4>Macros</h4>
                                
                                <input type="text" placeholder="Protein"/>
                                <input type="text" placeholder="Carbs"/>
                                <input type="text" placeholder="Fat"/>
                            </div>
                            
                            <div className="header-widget">
                                <div>fill</div>
                                

                            </div>
                        </div>

                    </div>
                )}
            </div>






</header>
)
}