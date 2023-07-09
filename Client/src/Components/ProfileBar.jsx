import React, { useContext, useState, useEffect} from "react"
import {Context} from "../Context/DataContext"
import Axios from 'axios'
import profilebar from "../CSS/ProfileBar.css"



export default function ProfileBar() {
    
    ///////////// Checks if user is logged /////////////
    const {userContext} = useContext(Context)
    const data = localStorage.getItem('userContext')
    const userContextData = data ? JSON.parse(data) : null;
    const id = userContextData?.id
    
    ///////////// Database State Datas /////////////
    const {personalDbList, addPersonalDbList, tdeeDbList, addTdeeDbList} = useContext(Context)


    ///////////// Database GET & DELETE /////////////
    useEffect(() => {
        Axios.get(`http://localhost:3001/personal/getById/${id}`).then((response) => {
            addPersonalDbList(response.data)
        })
    
        Axios.get(`http://localhost:3001/tdee/getById/${id}`).then((res) => {
            addTdeeDbList(res.data)
        })
    }, [])


    const filtered = personalDbList?.[0]?.filter((el) => el.UserId === userContextData?.id)
    
    const obj = [
        {name: "Age", title: `${filtered?.[0]?.age || "-"}`},
        {name: "Height", title: `${filtered?.[0]?.height || ""} cm`},
        {name: "Current Weight", title: `${filtered?.[0]?.weight || ""} lbs`},
        {name: "Goal Weight", title: `${filtered?.[0]?.goalWeight || ""} lbs`},
        {name: "Remaining Weight", title: `${filtered?.[0]?.weight-filtered?.[0]?.goalWeight || ""} lbs`},
        {name: "TDEE", title: `${filtered?.[0]?.tdeeDb || ""} cal`},
        {name: "BMR", title: `${filtered?.[0]?.bmrDb || ""} cal`},
        {name: "Goals", title: `${filtered?.[0]?.fitnessGoal || ""} weight`}
    ]


    


    return (
        <div className="profile-bar-master-container">
            <span className="small-title-grey">My Profile</span>
            {filtered ? (
                obj.map((el, id) => (
                    <React.Fragment key={id}>
                        <div className="profile-info-container main-typography">
                            <span>{el.name}</span>
                            <span>{el.title}</span>
                        </div>
                        {(id + 1) % 3 === 0 && id !== obj.length - 1 && <hr />} {/* Insert <hr> after every 3 elements */}
                </React.Fragment>
                ))
            ) : null}
        </div>
    )
}