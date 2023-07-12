import React from "react"
import help from "../CSS/Help.css"

export default function Help() {
    return(

        <div className="help-page">
            <p>How does it work?</p>

            <div>
                <div className="sectioned-rows">
                    <div><h2>1.</h2></div>
                    <div>
                        <h2>Start on the TDEE page.</h2>
                        <p>Input your current information, such as weight, height, and activity level.</p>
                    </div>
                </div>

                <div className="sectioned-rows">
                    <div><h2>2.</h2></div>
                    <div>
                        <h2>Choose your preferred weight journey.</h2>
                        <p>Once you submit your body information, your daily recommended macronutrient intake will be calculated (Cut, Maintain, or Gain).</p>
                    </div>
                </div>

                <div className="sectioned-rows">
                    <div><h2>3.</h2></div>
                    <div>
                        <h2>Log your meals.</h2>
                        <p>The majority of our progress actually happens in the kitchen. Logging your meals will help you stay within your daily recommended macronutrient and caloric intake.</p>
                    </div>
                </div>

                <div className="sectioned-rows">
                    <div><h2>4.</h2></div>
                    <div>
                        <h2>Track your gym progress.</h2>
                        <p>Input your current information, such as weight, height, and activity level.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}