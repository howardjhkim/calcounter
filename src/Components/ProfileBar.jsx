import React, { useContext, useState, useEffect} from "react"
import {NavLink} from "react-router-dom"
import {Context} from "../Context/DataContext"

import Calendar from "./Calendar.jsx"


import profilePicture from "../Images/profile-picture.png"

export default function ProfileBar() {
    
    
    const { tdeeMacros } = useContext(Context)
    const {bodyInfo} = useContext(Context)
    console.log(bodyInfo)


    
    return (
        <div className="profile-bar-master-container">
            <div className="profile-and-settings-container">
                <span>My Profile</span>
            </div>

            <div className="profilepic-name-and-info-container">
                <img className="profilepic-img" src={profilePicture} />
                <span>Howard Kim</span>
                
                <div className="weight-height-age-master-container">
                    <div className="weight-height-age-sub-container">
                        <span>{bodyInfo.length > 0 && bodyInfo[0].weight}</span>
                        <span className="component-subtitle">Weight</span>
                    </div>
                    <hr></hr>
                    <div className="weight-height-age-sub-container">
                        <span>{bodyInfo.length > 0 && bodyInfo[0].height}</span>
                        <span className="component-subtitle">Height</span>
                    </div>
                    <hr></hr>

                    
                    <div className="weight-height-age-sub-container">
                        <span>{bodyInfo.length > 0 && bodyInfo[0].age}</span>
                        <span className="component-subtitle">Age</span>
                    </div>
                </div>
            </div>

            <div className="goals-master-container">
                <span>Longterm Goals</span>
                <div className="goals-sub-container">
                    <div className="goals goal-1 component-subtitle">
                        <span className="goal-title">Goal Weight</span>
                        <div>{bodyInfo.length > 0 && bodyInfo[0].goalWeight}</div>
                    </div>
                    <div className="goals component-subtitle">
                        <span className="goal-title">Goal Weight</span>
                    </div>
                    <div className="goals component-subtitle">
                        <span className="goal-title">Goal Weight</span>
                    </div>
                </div>
            </div>


            <Calendar />
        </div>
    )
}