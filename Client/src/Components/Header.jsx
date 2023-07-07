import React, { useContext, useState, useEffect, useRef} from "react"
import {Context} from "../Context/DataContext"
import Axios from "axios"
import {NavLink, Link, useNavigate, useParams} from "react-router-dom"
import { ReactComponent as IconName } from '../Images/add.svg';

import logo from "../Images/logo.png"
import hamburger from "../Images/hamburger.png"
import profilePicture from "../Images/profile-picture.png"
import header from "../CSS/Header.css"
import Search from "../Images/Search.svg"
import exit from "../Images/exit.svg"

import newlogo from "../Images/newlogo.svg"

import { signOut } from "firebase/auth"
import { auth } from "../Archived/firebase"

import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';



// import toggle from "../CSS/Toggle.css"


export default function Header() {

    const {userContext, addUserContext} = useContext(Context)



    let {id} = useParams()

    ///////////// Component Ref /////////////
    const componentRef = useRef(null)
    const {isAuth, addIsAuth} = useContext(Context)
    ///////////// States for inputs /////////////
    const [foodName, setFoodName] = React.useState("")
    const [inputCalPerServ, setInputCalPerServ] = React.useState("")
    const [inputServings, setInputServings] = React.useState("")
    const [inputGrams, setInputGrams] = React.useState("")
    const [inputCarbs, setInputCarbs] = React.useState("")
    const [inputProtein, setInputProtein] = React.useState("")
    const [inputFat, setInputFat] = React.useState("")
    
    ///////////// Database State & Add Function ///////////// 
    const { foodDbList, addFoodDbList } = useContext(Context)


    const [isLoggedIn, setIsLoggedIn] = useState(false)

    ///////////// Database GET & DELETE ///////////// 

    // useEffect(() => {
    //     Axios.get("http://localhost:3001/users", {id: res.data.id}).then((res) => {
    //         if (res.data.error) {
    //             alert(res.data.error)
    //         } else {
    //             alert(`id:` + id)
    //         }
    //     })
    // })


    const addFoodDb = () => {
        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) {
            alert("You must be logged in");
            return;
        }
        Axios.post('http://localhost:3001/food', {
            name: foodName, 
            protein: Number(inputProtein),  
            carbs: Number(inputCarbs),
            fat: Number(inputFat),
            calories: Number(inputCalPerServ)
        }, 
        
        {
            headers: {
                accessToken: accessToken,
            },
        }
        )
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
                            calories: Number(inputCalPerServ)
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

        if ((isNaN(Number(inputCalPerServ)) || (isNaN(Number(inputServings)) || (isNaN(Number(inputGrams)) || (isNaN(Number(inputCarbs)) || (isNaN(Number(inputFat)) || (isNaN(Number(inputProtein))))))))) {
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

    
    const [isOpen, setIsOpen] = useState(false);

    function toggleModal() {
        setIsOpen(!isOpen)
    }

    const useStyles = ({
        selectStyle: {
          backgroundColor: '',
          color: 'white',
 
        },
    });

    const filledInput = [
        {name: 'Food Name', value: foodName, onChange: (e) => setFoodName(e.target.value)},
        {name: 'Servings', value: inputServings, onChange: (e) => setInputServings(e.target.value)},
        {name: 'Grams',value: inputGrams,onChange: (e) => setInputGrams(e.target.value)},
        {name: 'Calories',value: inputCalPerServ,onChange: (e) => setInputCalPerServ(e.target.value)},

        ///////////Macros//////////
        {name: 'Protein',value: inputProtein,onChange: (e) => setInputProtein(e.target.value)},
        {name: 'Carbs',value: inputCarbs,onChange: (e) => setInputCarbs(e.target.value)},
        {name: 'Fat',value: inputFat,onChange: (e) => setInputFat(e.target.value)},
    ];

    const [addNewFoodState, setAddNewFoodState] = useState(true)
    const [recentlyAddedState, setRecentlyAddedState] = useState(false)
    

    const signUserOut = () => {
        signOut(auth).then(() => {
            localStorage.clear()
            addIsAuth(false)
        })
    }

    useEffect(() => {
        if(localStorage.getItem("accessToken")) { 
            setIsLoggedIn(true)
        } else {
            setIsLoggedIn(false)
        }
    },[isLoggedIn])

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
                                {!isAuth ? <NavLink to="/login"><p>Login</p></NavLink> : <Button onClick={signUserOut}>Sign Out</Button>}
                                {!isAuth ? <NavLink to="/register"><p>Register</p></NavLink> : <NavLink to={`/profile/${id}`}><p>Profile</p></NavLink>}
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
                            <div className="chooser">
                                <div onClick={() => { setAddNewFoodState(true); setRecentlyAddedState(false); }}>
                                    Add New Food
                                </div>
                                <div onClick={() => { setAddNewFoodState(false); setRecentlyAddedState(true); }}>
                                    Recently Added
                                </div>
                            </div>

                            {addNewFoodState && 
                                <div>
                                    <h4>Basic Info</h4>
                                    <div style={{display: 'flex', flexDirection: 'column'}}>
                                    {
                                        filledInput.slice(0, 3).map((el => 
                                            ( 
                                                <FormControl key={el.name} sx={{ m: 0, width: '50%' }} variant="filled">
                                                    <FilledInput
                                                        id="filled-adornment-weight"
                                                        endAdornment={<InputAdornment position="end">per serving</InputAdornment>}
                                                        aria-describedby="filled-weight-helper-text"
                                                        inputProps={{'aria-label': 'weight',}}
                                                        value={el.value}
                                                        onChange={el.onChange}
                                                        />
                                                    <FormHelperText id="filled-weight-helper-text">{el.name}</FormHelperText>
                                                </FormControl>
                                            )
                                        ))
                                    }
                                    </div>


                                    <h4>Macronutrients</h4>
                                    <div style={{display: 'flex', flexDirection: 'column'}}>
                                    {
                                        filledInput.slice(4).map((el => 
                                            (
                                                <FormControl key={el.name} sx={{ m: 0, width: '50%' }} variant="filled">
                                                    <FilledInput
                                                        id="filled-adornment-weight"
                                                        endAdornment={<InputAdornment position="end">per serving</InputAdornment>}
                                                        aria-describedby="filled-weight-helper-text"
                                                        inputProps={{'aria-label': 'weight',}}
                                                        value={el.value}
                                                        onChange={el.onChange}
                                                        />
                                                    <FormHelperText id="filled-weight-helper-text">{el.name}</FormHelperText>
                                                </FormControl>
                                            )
                                        ))
                                    }
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