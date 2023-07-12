import React, { useContext, useState, useEffect} from "react"
import {useParams} from "react-router-dom"
import {Context} from "../Context/DataContext"
import Axios from 'axios'
import profile from "../CSS/Profile.css"

export default function Profile() {
    
    ///////////// Checks if user is logged /////////////
    const {userContext} = useContext(Context)
    const data = localStorage.getItem('userContext')
    const userContextData = data ? JSON.parse(data) : null;
    const id = userContextData?.id
    
    ////////////// Other data/state /////////////
    const {personalDbList, addPersonalDbList, tdeeDbList, addTdeeDbList} = useContext(Context)
    const [username, setUsername] = useState("")

    ///////////// Database GET & DELETE /////////////
    useEffect(() => {
        Axios.get(`http://localhost:3001/personal/getById/${id}`).then((res) => {
            addPersonalDbList(res.data)
        })
    
        Axios.get(`http://localhost:3001/tdee/getById/${id}`).then((res) => {
            addTdeeDbList(res.data)
        })
        
        if (data) {
            Axios.get(`http://localhost:3001/users/basicinfo/${id}`).then((response) => {
                setUsername(response.data.username)
            })
        }
    }, [])
    
    return (
        <div className="profile-page-grid">
            <div className="outside-component-title-container welcome-text">
                <p className="outside-component-title">Profile</p>
                <p>Welcome back, {username || ""}!</p>
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

