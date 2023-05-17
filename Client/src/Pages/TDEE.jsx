import React, { useState, useContext, useEffect } from "react"
import { Link } from "react-router-dom"
import {Context} from "../Context/DataContext"
import Axios from "axios"



export default function Tdee() {
    

    const { tdeeDbList } = useContext(Context)
    const { addTdeeDbList } = useContext(Context)


    const { personalDbList } = useContext(Context)
    const { addPersonalDbList } = useContext(Context)

    
    const { addTdeeMacros } = useContext(Context);       

    const addTdeeDb = () => {
        Axios.post('http://localhost:3001/tdee', {
            protein: macros.cut.protein,
            carbs: macros.cut.carbs,
            fat: macros.cut.fat,
            calories: macros.cut.calories,  
        })

        addTdeeDbList(
            [{
                protein: macros.cut.protein,
                carbs: macros.cut.carbs,
                fat: macros.cut.fat,
                calories: macros.cut.calories, 
            }]
        )
    }


    const addPersonalDb = () => {
        Axios.post('http://localhost:3001/personal', {
            weight: weight,
            age: age,
            height: height,
        })

        addPersonalDbList(
            [{
                weight: weight,
                age: age,
                height: height,
            }]
        )
    }






    /////////////////////////// ACTUAL DATABASE DATA //////////////////////////////////////
    
    Axios.get('http://localhost:3001/tdee').then((response) => {
        addTdeeDbList(response.data)
    })
    

    Axios.get('http://localhost:3001/personal').then((response) => {
        addPersonalDbList(response.data)
    })


    // const deleteFoodDb = (food) => {
    //     Axios.delete(`http://localhost:3001/delete/${food}`)
    // }




   
    








    let [age, setAge] = useState('')
    let [weight, setWeight] = useState('')
    let [height, setHeight] = useState('')
    let [goalWeight, setGoalWeight] = useState('')
    
    let [macrosState, setMacrosState] = useState('')
    let macros = {
        cut:{
            protein: 0,
            fat: 0,
            carbs: 0,
            calories: 0
        },
        maintain:{
            protein: 0,
            fat: 0,
            carbs: 0,
            calories: 0
        },
        bulk:{
            protein: 0,
            fat: 0,
            carbs: 0,
            calories: 0
        }
    }
    

    
    function dataSubmit(e) {
        e.preventDefault()
        calculation()
        setMacrosState(macros)
        addTdeeMacros(macrosState)
        
        addTdeeDb();
        addPersonalDb();
    }
    
    
    // useEffect(() => {
    //     const data = window.localStorage.getItem('MACROSSTATE');
    //     setMacrosState(JSON.parse(data))
    // }, [])
    
    // useEffect(() => {
    //     window.localStorage.setItem('MACROSSTATE', JSON.stringify(macrosState))
    // }, [macrosState])
    
    
    
    
    function calculation() {
        let bmr = Math.floor(66 + (13.7 * weight * 0.45359237) + (5 * height) - (6.8 * age))
        let tdee = Math.floor(bmr * 1.55)
 

        function loseWeight() {
            let cutCal = Math.floor(tdee - (tdee * .2))
            let protein = weight;
            let fat = Math.floor(.5 * weight);
            
            macros.cut.protein = protein
            macros.cut.fat = fat
            macros.cut.carbs = (cutCal - (protein * 4) - (fat * 9)) / 4
            macros.cut.calories = cutCal
        }
        loseWeight();
        

        function maintainWeight() {
            let maintainCal = tdee
            let protein = Math.floor(1.207 * height);
            let fat = Math.floor(.6 * weight);
            
            macros.maintain.protein = protein
            macros.maintain.fat = fat
            macros.maintain.carbs = (maintainCal - (protein * 4) - (fat * 9)) / 4
            macros.maintain.calories = tdee
        }
        maintainWeight();
        

        function bulkWeight() {
            let bulkCal = Math.floor(tdee + (tdee * .2))
            let protein = Math.floor(1.41 * height);
            let fat = Math.floor(.73 * weight);
            
            macros.bulk.protein = protein
            macros.bulk.fat = fat
            macros.bulk.carbs = (bulkCal - (protein * 4) - (fat * 9)) / 4
            macros.bulk.calories = bulkCal
        }
        bulkWeight();
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
                
                <div className="widget tdee-cutting">
                    Cutting
                    <div className="tdee-suggested-row">
                        <p>Protein</p>
                        <p>{macrosState.cut ? macrosState.cut.protein : null}</p>
                    </div>
                    <div className="tdee-suggested-row">
                        <p>Fat</p>
                        <p>{macrosState.cut ? macrosState.cut.fat : null}</p>
                    </div>
                    <div className="tdee-suggested-row">
                        <p>Carbs</p>
                        <p>{macrosState.cut ? macrosState.cut.carbs : null}</p>
                    </div>
                    <div className="tdee-suggested-row">
                        <p>Calories</p>
                        <p>{macrosState.cut ? macrosState.cut.calories : null}</p>
                    </div>
                </div>

                <div className="widget tdee-maintenance">
                    Maintenance
                    <div className="tdee-suggested-row">
                        <p>Protein</p>
                        <p>{macrosState.maintain ? macrosState.maintain.protein : null}</p>
                    </div>
                    <div className="tdee-suggested-row">
                        <p>Fat</p>
                        <p>{macrosState.maintain ? macrosState.maintain.fat : null}</p>
                    </div>
                    <div className="tdee-suggested-row">
                        <p>Carbs</p>
                        <p>{macrosState.maintain ? macrosState.maintain.carbs : null}</p>
                    </div>
                    <div className="tdee-suggested-row">
                        <p>Calories</p>
                        <p>{macrosState.maintain ? macrosState.maintain.calories : null}</p>
                    </div>
                </div>
                
                <div className="widget tdee-bulking">
                    Bulking
                    <div className="tdee-suggested-row">
                        <p>Protein</p>
                        <p>{macrosState.bulk ? macrosState.bulk.protein : null}</p>
                    </div>
                    <div className="tdee-suggested-row">
                        <p>Fat</p>
                        <p>{macrosState.bulk ? macrosState.bulk.fat : null}</p>
                    </div>
                    <div className="tdee-suggested-row">
                        <p>Carbs</p>
                        <p>{macrosState.bulk ? macrosState.bulk.carbs : null}</p>
                    </div>
                    <div className="tdee-suggested-row">
                        <p>Calories</p>
                        <p>{macrosState.maintain ? macrosState.bulk.calories : null}</p>
                    </div>
                </div>
            </div>
        </div>       
    )
}