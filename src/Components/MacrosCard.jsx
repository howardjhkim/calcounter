import React, { useContext, useState, useEffect} from "react"
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
    

    
    
    // tdeeMacros[0].cut.protein
    
    // Progress bar 
    

    let proteinProgress = 0;
    
    if(tdeeMacros.length > 0) {
        proteinProgress = (macros.protein / tdeeMacros[0].cut.protein) * 100
    }
    
    console.log(proteinProgress)
    
    
    
    
    // const [progressValue, setProgressValue] = useState(0);

    // let progressEndValue = macros,
    //     speed = 10000;
        
    // useEffect(() => {
    //     const progress = setInterval(() => {
    //         setProgressValue((prevValue) => {
    //         const nextValue = prevValue + 1;
    //         if (nextValue >= progressEndValue) {
    //             clearInterval(progress);
    //         }
    //         return nextValue;
    //         });
    //     }, speed);
    //     return () => clearInterval(progress);
    //     }, []);
    





    
    return (
        
        <div className="component-container">
            <div className="component-title-container">
                <span className="component-title">Today's Milestone</span>
                <span className="component-subtitle">Here's the breakdown of macronutrients you consumed today:</span>              
            </div>
            
            <div className="macros-card-grid">
                <div className="widget card-1">
                    <div className="macro-name-with-icon-container">
                        <span className="macros-card-macro-name">Protein</span>
                        <img className="small-icon" src={proteinIcon}/>
                    </div>

                    <div className="suggested-consumed-master-container">
                        <div className="suggested-consumed-sub-container">
                            <span>Consumed</span>
                            <span className="macro-counter">
                                {macros.protein ? macros.protein : 0}
                            </span>
                        </div>

                        <div className="suggested-consumed-sub-container">
                            <span>Suggested</span>
                            <span className="macro-counter">
                                {tdeeMacros.length > 0 ? tdeeMacros[0].cut.protein : 0}
                            </span>
                        </div>
                    </div>

                    <div className="macros-card-progressbar-container">
                        <div className="linear-progress"
                        style={{"width": `${proteinProgress}100%`}}
                        >

                        </div>

                        <div>

                        </div>
                    </div>

                </div>
                
                <div className="widget card-2">
                    <div className="macro-name-with-icon-container">
                        <span className="macros-card-macro-name">Carbs</span>
                        <img className="small-icon" src={carbIcon}/>
                    </div>
                    <span className="macro-counter">
                        {macros.carbs ? macros.carbs : 0} / {tdeeMacros.length > 0 ? tdeeMacros[0].cut.carbs : 0}
                    </span>
                </div>
                
                <div className="widget card-3">
                    <div className="macro-name-with-icon-container">
                        <span className="macros-card-macro-name">Fats</span>
                        <img className="small-icon" src={fatsIcon}/>
                    </div>
                    <span className="macro-counter">
                        {macros.fats ? macros.fats : 0} / {tdeeMacros.length > 0 ? tdeeMacros[0].cut.fats : 0}
                    </span>
                </div>
                
                <div className="widget card-4">
                    <div className="macro-name-with-icon-container">
                        <span className="macros-card-macro-name">Calories</span>
                        <img className="small-icon" src={caloriesIcon}/>
                    </div>
                    <span className="macro-counter">{macros.calories ? macros.calories : 0} / 100</span>
                </div>         
            </div>
        </div>
    )
}