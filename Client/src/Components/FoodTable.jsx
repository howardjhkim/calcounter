import React, { useContext, useEffect, useRef, useState } from 'react';
import {Context} from "../Context/DataContext"
import Axios from "axios"
import trashIcon from "../Images/delete-icon.png"
import add from "../Images/add.png"
import foodTable from "../CSS/FoodTable.css"

export default function FoodTable() {
    ///////////// Input ref /////////////
    const inputRef = useRef(null)
    

    ///////////// Database State Datas /////////////
    const { foodDbList } = useContext(Context)
    const { addFoodDbList } = useContext(Context)
    

    ///////////// Database GET & DELETE /////////////
    Axios.get('http://localhost:3001/food').then((response) => {
        addFoodDbList(response.data)
    })
    
    const deleteFoodDb = (food) => {
        Axios.delete(`http://localhost:3001/delete/${food}`)
    }


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
                        {foodDbList[0] ? (
                            foodDbList[0].map((food, id) => (
                            <tr key={id}>
                                <td>{food.name}</td>
                                <td>{food.protein}</td>
                                <td>{food.carbs}</td>
                                <td>{food.fat}</td>
                                <td>{food.servings}</td>
                                <td>{food.grams}</td>
                                <td>{/* Placeholder for the missing data */}</td>
                                <td>
                                    <button className="icon-container">
                                        <img
                                        className="trash-icon small-icon"
                                        src={trashIcon}
                                        ref={inputRef}
                                        onClick={() => {deleteFoodDb(food.name)}}
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