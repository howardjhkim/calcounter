import React, { useState, useContext, useEffect } from "react"
import { Link } from "react-router-dom"
import {Context} from "../Context/DataContext"



export default function Tdee() {
        
    const { addTdeeMacros } = useContext(Context);       
   
    const { addBodyInfo } = useContext(Context);
    const {bodyInfo} = useContext(Context);
    
    let [age, setAge] = useState('')
    let [weight, setWeight] = useState('')
    let [height, setHeight] = useState('')
    let [goalWeight, setGoalWeight] = useState('')
    
    let [macrosState, setMacrosState] = useState('')
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
        addBodyInfo({
            age: Number(age),
            weight: Number(weight),
            height: Number(height),
            goalWeight: Number(goalWeight)
        })
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
        <div className="tdee-page-grid">    
            <div className="bmr-container bmr-grid">
                <h3>BMR Calculation</h3>
                <div className="widget bmr-calculation-widget-1">
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
                                <td>Height</td>
                                <td>
                                    <input 
                                        className="tdee-inputs"
                                        type="text" 
                                        name="height" 
                                        onChange={e => setHeight(e.target.value)}/>
                                </td>
                            </tr>
                            <tr>
                                <td>Current Weight</td>
                                <td>
                                    <input 
                                        className="tdee-inputs"
                                        type="text" 
                                        name="weight" 
                                        onChange={e => setWeight(e.target.value)}/>
                                </td>
                            </tr>
                            
                            <tr>
                                <td>Goal Weight</td>
                                <td>
                                    <input 
                                        className="tdee-inputs"
                                        type="text" 
                                        name="age" 
                                        onChange={e => setGoalWeight(e.target.value)}/>
                                </td>
                            </tr>
                        </tbody> 
                    </table>
                    <button className="submitBtn" onClick={dataSubmit}>Submit</button>
                </div>
                    
                <div className="bmr-calculation-widget-2">
                    <div className="widget">
                        <select>
                            <option value="0">Sedentary</option>
                            <option value="1">Lightly Active</option>
                            <option value="2">Moderately Active</option>
                            <option value="3">Very Active</option>
                            <option value="4">Extremely Active</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="macros-container macros-grid">
                <h3>Macros Breakdown</h3>
                <div className="widget tdee-maintenance">
                    Maintenance
                    <div className="tdee-suggested-row">
                        <p>Protein</p>
                        <p>{macrosState.maintain ? macrosState.maintain.protein : null}</p>
                    </div>
                    <div className="tdee-suggested-row">
                        <p>Fats</p>
                        <p>{macrosState.maintain ? macrosState.maintain.fats : null}</p>
                    </div>
                    <div className="tdee-suggested-row">
                        <p>Carbs</p>
                        <p>{macrosState.maintain ? macrosState.maintain.carbs : null}</p>
                    </div>
                </div>
                
                <div className="widget tdee-protein">
                    Cutting
                    <div className="tdee-suggested-row">
                        <p>Protein</p>
                        <p>{macrosState ? macrosState.cut.protein : null}</p>
                    </div>
                    <div className="tdee-suggested-row">
                        <p>Fats</p>
                        <p>{macrosState ? macrosState.cut.fats : null}</p>
                    </div>
                    <div className="tdee-suggested-row">
                        <p>Carbs</p>
                        <p>{macrosState ? macrosState.cut.carbs : null}</p>
                    </div>
                </div>
                
                <div className="widget tdee-bulking">
                    Bulking
                    <div className="tdee-suggested-row">
                        <p>Protein</p>
                        <p>{macrosState.bulk ? macrosState.bulk.protein : null}</p>
                    </div>
                    <div className="tdee-suggested-row">
                        <p>Fats</p>
                        <p>{macrosState.bulk ? macrosState.bulk.fats : null}</p>
                    </div>
                    <div className="tdee-suggested-row">
                        <p>Carbs</p>
                        <p>{macrosState.bulk ? macrosState.bulk.carbs : null}</p>
                    </div>
                </div>

            </div>
            
        </div>
        
    )
}