import React, { useContext, useState, useEffect} from "react"
import {Context} from "../Context/DataContext"
import Axios from 'axios'
import profile from "../CSS/Profile.css"





export default function Profile() {
    
    
    const {personalDbList} = useContext(Context)
    const { addPersonalDbList } = useContext(Context)


    const {tdeeDbList} = useContext(Context)
    const { addTdeeDbList } = useContext(Context)

    ///////////// Database GET & DELETE /////////////
    
    useEffect(() => {
        Axios.get('http://localhost:3001/personal').then((response) => {
            addPersonalDbList(response.data)
        })
    
    
        Axios.get('http://localhost:3001/tdee').then((response) => {
            addTdeeDbList(response.data)
        })
    }, [])
    
    
    
    
    return (
        <div className="profile-page-grid">
            <div className="outside-component-title-container">
                <p className="outside-component-title">Profile</p>
            </div>
            <div className="widget">
                <div className="profile-master-container">
                    <div className="info-container-row">
                        <span>Age</span>
                        <p>{personalDbList?.[0]?.[0]?.age || ''}</p>
                    </div>
                    <div className="info-container-row">
                        <span>Height</span>
                        <p>{personalDbList?.[0]?.[0]?.height || ''}</p>
                    </div>
                    <div className="info-container-row">
                        <span>Current Weight</span>
                        <p>{personalDbList?.[0]?.[0]?.weight || ''} lbs</p>
                    </div>
                    <div className="info-container-row">
                        <span>Goal Weight</span>
                        <p>{personalDbList?.[0]?.[0]?.goalWeight || ''} lbs</p>
                    </div>
                    <div className="info-container-row">
                        <span>Remaining Weight</span>
                        <p>{personalDbList?.[0]?.[0]?.weight - personalDbList?.[0]?.[0]?.goalWeight || ''} lbs</p>
                    </div>
                    <div className="info-container-row">
                        <span>TDEE</span>
                        <p>{personalDbList?.[0]?.[0]?.tdeeDb} Cal</p>
                    </div>
                    <div className="info-container-row">
                        <span>BMR</span>
                        <p>{personalDbList?.[0]?.[0]?.bmrDb || ''} Cal</p>
                    </div>
                    <div className="info-container-row">
                        <span>Goal</span>
                        <p>{personalDbList?.[0]?.[0]?.fitnessGoal[0].toUpperCase() + personalDbList?.[0]?.[0]?.fitnessGoal.slice(1) || ''}</p>
                    </div>
                </div>
            </div>
            
            
        </div>
    )
}

