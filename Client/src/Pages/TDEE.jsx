import React, { useState, useContext, useEffect } from "react"
import { Link } from "react-router-dom"
import {Context} from "../Context/DataContext"
import Axios from "axios"
import tdee from "../CSS/Tdee.css"
import DatePicker from "react-date-picker";


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
            goalWeight: goalWeight,
            
            activity: activity,
            startDate: startDate,
            targetDate: targetDate,
            daysRemaining: daysRemaining
        })

        addPersonalDbList(
            [{
                weight: weight,
                age: age,
                height: height,
                goalWeight: goalWeight,

                activity: activity,
                startDate: startDate,
                targetDate: targetDate,
                daysRemaining: daysRemaining
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
    
    let [activity, setActivity] = useState('')
    let [startDate, setStartDate] = useState(new Date())
    let [targetDate, setTargetDate] = useState(new Date())
    let [daysRemaining, setDaysRemaining] = useState("")




    
    

    const calculateDifference = () => {
        const start = new Date(startDate);
        const end = new Date(targetDate);
        const differenceInMs = Math.abs(end - start);
        const differenceInDays = Math.ceil(differenceInMs / (1000 * 60 * 60 * 24));
        setDaysRemaining(differenceInDays);
    };


    useEffect(() => {
        calculateDifference();
    }, [targetDate, startDate]);



    // console.log(targetDate)


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
    
    // console.log(daysRemaining)
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
    

    /*/////////////////////////////////////////////////////
    1. BMR: number of calories your body needs to maintain basic functions at rest.
    
    For men: BMR = 66 + (6.23 × weight in pounds) + (12.7 × height in inches) - (6.8 × age in years)
    For women: BMR = 655 + (4.35 × weight in pounds) + (4.7 × height in inches) - (4.7 × age in years)
    



    2. TDEE: Total Daily Energy Expenditure
    
    Sedentary (little to no exercise): BMR × 1.2
    Lightly active (light exercise/sports 1-3 days per week): BMR × 1.375
    Moderately active (moderate exercise/sports 3-5 days per week): BMR × 1.55
    Very active (hard exercise/sports 6-7 days per week): BMR × 1.725
    Extra active (very hard exercise/sports and a physically demanding job): BMR × 1.9



    *//////////////////////////////////////////////////////





    // console.log(personalDbList[0])

    


    const separatorIndexes = [2, 4];

    return (
        <div className="tdee-page-grid">   


            {/*////////////  1/2 1st half  ////////////*/} 
            <div className="bmr-master-container-1">
                <div className="outside-component-title-container">
                    <p className="outside-component-title">TDEE Calculations</p>
                    <p className="outside-component-subtitle">{`Calculate your Total Daily Energy Expenditure`}</p>              
                </div>

                <div className="self-widget bmr-calculation-widget-1">
                    <div className="component-title-container">
                        <span className="component-title">Daily Breakdown</span>
                    </div>
                
                    <div className="bmr-info-container-first">
                        <p>Age</p>
                        <div>
                            <input 
                                className="tdee-inputs"
                                type="text" 
                                name="age" 
                                onChange={e => setAge(e.target.value)}/>
                        </div>
                    </div>
                    

                    <div className="bmr-info-container-first">
                        <p>Height</p>
                        <div>
                            <input 
                                className="tdee-inputs"
                                type="text" 
                                name="height" 
                                onChange={e => setHeight(e.target.value)}/>
                        </div>
                    </div>
                        

                    <div className="bmr-info-container-first">
                        <p>Current Weight</p>
                        <div>
                            <input 
                                className="tdee-inputs"
                                type="text" 
                                name="weight" 
                                onChange={e => setWeight(e.target.value)}/>
                        </div>
                    </div>

            
                    <div className="bmr-info-container-first">
                        <p>Goal Weight</p>
                        <div>
                            <input 
                                className="tdee-inputs"
                                type="text" 
                                name="goalWeight" 
                                onChange={e => setGoalWeight(e.target.value)}/>
                        </div>
                    </div>


                    <div className="bmr-info-container-first">
                        <p>Activity</p>
                        <select style={{ width: '152px' }} onChange={e => setActivity(e.target.value)}>
                            <option value="0">Sedentary</option>
                            <option value="1">Lightly Active</option>
                            <option value="2">Moderately Active</option>
                            <option value="3">Very Active</option>
                            <option value="4">Extremely Active</option>
                        </select>
                    </div>
                    
                    
                    <div className="bmr-info-container-first">
                        <p>Start Date</p>
                        <div>
                            <input 
                                className="tdee-inputs"
                                type="date" 
                                name="startDate" 
                                onChange={e => setStartDate(e.target.value)}/>
                        </div>                           
                    </div>


                    <div className="bmr-info-container-first">
                        <p>Target Date</p>
                        <div>
                            <input 
                                className="tdee-inputs"
                                type="date" 
                                name="startDate" 
                                onChange={e => setTargetDate(e.target.value)}/>
                        </div>
                    </div>


                    <button className="submitBtn" onClick={dataSubmit}>Submit</button>       
                </div>
                    
                {/*////////////  2/2 1st half  ////////////*/}
                <div className="self-widget bmr-calculation-widget-2">
                    

                    <div className="component-title-container">
                        <span className="component-title">Daily Breakdown</span>
                    </div>


                    <div className="bmr-info-container">
                        <div className="bmr-info-title">Goal Weight Plan</div>
                        <div className="bmr-info">
                            <div className="bmr-info-row">
                                <p>Current</p>
                                <p>{personalDbList?.[0]?.[0]?.weight || ''} lbs</p>
                            </div>
                            <div className="bmr-info-row">
                                <p>Goal</p>
                                <p>{personalDbList?.[0]?.[0]?.goalWeight || ''} lbs</p>
                            </div>
                            <div className="bmr-info-row">
                                <p>Remaining</p>
                                <p>
                                    {personalDbList?.[0]?.[0]?.weight && personalDbList?.[0]?.[0]?.goalWeight
                                    ? personalDbList[0][0].weight - personalDbList[0][0].goalWeight
                                    : ''} lbs
                                </p>
                            </div>
                        </div>
                    </div>


                    <div className="bmr-info-container">
                        <div className="bmr-info-title">Time to Goal</div>
                        <div className="bmr-info">
                            <div className="bmr-info-row">
                                <p>Start Date</p>
                                <p>{personalDbList?.[0]?.[0]?.startDate
                                    ? new Date(personalDbList[0][0].startDate).toLocaleDateString("en-US", {
                                        month: "2-digit",
                                        day: "2-digit",
                                        year: "numeric",
                                        })
                                    : ''}
                                </p>
                            </div>
                            <div className="bmr-info-row">
                                <p>Goal Date</p>
                                <p>{personalDbList?.[0]?.[0]?.targetDate
                                    ? new Date(personalDbList[0][0].targetDate).toLocaleDateString("en-US", {
                                        month: "2-digit",
                                        day: "2-digit",
                                        year: "numeric",
                                        })
                                    : ''}
                                </p>
                            </div>
                            <div className="bmr-info-row">
                                <p>Days Remaining</p>
                                <p>
                                    {personalDbList?.[0]?.[0]?.daysRemaining || ''} days
                                </p>
                            </div>
                        </div>
                    </div>

                    
                    <div className="bmr-info-container">
                        <div className="bmr-info-title">Recommended Calorie Intakes</div>
                        <div className="bmr-info">
                            <div className="bmr-info-row">
                                <p>To maintain current weight</p>
                                <p>{personalDbList?.[0]?.[0]?.weight || ''} lbs</p>
                            </div>
                            <div className="bmr-info-row">
                                <p>To reach goal weight</p>
                                <p>{personalDbList?.[0]?.[0]?.goalWeight || ''} lbs</p>
                            </div>
                        </div>
                    </div>
                    

                    <div className="bmr-info-container">
                        <div className="bmr-info-title">{`BMR (Basal Metabolic Rate)`}</div>
                        <div className="bmr-info">
                            <div className="bmr-info-row">
                                <p>TO maintain current weight</p>
                                <p>{personalDbList?.[0]?.[0]?.weight || ''} lbs</p>
                            </div>
                            <div className="bmr-info-row">
                                <p>To reach goal weight</p>
                                <p>{personalDbList?.[0]?.[0]?.goalWeight || ''} lbs</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>




            {/*////////////  2nd half of page  ////////////*/}
            <div className="bmr-master-container-2">
                <div className="outside-component-title-container">
                    <p className="outside-component-title">Macronutrients</p>
                    <p className="outside-component-subtitle">Based on your current physique, you should consume the following:</p>              
                </div>
        
                <div className="macros-container">
                
                    <div className="self-widget tdee-cutting">
                        Cutting
                        <div className="tdee-suggested-row">
                            <p>Protein</p>
                            <p>{tdeeDbList[0] ? tdeeDbList[0][0].protein : null}</p>
                        </div>
                        <div className="tdee-suggested-row">
                            <p>Fat</p>
                            <p>{tdeeDbList[0] ? tdeeDbList[0][0].fat : null}</p>
                        </div>
                        <div className="tdee-suggested-row">
                            <p>Carbs</p>
                            <p>{tdeeDbList[0] ? tdeeDbList[0][0].carbs : null}</p>
                        </div>
                        <div className="tdee-suggested-row">
                            <p>Calories</p>
                            <p>{tdeeDbList[0] ? tdeeDbList[0][0].calories : null}</p>
                        </div>
                    </div>

                    <div className="self-widget tdee-maintenance">
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
                    
                    <div className="self-widget tdee-bulking">
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
        </div>       
    )
}