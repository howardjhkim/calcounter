import React, {useState, useEffect} from "react"
import {Link, NavLink} from "react-router-dom"

// import FoodInputs from "../Components/FoodInputs"
import MacrosCard from "../Components/MacrosCard"
import FoodTable from "../Components/FoodTable"
import WeightLossTracker from "../Components/WeightLossTracker"
import Banner from "../Components/Banner"
import { ReactComponent as Art } from "../Images/art.svg"
import home from "../CSS/Home.css"


export default function Home() {



    return (
        <div className="homepage-grid">
            <div className="homepage-grid-title-container">
                <span className="welcoming-text">Welcome back, #</span>
                <span className="sub-welcoming-text">Here's an overview of your progress</span>
            </div>

            
            <div className="homepage-grid-banner"><Banner /></div>
            <div className="homepage-grid-1"><MacrosCard /></div>
            <div className="homepage-grid-4"><FoodTable /></div>
            
            {/* <div className="homepage-grid-2">
                <FoodInputs />
            </div> */}

            {/* <div className="homepage-grid-3">
                <WeightLossTracker /> 
            </div> */}




        </div>
    )
}