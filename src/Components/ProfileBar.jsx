import React, { useContext, useState, useEffect} from "react"
import {NavLink} from "react-router-dom"
import {Context} from "../Context/DataContext"




import profilePicture from "../Images/profile-picture.png"

export default function ProfileBar() {
    
    
    const { tdeeMacros } = useContext(Context)

    
    
    
    
    
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
                        <span>76</span>
                        <span>Weight</span>
                    </div>
                    <hr></hr>
                    <div className="weight-height-age-sub-container">
                        <span>76</span>
                        <span>Height</span>
                    </div>
                    <hr></hr>
                    <div className="weight-height-age-sub-container">
                        <span>76</span>
                        <span>Age</span>
                    </div>
                </div>
            </div>

            <div className="goals-master-container">
                <span>Longterm Goals</span>
                <div className="goals-sub-container">
                    <div className="goals goal-1">Goal</div>
                    <div className="goals goal-2">Goal</div>
                    <div className="goals goal-3">Goal</div>
                </div>
            </div>
        </div>
    )
}