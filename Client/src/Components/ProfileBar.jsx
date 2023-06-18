import React, { useContext, useState, useEffect} from "react"
import {Context} from "../Context/DataContext"
import Axios from 'axios'
// import Calendar from "./Calendar.jsx"
import profilebar from "../CSS/ProfileBar.css"



export default function ProfileBar() {
    
    
    const {bodyInfo} = useContext(Context)
    
    ///////////// Database State Datas /////////////
    const {personalDbList} = useContext(Context)
    const { addPersonalDbList } = useContext(Context)


    const {tdeeDbList} = useContext(Context)
    const { addTdeeDbList } = useContext(Context)

    ///////////// Database GET & DELETE /////////////
    Axios.get('http://localhost:3001/personal').then((response) => {
        addPersonalDbList(response.data)
    })


    Axios.get('http://localhost:3001/tdee').then((response) => {
        addTdeeDbList(response.data)
    })
    
    return (
        <div className="profile-bar-master-container">
            <span className="small-title-grey">My Profile</span>
            
            <div className="profile-info-master-container">
                <div className="profile-info-container main-typography">
                    <span>Age</span>
                    <span>{personalDbList?.[0]?.[0]?.age || ''}</span>
                </div>
                <div className="profile-info-container main-typography">
                    <span>Height</span>
                    <span>{personalDbList?.[0]?.[0]?.height || ''} in</span>
                </div>
                <hr />
                <div className="profile-info-container main-typography">
                    <span>Current Weight</span>
                    <span>{personalDbList?.[0]?.[0]?.weight || ''} lbs</span>
                </div>
                <div className="profile-info-container main-typography">
                    <span>Goal Weight</span>
                    <span>{personalDbList?.[0]?.[0]?.goalWeight || ''} lbs</span>
                </div>
                <div className="profile-info-container main-typography">
                    <span>Remaining Weight</span>
                    <span>{personalDbList?.[0]?.[0]?.weight - personalDbList?.[0]?.[0]?.goalWeight || ''} lbs</span>
                </div>
                <hr />
                
                <div className="profile-info-container main-typography">
                    <span>TDEE</span>
                    <span>{personalDbList?.[0]?.[0]?.tdeeDb} cal</span>
                </div>
                <div className="profile-info-container main-typography">
                    <span>BMR</span>
                    <span>{personalDbList?.[0]?.[0]?.bmrDb} cal</span>
                </div>
                


                <div className="profile-info-container main-typography">
                    <span>Goals</span>
                    <span>{personalDbList?.[0]?.[0]?.fitnessGoal[0].toUpperCase() + personalDbList?.[0]?.[0]?.fitnessGoal.slice(1)}</span>
                </div>

                <hr />

            </div>


            


        

            <div className="checkbox-master-container">
                
                <span className="small-title-grey">Everyday Reminders</span>
                <span>Did you..</span>

                <ul className="checkbox main-typography">
                    <li>
                        <label className="" htmlFor="">
                            <input type="checkbox"/> Go to the gym?
                        </label>
                    </li>


                    <li>
                        <label className="" htmlFor="">
                            <input type="checkbox"/> Drink enough water?
                        </label> 
                    </li>


                    <li>
                        <label className="" htmlFor="">
                            <input type="checkbox"/> Sleep enough?
                        </label>
                    </li>
                </ul>

            </div>
        </div>
    )
}