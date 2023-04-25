import React from "react"
import { Link } from "react-router-dom"

import FoodInputs from "../Components/FoodInputs"
import MacrosCard from "../Components/MacrosCard"
import FoodTable from "../Components/FoodTable"

export default function Home() {
    return (
        <div>
            <div className="welcoming-text-container">
                <span className="welcoming-text">Welcome back, #</span>
            </div>
            
            <FoodInputs />
            <MacrosCard /> 
            <FoodTable />
        </div>
    )
}