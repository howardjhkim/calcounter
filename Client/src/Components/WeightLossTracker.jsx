import React, {useContext, useState, useEffect} from "react"
import {Context} from "../Context/DataContext"
import weightLossTracker from "../CSS/WeightLossTracker.css"


export default function WeightLossTracker() {

    const { foodList } = useContext(Context)
    const [progressValue, setProgressValue] = useState(0);

    let progressEndValue = 20,
        speed = 35;
    
    ///////////// Visual graph incrementer /////////////
    useEffect(() => {
        const progress = setInterval(() => {
            setProgressValue((prevValue) => {
            const nextValue = prevValue + 1;
            if (nextValue >= progressEndValue) {
                clearInterval(progress);
            }
            return nextValue;
            });
        }, speed);
        return () => clearInterval(progress);
        }, []);

    return (
        <div className="widget">
            <div className="component-title-container">
                <span className="component-title">Weight Tracker</span>
                <span className="component-subtitle">Your current weightloss progress:</span>
            </div>
            
            <div className="weightloss-container">
                <div className="circular-progress" 
                    style={{"background": `conic-gradient(#7d2ae8 ${progressValue * 3.6}deg, #ededed 0deg)`}}>
                    <span className="progress-value">{progressValue}%</span>
                </div>

                <span>You are on track to losing " " weight</span>
            </div>  
        </div>
    )
}




