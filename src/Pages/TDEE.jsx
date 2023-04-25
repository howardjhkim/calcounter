import React, { useState, useContext, useEffect } from "react"
import { Link } from "react-router-dom"
import {Context} from "../Context/DataContext"



export default function Tdee() {
        
    const { addTdeeMacros } = useContext(Context);       

    let [macrosState, setMacrosState] = useState('')
    
    let [age, setAge] = useState('')
    let [weight, setWeight] = useState('')
    let height = 183
    
    let macros = {
        cut:{
            protein: 0,
            fats: 0,
            carbs: 0,
            calories: 0
        },
        maintain:{
            protein: 0,
            fats: 0,
            carbs: 0,
            calories: 0
        },
        bulk:{
            protein: 0,
            fats: 0,
            carbs: 0,
            calories: 0
        }
    }
    
    function dataSubmit(e) {
        e.preventDefault()
        calculation()
        setMacrosState(macros)
        addTdeeMacros(macrosState)
    }
    
    
    useEffect(() => {
        const data = window.localStorage.getItem('MACROSSTATE');
        setMacrosState(JSON.parse(data))
    }, [])
    
    useEffect(() => {
        window.localStorage.setItem('MACROSSTATE', JSON.stringify(macrosState))
    }, [macrosState])
    
    
    
        
    function calculation() {
        let bmr = Math.floor(66 + (13.7 * weight * 0.45359237) + (5 * height) - (6.8 * age))
        let tdee = Math.floor(bmr * 1.55)
    
        function loseWeight() {
            let cutCal = Math.floor(tdee - (tdee * .2))
            let protein = height;
            let fats = .4 * weight;
            
            macros.cut.protein = protein
            macros.cut.fats = fats
            macros.cut.carbs = (cutCal - (protein * 4) - (fats * 9)) / 4
        }
        loseWeight();
        
        function maintainWeight() {
            let maintainCal = tdee
            let protein = height;
            let fats = .4 * weight;
            
            macros.maintain.protein = protein
            macros.maintain.fats = fats
            macros.maintain.carbs = (maintainCal - (protein * 4) - (fats * 9)) / 4
        }
        maintainWeight();
    
    }
    
    
    return (
        <div>
            <div className="component-container">
                <h3>BMR Calculation</h3>
                <div className="widget">
                    <table>
                        <tbody>
                            <tr>
                                <td>Age</td>
                                <td>
                                    <input 
                                        className="tdee-inputs"
                                        type="text" 
                                        name="age" 
                                        onChange={e => setAge(e.target.value)}/>
                                </td>
                            </tr>
                            <tr>
                                <td>Weight</td>
                                <td>
                                    <input 
                                        className="tdee-inputs"
                                        type="text" 
                                        name="weight" 
                                        onChange={e => setWeight(e.target.value)}/>
                                </td>
                            </tr>
                            
                            <tr>
                                <td>Sedentary</td>
                                <td>Lightly Active</td>
                                <td>Moderately Active</td>
                                <td>Very Active</td>
                                <td>Extremely Active</td>
                            </tr>
                            
                        </tbody> 
                    </table>
                    <button className="submitBtn" onClick={dataSubmit}>Submit</button>
                </div>
            </div>
            
            

            <div className=" component-container multi-columns">
                <div className="widget three-columns">
                    Maintenance
                    <div className="data-two-column-container">
                        <p>Protein</p>
                        <p>{macrosState.maintain ? macrosState.maintain.protein : null}</p>
                    </div>
                    <div className="data-two-column-container">
                        <p>Fats</p>
                        <p>{macrosState.maintain ? macrosState.maintain.fats : null}</p>
                    </div>
                    <div className="data-two-column-container">
                        <p>Carbs</p>
                        <p>{macrosState.maintain ? macrosState.maintain.carbs : null}</p>
                    </div>
                </div>
                
                <div className="widget three-columns">
                    Cutting
                    <div className="data-two-column-container">
                        <p>Protein</p>
                        <p>{macrosState ? macrosState.cut.protein : null}</p>
                    </div>
                    <div className="data-two-column-container">
                        <p>Fats</p>
                        <p>{macrosState ? macrosState.cut.fats : null}</p>
                    </div>
                    <div className="data-two-column-container">
                        <p>Carbs</p>
                        <p>{macrosState ? macrosState.cut.carbs : null}</p>
                    </div>
                </div>
                
                <div className="widget three-columns">
                    Bulking
                    <div className="data-two-column-container">
                        <p>Protein</p>
                        <p>{macrosState.bulk ? macrosState.bulk.protein : null}</p>
                    </div>
                    <div className="data-two-column-container">
                        <p>Fats</p>
                        <p>{macrosState.bulk ? macrosState.bulk.fats : null}</p>
                    </div>
                    <div className="data-two-column-container">
                        <p>Carbs</p>
                        <p>{macrosState.bulk ? macrosState.bulk.carbs : null}</p>
                    </div>
                </div>
            </div>
        </div>
        
    )
}