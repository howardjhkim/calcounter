import React, { useContext, useState, useEffect} from "react"
import {Context} from "../Context/DataContext"



import proteinIcon from "../Images/protein-icon.png"
import carbIcon from "../Images/carb-icon.png"
import fatsIcon from "../Images/fats-icon.png"
import caloriesIcon from "../Images/calories-icon.png"


export default function MacrosCard() {
    
    const { tdeeMacros } = useContext(Context)
    const { foodList } = useContext(Context)
    
    const { protein, carbs, fats } = foodList.reduce(
        (acc, curr) => ({
          protein: acc.protein + curr.protein,
          carbs: acc.carbs + curr.carbs,
          fats: acc.fats + curr.fats,
        }),
        { protein: 0, carbs: 0, fats: 0 }
      );   


    let eatenMacros = {
        protein: protein,
        carbs: carbs,
        fats: fats
    }        
    
    
    
    
    



    let proteinCurrPercentage = 0;
    
    if(tdeeMacros.length > 0 && foodList.length > 0) {
        proteinCurrPercentage = Math.floor(((eatenMacros.protein / tdeeMacros[0].cut.protein) * 100))
        // console.log(proteinCurrPercentage)

    }
    


    
    // const useProgressBar = (endValue) => {
    //     const [value, setValue] = useState(0);
    //     const speed = 50;
    //     console.log("value is: "+value)
    //     useEffect(() => {
    //         const interval = setInterval(() => {
    //             // setValue((prevValue) => {
    //             //     const nextValue = prevValue + 1;
    //             //     if (nextValue === endValue) {
    //             //         clearInterval(interval);
    //             //     }
    //             // }, speed);
    //             setValue((prevValue) => {
    //                 let nextValue = prevValue + 1;
    //                 if (nextValue === endValue) {
    //                     clearInterval(interval);
    //                 }
    //             }, speed);

    //         return () => clearInterval(interval);
    //         }, []);
    //     })
       
    // }

    // const useProgressBar = (endValue) => {
    //     const [value, setValue] = useState(0);
    //     const speed = 1000;
        
    //     useEffect(() => {
    //         const interval = setInterval(() => {
            
    //             setValue((prevValue => prevValue + 1));
    //             if (value === endValue) {
    //                 clearInterval(interval)
    //             }
    //         }, speed);
        
    //     }, [value])
    // }
    
    // const proteinPercentage = useProgressBar(proteinCurrPercentage)
    


    //////////////////////////////////////



    
    

    
    // let endValue = 75;
    
    const [macroPercent, setMacroPercent] = useState({
        protein: 0,
        carbs: 0,
        fat: 0
    })
    

    const useProgressBar = (macroName, endValue, setMacroPercent) => {
        let speed = 1000;
        useEffect(() => {
            const progress = setInterval(() => {
                setMacroPercent((prevValue) => {
                    const nextValue = prevValue[macroName] + 1;
                    if (nextValue === endValue) {
                        clearInterval(progress);
                    }

                    return {
                        ...prevValue,
                        [macroName]: nextValue
                    };
                });
                // return progress
            }, speed);
            return () => clearInterval(progress);
        }, [macroName, endValue, setMacroPercent]);
    }
    
    console.log(macroPercent["protein"])
    useProgressBar("protein", proteinCurrPercentage, setMacroPercent);

    
       





    
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
        
        <div className="component-container">
            {proteinCurrPercentage}

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
                                style={{"width": `${macroPercent.protein}%`, "background": `#7CBF85`}}
                            >
                            </div>
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

                        <div 
                            className="linear-progress"
                            // style={{"width": `${progressValue}%`}}
                        >

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

                        <div 
                            className="linear-progress"
                            // style={{"width": `${progressValue}%`}}
                        >

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

                        <div 
                            className="linear-progress"
                            // style={{"width": `${progressValue}%`}}
                        >

                        </div>
                    </div>
                </div>         
            </div>
        </div>
        
    )
}