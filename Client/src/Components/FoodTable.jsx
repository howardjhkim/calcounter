import React, { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import {Context} from "../Context/DataContext"
import Axios from "axios"
import foodTable from "../CSS/FoodTable.css"

import add from "../Images/add.png"
import trashIcon from "../Images/delete-icon.png"

export default function FoodTable() {
    const [food, setFood] = useState([])
    const navigate = useNavigate()
    ///////////// Checks if user is logged /////////////
    const {userContext} = useContext(Context)
    const data = localStorage.getItem('userContext')
    const userContextData = data ? JSON.parse(data) : null;
    const id = userContextData?.id

    
    ///////////// Input ref /////////////
    const inputRef = useRef(null)
    
    ///////////// Database State Datas /////////////
    const { foodDbList, addFoodDbList } = useContext(Context)
    
    ///////////// Database GET & DELETE /////////////
    useEffect(() => {
        Axios.get(`https://calcounter-b4bd1e148395.herokuapp.com/food/getById/${id}`).then((res) => {
            setFood(res.data)
        })
        console.log("test")
    }, [foodDbList, food])
    
    const deleteFoodDb = (foodId) => {
        Axios.delete(`https://calcounter-b4bd1e148395.herokuapp.com/food/${foodId}`).then(() => {
            setFood(food.filter((val) => {
                return val.id != foodId;
            }))
        })
        addFoodDbList(food.filter((val) => {
            return val.id != foodId;
        }))

        navigate("/")
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
                            <th>Calories</th>
                        </tr>
                    </thead>
                    
                    <tbody>
                        {food ? (
                            food.map((foods, id) => (
                                <tr key={id}>
                                <td>{foods.name}</td>
                                <td>{foods.protein} g</td>
                                <td>{foods.carbs} g</td>
                                <td>{foods.fat} g</td>
                                <td>{foods.calories} cal</td>
                                <td>
                                    <button className="icon-container">
                                        <img
                                            className="trash-icon small-icon"
                                            src={trashIcon}
                                            ref={inputRef}
                                            onClick={() => {
                                            deleteFoodDb(foods.id);
                                            }}
                                        />
                                    </button>
                                </td>
                                </tr>
                            ))
                        ) : null}
                    </tbody>

                </table>
                
                {food.length === 0 && (
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