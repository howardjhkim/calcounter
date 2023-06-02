import React, { useContext, useState, useEffect} from "react"
import {Context} from "../Context/DataContext"

import carbIcon from "../Images/carbIcon.svg"
import fatsIcon from "../Images/fatIcon.svg"
import caloriesIcon from "../Images/caloriesIcon.svg"
import meatIcon from "../Images/meatIcon.svg"
import Axios from 'axios'

import macroscard from "../CSS/MacrosCard.css"


export default function MacrosCard() {
    
    ///////////// Database State Datas /////////////
    const { foodDbList } = useContext(Context)
    const { addFoodDbList } = useContext(Context)

    const {tdeeDbList} = useContext(Context)
    const { addTdeeDbList } = useContext(Context)


    const {personalDbList} = useContext(Context)
    const { addPersonalDbList } = useContext(Context)





    ///////////// Database GET & DELETE /////////////
    Axios.get('http://localhost:3001/tdee').then((response) => {
        addTdeeDbList(response.data)
    })



    Axios.get('http://localhost:3001/personal').then((response) => {
        addPersonalDbList(response.data)
    })


    ///////////// Initial macros values /////////////
    let protein = 0;
    let carbs = 0;
    let fat = 0;
    let calories = 0;

        
    ///////////// Accumulate total macros if food has been submitted /////////////
    if (foodDbList[0]) {
        protein = foodDbList[0].reduce((acc, curr) => acc + curr.protein, protein);
        carbs = foodDbList[0].reduce((acc, curr) => acc + curr.carbs, carbs);
        fat = foodDbList[0].reduce((acc, curr) => acc + curr.fat, fat);
        calories = foodDbList[0].reduce((acc, curr) => acc + curr.calories, calories);
    }

        
    ///////////// Initial macros percentage values /////////////
    let proteinCurrPercentage = 0;
    let carbsCurrPercentage = 0;
    let fatCurrPercentage = 0;
    let caloriesCurrPercentage = 0;
   

    ///////////// Calculates the macros percentage if TDEE AND food has been submitted /////////////
    if (foodDbList[0] && tdeeDbList[0]?.[0]) {
        proteinCurrPercentage = Math.floor(((protein / tdeeDbList[0][0].cutProtein) * 100))
        carbsCurrPercentage = Math.floor(((carbs / tdeeDbList[0][0].cutCarbs) * 100))
        fatCurrPercentage = Math.floor(((fat / tdeeDbList[0][0].cutFat) * 100))
        caloriesCurrPercentage = Math.floor(((fat / tdeeDbList[0][0].cutCalories) * 100))
    }
    
       
    ///////////// State used to graphically display progress bar increment/decrements /////////////
    const [macroPercent, setMacroPercent] = useState({
        protein: 0,
        carbs: 0,
        fat: 0,
        calories: 0
    })
    
    
    ///////////// Progressbar function /////////////
    const useProgressBar = (macroName, endValue, setMacroPercent) => {
        let speed = 12;
        useEffect(() => {
            const progress = setInterval(() => {
                
                if (endValue > macroPercent[macroName]) {
                    setMacroPercent((prevValue) => {
                        const nextValue = prevValue[macroName] + 1;                        
                        if (nextValue === endValue) {
                            clearInterval(progress);
                        };
                        
                        return {
                            ...prevValue,
                            [macroName]: nextValue
                        };
                    });
                } else if (endValue < macroPercent[macroName]) {
                    setMacroPercent((prevValue) => {
                        const nextValue = prevValue[macroName] - 1;                        
                        if (nextValue === endValue) {
                            clearInterval(progress);
                        };
                        
                        return {
                            ...prevValue,
                            [macroName]: nextValue
                        };
                    });
                }  
            }, speed);
            return () => clearInterval(progress);
        }, [endValue]);
    }

    useProgressBar("protein", proteinCurrPercentage, setMacroPercent);
    useProgressBar("carbs", carbsCurrPercentage, setMacroPercent);
    useProgressBar("fat", fatCurrPercentage, setMacroPercent);
    useProgressBar("calories", caloriesCurrPercentage, setMacroPercent);


    return (

        <div className="macros-card-grid">
            <div className="card-1">
                <div className="macro-name-with-icon-container">
                    <span className="macros-card-macro-name">Protein</span>
                    <img className="macroscard-icon card-1-icon-bg" src={meatIcon}/>
                </div>

                <div className="suggested-consumed-master-container">
                    <div className="suggested-consumed-sub-container">
                        <span className="consumed-suggested-text">Consumed</span>
                        <span className="macro-counter">
                            {protein ? protein : 0}
                        </span>
                    </div>

                    <div className="suggested-consumed-sub-container">
                        <span className="consumed-suggested-text">Suggested</span>
                        <span className="macro-counter">
                            {/* {tdeeMacros.length > 0 ? tdeeMacros[0].cut.protein : 0} */}
                            {tdeeDbList?.[0]?.[0]?.[`${personalDbList[0][0].fitnessGoal}Protein`] || 0}
                            {/* {tdeeDbList.length > 0 ? tdeeDbList[0][0].cutProtein : 0} */}
                        </span>
                    </div>
                </div>

                <div className="macros-card-progressbar-container">
                    <div className="progress-container">
                        <div 
                            className="linear-progress"
                            style={{
                                "width":`${
                                    macroPercent.protein > 100 ? 100 : 
                                    macroPercent.protein === 0 ? 0 : 
                                    macroPercent.protein }%`, 
                                "background": `#F6D4D4`,
                                }}
                        >
                        </div>
                        <span className="percentage">
                            {macroPercent.protein > 0 ? `${macroPercent.protein} %` : `0 %`}
                        </span>
                    </div>
                </div>
            </div>
            
            <div className="card-2">
                <div className="macro-name-with-icon-container">
                    <span className="macros-card-macro-name">Carbs</span>
                    <img className="macroscard-icon card-2-icon-bg" src={carbIcon}/>
                </div>
                <div className="suggested-consumed-master-container">
                    <div className="suggested-consumed-sub-container">
                        <span className="consumed-suggested-text">Consumed</span>
                        <span className="macro-counter">
                            {carbs ? carbs : 0}
                        </span>
                    </div>

                    <div className="suggested-consumed-sub-container">
                        <span className="consumed-suggested-text">Suggested</span>
                        <span className="macro-counter">
                            {/* {tdeeMacros.length > 0 ? tdeeMacros[0].cut.carbs : 0} */}
                            {tdeeDbList?.[0]?.[0]?.[`${personalDbList[0][0].fitnessGoal}Carbs`] || 0}
                        </span>
                    </div>
                </div>

                <div className="macros-card-progressbar-container">
                    <div className="progress-container">
                        <div 
                            className="linear-progress"
                            style={{"width": `${
                                macroPercent.carbs > 100 ? 100 : 
                                macroPercent.carbs === 0 ? 0 : 
                                macroPercent.carbs 
                            }%`, "background": `#F2DBB9`}}
                        >
                        </div>
                        <span className="percentage">
                            {macroPercent.carbs > 0 ? `${macroPercent.carbs} %` : `0 %`}
                        </span>
                    </div>
                </div>
            </div>
            
            <div className="card-3">
                <div className="macro-name-with-icon-container">
                    <span className="macros-card-macro-name">Fat</span>
                    <img className="macroscard-icon card-3-icon-bg" src={fatsIcon}/>
                </div>
                <div className="suggested-consumed-master-container">
                    <div className="suggested-consumed-sub-container">
                        <span className="consumed-suggested-text">Consumed</span>
                        <span className="macro-counter">
                            {fat ? fat : 0}
                        </span>
                    </div>

                    <div className="suggested-consumed-sub-container">
                        <span className="consumed-suggested-text">Suggested</span>
                        <span className="macro-counter">
                            {/* {tdeeMacros.length > 0 ? tdeeMacros[0].cut.fat : 0} */}
                            {tdeeDbList?.[0]?.[0]?.[`${personalDbList[0][0].fitnessGoal}Fat`] || 0}
                        </span>
                    </div>
                </div>

                <div className="macros-card-progressbar-container">
                    <div className="progress-container">
                        <div 
                            className="linear-progress"
                            style={{"width": `${
                                macroPercent.fat > 100 ? 100 : 
                                macroPercent.fat === 0 ? 0 : 
                                macroPercent.fat 
                            }%`, "background": `#7CBF85`}}
                        >
                        </div>
                        <span className="percentage">
                            {macroPercent.fat > 0 ? `${macroPercent.fat} %` : `0 %`}
                        </span>
                    </div>
                </div>
            </div>
            
            <div className="card-4">
                <div className="macro-name-with-icon-container">
                    <span className="macros-card-macro-name">Calories</span>
                    <img className="macroscard-icon card-4-icon-bg" src={caloriesIcon}/>
                </div>
                <div className="suggested-consumed-master-container">
                    <div className="suggested-consumed-sub-container">
                        <span className="consumed-suggested-text">Consumed</span>
                        <span className="macro-counter">
                            {calories ? calories : 0}
                        </span>
                    </div>

                    <div className="suggested-consumed-sub-container">
                        <span className="consumed-suggested-text">Suggested</span>
                        <span className="macro-counter">
                            {/* {tdeeMacros.length > 0 ? tdeeMacros[0].cut.calories : 0} */}
                            {tdeeDbList?.[0]?.[0]?.[`${personalDbList[0][0].fitnessGoal}Calories`] || 0}
                        </span>
                    </div>
                </div>

                <div className="macros-card-progressbar-container">
                    <div className="progress-container">
                        <div 
                            className="linear-progress"
                            style={{"width": `${
                                macroPercent.calories > 100 ? 100 : 
                                macroPercent.calories === 0 ? 0 : 
                                macroPercent.calories 
                            }%`, "background": `#8BAEC1`}}>
                        </div>
                        <span className="percentage">
                            {macroPercent.calories > 0 ? `${macroPercent.calories} %` : `0 %`}
                        </span>
                    </div>
                </div>
            </div>         
        </div>

    )
}