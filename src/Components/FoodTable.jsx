import React, { useContext, useRef } from 'react';
import {Context} from "../Context/DataContext"

import trashIcon from "../Images/delete-icon.png"
import { ReactComponent as Add } from "../Images/add.svg"
import add from "../Images/add.png"

export default function FoodTable() {    
    const { foodList } = useContext(Context)
    const { updateFood } = useContext(Context)


    const inputRef = useRef(null)

    
    function deleteFood(e, foodId) {
        e.stopPropagation()
        
        const filtered = foodList.filter(el => el.id !== foodId)
        updateFood(filtered)
    }


    console.log(foodList)

    return (
        <div className="widget">
            <div className="component-title-container">
                <span className="component-title">Daily Breakdown</span>
            </div>
                <table>
                    <thead >
                        <tr >
                            <th>Food</th>
                            <th>Servings</th>
                            <th>Grams</th>
                            <th>Carbs</th>
                            <th>Fat</th>
                            <th>Protein</th>
                            <th>Total Calories</th>
                        </tr>
                    </thead>
                    
                    <tbody>
                        {foodList.length ? (
                            foodList.map((food, index) => (
                            <tr key={index}>
                                <td>{food.food}</td>
                                <td>{food.servings}</td>
                                <td>{food.grams}</td>
                                <td>{food.carbs}</td>
                                <td>{food.fat}</td>
                                <td>{food.protein}</td>
                                <td>{/* Placeholder for the missing data */}</td>
                                <td>
                                <div className="icon-container">
                                    <img
                                    className="trash-icon small-icon"
                                    src={trashIcon}
                                    ref={inputRef}
                                    onClick={(e) => deleteFood(e, food.id)}
                                    />
                                </div>
                                </td>
                            </tr>
                            ))
                        ) : null}
                    </tbody>
                </table>
                
                {!foodList.length && (
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