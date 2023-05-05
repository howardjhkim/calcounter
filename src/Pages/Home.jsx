import React from "react"
import { Link } from "react-router-dom"

import FoodInputs from "../Components/FoodInputs"
import MacrosCard from "../Components/MacrosCard"
import FoodTable from "../Components/FoodTable"
import WeightLossTracker from "../Components/WeightLossTracker"

export default function Home() {
    return (
        <div className="homepage-grid">
            <div className="homepage-grid-title-container">
                <span className="welcoming-text">Welcome back, #</span>
                <span className="sub-welcoming-text">Here's an overview of your progress</span>
                <hr />
            </div>
            
            <div className="homepage-grid-2">
                <FoodInputs />
            </div>
            
            <div className="homepage-grid-1">
                <MacrosCard /> 
            </div>



            <div className="homepage-grid-3">
                <WeightLossTracker /> 
            </div>

            <div className="homepage-grid-4">
                <FoodTable />
            </div>
        </div>
    )
}