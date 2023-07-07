import React, { useContext, useState, useEffect} from "react"
import {Context} from "../Context/DataContext"
import Axios from 'axios'
// import Calendar from "./Calendar.jsx"
import profilebar from "../CSS/ProfileBar.css"



export default function ProfileBar() {
    

    const {userContext} = useContext(Context)
    const data = localStorage.getItem('userContext')
    const userContextData = data ? JSON.parse(data) : null;
    
    const {bodyInfo} = useContext(Context)
    
    ///////////// Database State Datas /////////////
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


    
    
    
    useEffect(() => {
        console.log(personalDbList?.[0]?.filter((el)=> el.UserId===1))
        console.log("filtered: " + filtered)
        console.log(filtered)
    })

    const filtered = personalDbList?.[0]?.filter((el) => el.UserId === userContextData?.id)
    
    const obj = [
        {name: "Age", title: `${filtered?.[0].age}`},
        {name: "Height", title: `${filtered?.[0].height} cm`},
        {name: "Current Weight", title: `${filtered?.[0].weight} lbs`},
        {name: "Goal Weight", title: `${filtered?.[0].goalWeight} lbs`},
        {name: "Remaining Weight", title: `${filtered?.[0].weight-filtered?.[0].goalWeight} lbs`},
        {name: "TDEE", title: `${filtered?.[0].tdeeDb} cal`},
        {name: "BMR", title: `${filtered?.[0].bmrDb} cal`},
        {name: "Goals", title: `${filtered?.[0].fitnessGoal} weight`}
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