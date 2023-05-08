import React, { useContext, useState, useEffect} from "react"
import {Context} from "../Context/DataContext"



import proteinIcon from "../Images/protein-icon.png"
import carbIcon from "../Images/carb-icon.png"
import fatsIcon from "../Images/fats-icon.png"
import caloriesIcon from "../Images/calories-icon.png"


export default function MacrosCard() {
    
    /***************************************************
                pull data from useContext
    ***************************************************/  
    const { tdeeMacros } = useContext(Context) //suggested macros from body info
    const { foodList } = useContext(Context) // list of all foods inputed from home page
    

    // food list destructured and each macro is accumulated
    const { protein, carbs, fats, calories } = foodList.reduce(
        (acc, curr) => ({
          protein: acc.protein + curr.protein,
          carbs: acc.carbs + curr.carbs,
          fats: acc.fats + curr.fats,
          calores: acc.calories + curr.calories
        }),
        { protein: 0, carbs: 0, fats: 0 , calories: 0}
      );   

    
    let eatenMacros = {
        protein: protein,
        carbs: carbs,
        fats: fats
    }        
    
    
    
    
    


    /***************************************************
    calculate the percentage of eaten to suggested macros
    ***************************************************/  
    let proteinCurrPercentage = 0;
    let carbsCurrPercentage = 0;
    let fatCurrPercentage = 0;
    
    if(tdeeMacros.length > 0 && foodList.length > 0) {
        proteinCurrPercentage = Math.floor(((eatenMacros.protein / tdeeMacros[0].cut.protein) * 100))
        carbsCurrPercentage = Math.floor(((eatenMacros.carbs / tdeeMacros[0].cut.carbs) * 100))
        fatCurrPercentage = Math.floor(((eatenMacros.fats / tdeeMacros[0].cut.fats) * 100))
    }
    


    const [macroPercent, setMacroPercent] = useState({
        protein: 0,
        carbs: 0,
        fat: 0
    })
    

    const useProgressBar = (macroName, endValue, setMacroPercent) => {
        let speed = 12;
        useEffect(() => {
            const progress = setInterval(() => {
                if (endValue > 0) {
                    setMacroPercent((prevValue) => {
                        const nextValue = prevValue[macroName] + 1;
                            
                        if (nextValue === endValue) {
                            clearInterval(progress);
                        }
    
                        return {
                            ...prevValue,
                            [macroName]: nextValue
                        };
                        
                        // if (nextValue === endValue) {
                            //     clearInterval(progress);
                            // }
                            
                            
                    });
                }
                
            }, speed);
            return () => clearInterval(progress);
        }, [macroName, endValue, setMacroPercent]);
        
    }
    
    useProgressBar("protein", proteinCurrPercentage, setMacroPercent);
    useProgressBar("carbs", carbsCurrPercentage, setMacroPercent);
    useProgressBar("fat", fatCurrPercentage, setMacroPercent);

    
       
    




    
    // const [progressValue, setProgressValue] = useState(0);
    // let progressEndValue =  10;
    // let speed = 5000;
    

    // const progress = setInterval(() => {
    //     setProgressValue((prevValue) => prevValue + 1);
    //     if (progressValue === progressEndValue) {
    //         clearInterval(progress)
    //     }
    //     console.log("progressValue is "+progressValue)
    // }, speed);
    


    
    return (
    <>
        <div className="component-container">            
            {`macroPercent: ${macroPercent.protein}${"\n"}end value: ${proteinCurrPercentage}`} 
            
            
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
                            <span className="consumed-suggested-text">Consumed</span>
                            <span className="macro-counter">
                                {eatenMacros.protein ? eatenMacros.protein : 0}
                            </span>
                        </div>

                        <div className="suggested-consumed-sub-container">
                            <span className="consumed-suggested-text">Suggested</span>
                            <span className="macro-counter">
                                {tdeeMacros.length > 0 ? tdeeMacros[0].cut.protein : 0}
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
                                    "background": `#7CBF85`,
                                    }}
                            >
                            </div>
                            <span className="percentage">
                                {macroPercent.protein > 0 ? `${macroPercent.protein} %` : `0 %`}
                            </span>
                        </div>
                    </div>
                </div>
                
                <div className="widget card-2">
                    <div className="macro-name-with-icon-container">
                        <span className="macros-card-macro-name">Carbs</span>
                        <img className="small-icon" src={carbIcon}/>
                    </div>
                    <div className="suggested-consumed-master-container">
                        <div className="suggested-consumed-sub-container">
                            <span className="consumed-suggested-text">Consumed</span>
                            <span className="macro-counter">
                                {eatenMacros.carbs ? eatenMacros.carbs : 0}
                            </span>
                        </div>

                        <div className="suggested-consumed-sub-container">
                            <span className="consumed-suggested-text">Suggested</span>
                            <span className="macro-counter">
                                {tdeeMacros.length > 0 ? tdeeMacros[0].cut.carbs : 0}
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
                                }%`, "background": `#756CA3`}}
                            >
                            </div>
                            <span className="percentage">
                                {macroPercent.carbs > 0 ? `${macroPercent.carbs} %` : `0 %`}
                            </span>
                        </div>
                    </div>
                </div>
                
                <div className="widget card-3">
                    <div className="macro-name-with-icon-container">
                        <span className="macros-card-macro-name">Fats</span>
                        <img className="small-icon" src={fatsIcon}/>
                    </div>
                    <div className="suggested-consumed-master-container">
                        <div className="suggested-consumed-sub-container">
                            <span className="consumed-suggested-text">Consumed</span>
                            <span className="macro-counter">
                                {eatenMacros.fats ? eatenMacros.fats : 0}
                            </span>
                        </div>

                        <div className="suggested-consumed-sub-container">
                            <span className="consumed-suggested-text">Suggested</span>
                            <span className="macro-counter">
                                {tdeeMacros.length > 0 ? tdeeMacros[0].cut.fats : 0}
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
                                }%`, "background": `#8BAEC1`}}
                            >
                            </div>
                            <span className="percentage">
                                {macroPercent.fat > 0 ? `${macroPercent.fat} %` : `0 %`}
                            </span>
                        </div>
                    </div>
                </div>
                
                <div className="widget card-4">
                    <div className="macro-name-with-icon-container">
                        <span className="macros-card-macro-name">Calories</span>
                        <img className="small-icon" src={caloriesIcon}/>
                    </div>
                    <div className="suggested-consumed-master-container">
                        <div className="suggested-consumed-sub-container">
                            <span className="consumed-suggested-text">Consumed</span>
                            <span className="macro-counter">
                                {eatenMacros.protein ? eatenMacros.protein : 0}
                            </span>
                        </div>

                        <div className="suggested-consumed-sub-container">
                            <span className="consumed-suggested-text">Suggested</span>
                            <span className="macro-counter">
                                {tdeeMacros.length > 0 ? tdeeMacros[0].cut.protein : 0}
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
                                }%`, "background": `#BEA794`}}>
                            </div>
                            <span className="percentage">
                                {macroPercent.fat > 0 ? `${macroPercent.fat} %` : `0 %`}
                            </span>
                        </div>
                    </div>
                </div>         
            </div>
        </div>





    </>
    )
}