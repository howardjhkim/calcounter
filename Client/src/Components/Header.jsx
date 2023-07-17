import React, { useContext, useState, useEffect, useRef} from "react"
import {NavLink, Link, useNavigate, useParams} from "react-router-dom"

import Axios from "axios"
import {Context} from "../Context/DataContext"

import logo from "../Images/logo.png"
import { ReactComponent as IconName } from '../Images/add.svg';
import Search from "../Images/Search.svg"
import exit from "../Images/exit.svg"
import newlogo from "../Images/newlogo.svg"
import header from "../CSS/Header.css"

import FilledInput from '@mui/material/FilledInput';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';



export default function Header() {
    ///////////// Checks if user is logged /////////////
    const {userContext, addUserContext} = useContext(Context)
    const data = localStorage.getItem('userContext')
    const userContextData = data ? JSON.parse(data) : null;
    const id = userContextData?.id
    /////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////// Context /////////////
    const {isAuth, addIsAuth} = useContext(Context)
    const {foodDbList, addFoodDbList} = useContext(Context)
    
    ///////////// Food input states /////////////
    const [foodName, setFoodName] = React.useState("")
    const [inputServings, setInputServings] = React.useState("")
    const [inputGrams, setInputGrams] = React.useState("")
    const [inputCarbs, setInputCarbs] = React.useState("")
    const [inputProtein, setInputProtein] = React.useState("")
    const [inputFat, setInputFat] = React.useState("")
    const [calories, setCalories] = React.useState("")
    
    ///////////// State for checking input bar state /////////////
    const [isOpen, setIsOpen] = useState(false);
    
    ///////////// To change windows between "Add New Food" and "Recently Added" /////////////
    const [addNewFoodState, setAddNewFoodState] = useState(true)
    const [recentlyAddedState, setRecentlyAddedState] = useState(false)
    
    ///////////// State for checking if user is logged in /////////////
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    /////////////////////////////////////////////////////////////////////////////////////////////////////////
    

    /////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////// adds food the the database /////////////
    const addFoodDb = () => {
        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) {
            alert("You must be logged in");
            return;
        }
        Axios.post('https://calcounter-b4bd1e148395.herokuapp.com/food', {
            name: foodName, 
            protein: Number(inputProtein),  
            carbs: Number(inputCarbs),
            fat: Number(inputFat),
            calories: Number((inputProtein * 4) + (inputCarbs * 4) + (inputFat * 9))
        }, 
        {
            headers: {
                accessToken: accessToken,
            },
        })
        .then((res) => {
            if (res.data.error) {
              console.log(res.data.error);
              alert(res.data.error)
            } else {
                addFoodDbList(
                    [...foodDbList, 
                        {
                            name: foodName, 
                            protein: Number(inputProtein),  
                            carbs: Number(inputCarbs),
                            fat: Number(inputFat),
                            calories: Number((inputProtein * 4) + (inputCarbs * 4) + (inputFat * 9))
                        }
                    ]
                )
            }
          });
    }
    
    ///////////// Data submission button /////////////
    function dataSubmit(e) {
        e.preventDefault();
        if(foodName.length < 1) {
            alert("Please enter a food name")
            return
        }

        if (((isNaN(Number(inputServings)) || (isNaN(Number(inputGrams)) || (isNaN(Number(inputCarbs)) || (isNaN(Number(inputFat)) || (isNaN(Number(inputProtein))))))))) {
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
        setInputServings('')
        setInputGrams('')
        setInputProtein('')
        setInputCarbs('')
        setInputFat('')
    }

    function toggleModal() {
        setIsOpen(!isOpen)
    }


    const filledInput = [
        {name: 'Food Name', value: foodName, onChange: (e) => setFoodName(e.target.value)},
        {name: 'Servings', value: inputServings, onChange: (e) => setInputServings(e.target.value)},
        {name: 'Grams',value: inputGrams,onChange: (e) => setInputGrams(e.target.value)},
        
        {name: 'Protein',value: inputProtein,onChange: (e) => setInputProtein(e.target.value)},
        {name: 'Carbs',value: inputCarbs,onChange: (e) => setInputCarbs(e.target.value)},
        {name: 'Fat',value: inputFat,onChange: (e) => setInputFat(e.target.value)},
    ];
    
    const refreshPage = () => {
        setTimeout(() => {
            window.location.reload()
        }, 5000)
    }
    
    ///////////// signs the user out /////////////
    const signUserOut = () => {
        localStorage.clear()
        addIsAuth(false)
        window.location.reload()
    }
    
    ///////////// checks if a user is logged in /////////////
    useEffect(() => {
        if(localStorage.getItem("accessToken")) { 
            addIsAuth(true)
        } else {
            addIsAuth(false)
        }
    }, [isLoggedIn])

    ///////////// stops background from moving /////////////
    useEffect(() => {
        if (isOpen) {
          document.body.classList.add("modal-open");
        } else {
          document.body.classList.remove("modal-open");
        }
      }, [isOpen]);




    
    

    
    return(
        <header className={isOpen ? "full-height" : ""}>
            <div className={isOpen ? "full-height-header-master" : "header-master"}>
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
                                {!isAuth ? <NavLink to="/register"><p>Register</p></NavLink> : <NavLink to={`/profile/${id}`}><p>Profile</p></NavLink>}
                                {!isAuth ? <NavLink to="/login"><p>Login</p></NavLink> : <Button onClick={signUserOut}>Sign Out</Button>}
                            </nav>
                        </div>

                        <div className="mobileview-master-container">
                            <div className="mobileview-first-row">
                                <nav className="logo">   
                                    <Link to="/"><img className="home-logo" src={newlogo} /></Link>
                                </nav>
                                <nav className="header-right-container">
                                    {!isAuth ? <NavLink to="/register"><p>Register</p></NavLink> : <NavLink to={`/profile/${id}`}><p>Profile</p></NavLink>}
                                    {!isAuth ? <NavLink to="/login"><p>Login</p></NavLink> : <Button onClick={signUserOut}>Sign Out</Button>}
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
                    <div className="backdrop">
                        <div className="contents-container">
                            <div className="contents-top-row">
                                <img className="small-icon exit-btn" src={exit} alt="" onClick={toggleModal}/>
                                <p>What did you eat today?</p>
                            </div>

                            <div className="test header-widget">
                            <div className="chooser">
                                <div onClick={() => { setAddNewFoodState(true); setRecentlyAddedState(false); }}>
                                    Add New Food
                                </div>
                                {/* <div onClick={() => { setAddNewFoodState(false); setRecentlyAddedState(true); }}>
                                    Recently Added
                                </div> */}
                            </div>

                            {addNewFoodState && 
                                <div>
                                    <h4>Basic Info</h4>
                                    <div style={{display: 'flex', flexDirection: 'column'}}>
                                        {filledInput.slice(0, 2).map((el => 
                                            (<FormControl key={el.name} sx={{ m: 0, width: '100%' }} variant="filled">
                                                <FilledInput
                                                    id="filled-adornment-weight"
                                                    endAdornment={<InputAdornment position="end">grams per serving</InputAdornment>}
                                                    aria-describedby="filled-weight-helper-text"
                                                    inputProps={{'aria-label': 'weight',}}
                                                    value={el.value}
                                                    onChange={el.onChange}
                                                    />
                                                <FormHelperText id="filled-weight-helper-text">{el.name}</FormHelperText>
                                            </FormControl>)
                                        ))}
                                    </div>


                                    <h4>Macronutrients</h4>
                                    <div style={{display: 'flex', flexDirection: 'column'}}>
                                        {filledInput.slice(3).map((el => 
                                            (<FormControl key={el.name} sx={{ m: 0, width: '100%' }} variant="filled">
                                                <FilledInput
                                                    id="filled-adornment-weight"
                                                    endAdornment={<InputAdornment position="end">grams per serving</InputAdornment>}
                                                    aria-describedby="filled-weight-helper-text"
                                                    inputProps={{'aria-label': 'weight',}}
                                                    value={el.value}
                                                    onChange={el.onChange}
                                                    />
                                                <FormHelperText id="filled-weight-helper-text">{el.name}</FormHelperText>
                                            </FormControl>)
                                        ))}
                                    </div>
                                    <Button 
                                        variant="contained" 
                                        style={{marginLeft: `auto`, width: `15%`, marginTop:`20px`}}
                                        onClick={dataSubmit}
                                        >Submit
                                    </Button>
                                </div>}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </header>
    )
}