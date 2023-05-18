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


    ///////////// Database GET & DELETE /////////////
    Axios.get('http://localhost:3001/personal').then((response) => {
        addPersonalDbList(response.data)
    })


    
    return (
        <div className="profile-bar-master-container">
            <span className="small-title-grey">My Profile</span>
            
            <div className="profile-info-master-container">
                <div className="profile-info-container main-typography">
                    <span>Weight</span>
                    <span>
                        {personalDbList.length > 0 && personalDbList[0][0].weight} lbs
                    </span>
                </div>

                <div className="profile-info-container main-typography">
                    <span>Height</span>
                    <span>
                        {personalDbList.length > 0 && personalDbList[0][0].height} cm
                    </span>
                </div>

                <div className="profile-info-container main-typography">
                    <span>Age</span>
                    <span>
                        {personalDbList.length > 0 && personalDbList[0][0].age}
                    </span>
                </div>
                
                {/* <div className="profile-info-container main-typography">
                    <span>
                        TDEE
                    </span>
                    <span>
                        {bodyInfo.length > 0 && bodyInfo[0].age}
                    </span>
                </div>

                <div className="profile-info-container main-typography">
                    <span>
                        BMR
                    </span>
                    <span>
                        {bodyInfo.length > 0 && bodyInfo[0].age}
                    </span>
                </div> */}
                
            </div>




            <hr />

            <div className="goals-master-container">
                <div className="space-between">
                    <span className="small-title-grey">Longterm Goals</span>
                    <span className="small-title-grey">Edit</span>
                </div>
                <div className="goals-sub-container">
                    <div className="goals goal-1 component-subtitle">
                        <span className="goal-title">Goal Weight</span>
                        <div>{personalDbList.length > 0 && personalDbList[0][0].weight}</div>
                    </div>
                    <div className="goals component-subtitle">
                        <span className="goal-title">Bench PR</span>
                        <div>{personalDbList.length > 0 && personalDbList[0][0].weight}</div>
                    </div>
                    <div className="goals component-subtitle">
                        <span className="goal-title">Pull-Up Max</span>
                        <div>{personalDbList.length > 0 && personalDbList[0][0].weight}</div>
                    </div>
                </div>
            </div>


            {/* <Calendar /> */}

            <hr />

            
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