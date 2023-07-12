import React, { useContext, useEffect, useRef, useState } from 'react';
import { useParams } from "react-router-dom";
import {Context} from "../Context/DataContext"
import Axios from "axios"
import foodTable from "../CSS/FoodTable.css"

import add from "../Images/add.png"
import trashIcon from "../Images/delete-icon.png"

export default function FoodTable() {
    
    let { id } = useParams();
    const [food, setFood] = useState([])
    
    ///////////// Input ref /////////////
    const inputRef = useRef(null)
    
    ///////////// Database State Datas /////////////
    const { foodDbList, addFoodDbList } = useContext(Context)
    const {userContext} = useContext(Context)

    ///////////// Database GET & DELETE /////////////
    useEffect(() => {
        Axios.get('http://localhost:3001/food').then((res) => {
            setFood(res.data)
        })
    }, [foodDbList])
    
    const deleteFoodDb = (name) => {
        Axios.delete(`http://localhost:3001/food/${name}`).then(() => {
            setFood(food.filter((val) => {
                return val.name != name;
            }))
        })
    }

    const data = localStorage.getItem('userContext')
    const userContextData = data ? JSON.parse(data) : null;

    return (
        <div className="widget">
            <div className="component-title-container">
                <span className="component-title">Daily Breakdown</span>
            </div>
                <table>
                    <thead >
                        <tr >
                            <th>Food</th>
                            <th>Protein</th>
                            <th>Carbs</th>
                            <th>Fat</th>
                            <th>Grams</th>
                            <th>Servings</th>
                            <th>Calories</th>
                        </tr>
                    </thead>
                    
                    <tbody>
                        {food ? (
                            food
                            .filter((foods) => foods.UserId === userContextData?.id)
                            .map((foods, id) => (
                                <tr key={id}>
                                <td>{foods.name}</td>
                                <td>{foods.protein}</td>
                                <td>{foods.carbs}</td>
                                <td>{foods.fat}</td>
                                <td>{foods.servings}</td>
                                <td>{foods.grams}</td>
                                <td>{/* Placeholder for the missing data */}</td>
                                <td>
                                    <button className="icon-container">
                                    <img
                                        className="trash-icon small-icon"
                                        src={trashIcon}
                                        ref={inputRef}
                                        onClick={() => {
                                        deleteFoodDb(foods.name);
                                        }}
                                    />
                                    </button>
                                </td>
                                </tr>
                            ))
                        ) : null}
                    </tbody>

                </table>
                
                {foodDbList[0] && !foodDbList[0][0] &&(
                    <div>
                        <img className="addimage" src={add} alt="Add food" />
                        <div className="addimage-texts-container">
                            <span className="addImage-header">Ready to see your daily nutrition breakdown?</span>
                            <span className="addImage-subtext">Data submitted from the "Food Log" section will display here.</span>
                        </div>
                    </div>
                )}
        </div>
    )
}