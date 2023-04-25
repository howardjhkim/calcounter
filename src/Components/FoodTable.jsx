import React, { useContext } from 'react';
import {Context} from "../Context/DataContext"


export default function FoodTable() {    
    const { foodList } = useContext(Context)
    return (
        
        
        
        <div className="component-container">
            
            <div className="component-title-container">
                <span className="component-title">Daily Breakdown</span>
            </div>
            
            <div className="widget ">
                <table>
                    <thead>
                        <tr>
                            <th>Food</th>
                            <th>Servings</th>
                            <th>Grams</th>
                            <th>Carbs</th>
                            <th>Protein</th>
                            <th>Total Calories</th>
                        </tr>
                    </thead>
                    <tbody>
                        {foodList.map((food, index) => (
                        <tr key={index}>
                            <td>{food.food}</td>
                            <td>{food.servings}</td>
                            <td>{food.grams}</td>
                            <td>{food.carbs}</td>
                            <td>{food.protein}</td>
                            <td>{}</td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}