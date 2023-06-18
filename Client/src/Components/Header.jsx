import React, { useContext, useState, useEffect, useRef} from "react"
import {Context} from "../Context/DataContext"
import Axios from "axios"
import {NavLink, Link} from "react-router-dom"
import { ReactComponent as IconName } from '../Images/add.svg';

import logo from "../Images/logo.png"
import hamburger from "../Images/hamburger.png"
import profilePicture from "../Images/profile-picture.png"
import header from "../CSS/Header.css"
import Search from "../Images/Search.svg"
import exit from "../Images/exit.svg"

import newlogo from "../Images/newlogo.svg"


// import toggle from "../CSS/Toggle.css"


export default function Header() {

    ///////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////


    ///////////// Component Ref /////////////
    const componentRef = useRef(null)

    
    ///////////// States for inputs /////////////
    const [foodName, setFoodName] = React.useState("")
    const [inputCalPerServ, setInputCalPerServ] = React.useState("")
    const [inputServings, setInputServings] = React.useState("")
    const [inputGrams, setInputGrams] = React.useState("")
    const [inputCarbs, setInputCarbs] = React.useState("")
    const [inputProtein, setInputProtein] = React.useState("")
    const [inputFat, setInputFat] = React.useState("")

    
    ///////////// Database State & Add Function ///////////// 
    const { foodDbList } = useContext(Context)
    const { addFoodDbList } = useContext(Context)


    ///////////// Database GET & DELETE ///////////// 
    const addFoodDb = () => {
        Axios.post('http://localhost:3001/create', {
            name: foodName, 
            protein: Number(inputProtein),  
            carbs: Number(inputCarbs),
            fat: Number(inputFat),
            calories: Number(inputCalPerServ)
        })
        addFoodDbList(
            [...foodDbList, 
                {
                    name: foodName, 
                    protein: Number(inputProtein),  
                    carbs: Number(inputCarbs),
                    fat: Number(inputFat),
                    calories: Number(inputCalPerServ)
                }
            ]
        )
    }

    
    ///////////// Data submission button /////////////
    function dataSubmit(e) {
        e.preventDefault();
        
        if(foodName.length < 1) {
            alert("Please enter a food name")
            return
        }

        if (
            (isNaN(Number(inputCalPerServ)) || 
            (isNaN(Number(inputServings)) ||
            (isNaN(Number(inputGrams)) || 
            (isNaN(Number(inputCarbs)) ||
            (isNaN(Number(inputFat)) ||
            (isNaN(Number(inputProtein))))))))
            )
            {
                alert("Please enter numbers only")
            return
        } else {
            addFoodDb()
            clearVals()
        }
    }


    ///////////// clears all inputs /////////////
    function clearVals() {
        setFoodName('')
        setInputCalPerServ('')
        setInputServings('')
        setInputGrams('')
        setInputProtein('')
        setInputCarbs('')
        setInputFat('')
    }




    ///////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////


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
                            <nav className="logo">   
                                <Link to="/"><img className="home-logo" src={newlogo} /> </Link>
                            </nav>       
                            <div className="header-searchbar" onClick={toggleModal}>
                                <img src={Search} className="small-icon search-icon"></img>
                                <input className="searchbar-input" type="text" placeholder="What did you eat today?"/>
                            </div>
                            <nav className="header-right-container">
                                <NavLink to="/login"><p>Login</p></NavLink>
                                <NavLink to="/register"><p>Register</p></NavLink>
                            </nav>
                        </div>

                        <div className="mobileview-master-container">
                            <div className="mobileview-first-row">
                                <nav className="logo">   
                                    <Link to="/">
                                        <img className="home-logo" src={newlogo} />
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

                                <input type="text" placeholder="Food" value={foodName} onChange={e => setFoodName(e.target.value)}/>
                                <input type="text" placeholder="Calories Per Serving" value={inputCalPerServ} onChange={e => setInputCalPerServ(e.target.value)}/>
                                <input type="text" placeholder="Amount of Servings" value={inputServings} onChange={e => setInputServings(e.target.value)}/>
                                <input type="text" placeholder="Grams" value={inputGrams} onChange={e => setInputGrams(e.target.value)}/>
                                
                                <h4>Macros</h4>
                                
                                <input type="text" placeholder="Protein" value={inputProtein} onChange={e => setInputProtein(e.target.value)}/>
                                <input type="text" placeholder="Carbs" value={inputCarbs} onChange={e => setInputCarbs(e.target.value)}/>
                                <input type="text" placeholder="Fat" value={inputFat} onChange={e => setInputFat(e.target.value)}/>
                            </div>
                            
                            {/* <div className="header-widget">
                                <div>fill</div>
                            </div> */}

                            <button className="submit" onClick={dataSubmit}>Submit</button>

                        </div>

                    </div>
                )}
            </div>

</header>
)
}