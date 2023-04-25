import React, { useContext, useState, useEffect, useRef} from "react"
import {Context} from "../Context/DataContext"

// import {Context} from "../Context/DataContext"



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
    
    
    // console.log(tdeeMacros)
    
    // console.log("bs " + tdeeMacros.cut)
    if(tdeeMacros.length > 0) {
        console.log(tdeeMacros[0].cut.protein)
    }
    
    return (
        <div className="component-container">
            <div className="component-title-container">
                <span className="component-title">Today's Milestone</span>
                <span className="component-subtitle">Here's the breakdown of macronutrients you consumed today:</span>              
            </div>
            
            <div className="multi-columns macros-card-container">
                <div className="widget four-columns">
                    <div className="small-icon-with-title">
                        <img className="small-icons" src="./Images/protein.png"/>
                        <div>Protein</div>
                    </div>
                    <span className="macro-counter">
                        {macros.protein ? macros.protein : 0} / {tdeeMacros.length > 0 ? tdeeMacros[0].cut.protein : 0}
                    </span>
                </div>
                
                <div className="widget four-columns">
                    <div className="small-icon-with-title">
                        <img className="small-icons" src="./Images/bread.png"/>
                        <div>Carbs</div>
                    </div>
                    <span className="macro-counter">
                        {macros.carbs ? macros.carbs : 0} / {tdeeMacros.length > 0 ? tdeeMacros[0].cut.carbs : 0}
                    </span>
                </div>
                
                <div className="widget four-columns">
                    <div className="small-icon-with-title">
                        <img className="small-icons" src="./Images/fats.png"/>
                        <div>Fats</div>
                    </div>
                    <span className="macro-counter">
                        {macros.fats ? macros.fats : 0} / {tdeeMacros.length > 0 ? tdeeMacros[0].cut.fats : 0}
                    </span>
                </div>
                
                <div className="widget four-columns">
                    <div className="small-icon-with-title">
                        <img className="small-icons" src="./Images/calculator.png"/>
                        <div>Calories</div>
                    </div>
                    <span className="macro-counter">{macros.calories ? macros.calories : 0} / 100</span>
                </div>         
            </div>
        </div>
    )
}