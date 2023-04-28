import React from "react"
import {NavLink} from "react-router-dom"

export default function Header() {

    return(
        <header>
            <nav>
                <NavLink className="navlinks" to="/tdee">TDEE</NavLink>
                <NavLink className="navlinks" to="/workouts">Workouts</NavLink>
            </nav>
        </header>
    )
}