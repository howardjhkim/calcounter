import React, { useContext, useState, useEffect, useRef} from "react"
import {Context} from "../Context/DataContext"

import proteinIcon from "../Images/protein-icon.png"
import carbIcon from "../Images/carb-icon.png"
import fatsIcon from "../Images/fats-icon.png"
import caloriesIcon from "../Images/calories-icon.png"


export default function MacrosCard() {
    
    const { tdeeMacros } = useContext(Context)
    const { foodList } = useContext(Context)
    
    let protein = foodList.reduce((acc, curr) => acc + curr.protein, 0)
    let carbs = foodList.reduce((acc, curr) => acc + curr.carbs, 0)
    let fats = foodList.reduce((acc, curr) => acc + curr.fats, 0)    
    
    let macros = {
        protein: protein,
        carbs: carbs,
        fats: fats
    }        
    

    if(tdeeMacros.length > 0) {
        console.log(tdeeMacros[0].cut.protein)
    }
    
    return (
        <div className="component-container">
            <div className="component-title-container">
                <span className="component-title">Today's Milestone</span>
                <span className="component-subtitle">Here's the breakdown of macronutrients you consumed today:</span>              
            </div>
            
            <div className="multi-columns macros-card-container ">
                
                <div className="widget four-columns card-1-color">
                    <div className="small-icon-with-title">
                        <img className="small-icon" src={proteinIcon}/>
                        <div>Protein</div>
                    </div>
                    <span className="macro-counter">
                        {macros.protein ? macros.protein : 0} / {tdeeMacros.length > 0 ? tdeeMacros[0].cut.protein : 0}
                    </span>
                </div>
                
                <div className="widget four-columns card-2-color">
                    <div className="small-icon-with-title">
                        <img className="small-icon" src={carbIcon}/>
                        <div>Carbs</div>
                    </div>
                    <span className="macro-counter">
                        {macros.carbs ? macros.carbs : 0} / {tdeeMacros.length > 0 ? tdeeMacros[0].cut.carbs : 0}
                    </span>
                </div>
                
                <div className="widget four-columns card-3-color">
                    <div className="small-icon-with-title">
                        <img className="small-icon" src={fatsIcon}/>
                        <div>Fats</div>
                    </div>
                    <span className="macro-counter">
                        {macros.fats ? macros.fats : 0} / {tdeeMacros.length > 0 ? tdeeMacros[0].cut.fats : 0}
                    </span>
                </div>
                
                <div className="widget four-columns card-4-color">
                    <div className="small-icon-with-title">
                        <img className="small-icon" src={caloriesIcon}/>
                        <div>Calories</div>
                    </div>
                    <span className="macro-counter">{macros.calories ? macros.calories : 0} / 100</span>
                </div>         
            </div>
        </div>
    )
}