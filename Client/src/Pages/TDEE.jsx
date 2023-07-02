import React, { useState, useContext, useEffect } from "react"
import { Link } from "react-router-dom"
import {Context} from "../Context/DataContext"
import Axios from "axios"
import tdee from "../CSS/Tdee.css"
// import DatePicker from "react-date-picker";
// import Select from 'react-select'

export default function Tdee() {
    

    const { tdeeDbList } = useContext(Context)
    const { addTdeeDbList } = useContext(Context)


    const { personalDbList } = useContext(Context)
    const { addPersonalDbList } = useContext(Context)

    
    const { addTdeeMacros } = useContext(Context);       
    
    
    const addTdeeDb = () => {
        Axios.post('http://localhost:3001/tdee', {
            cutProtein: macros.cut.protein,
            cutCarbs: macros.cut.carbs,
            cutFat: macros.cut.fat,
            cutCalories: macros.cut.calories,  
            
            maintainProtein: macros.maintain.protein,
            maintainCarbs: macros.maintain.carbs,
            maintainFat: macros.maintain.fat,
            maintainCalories: macros.maintain.calories,  
            
            gainProtein: macros.gain.protein,
            gainCarbs: macros.gain.carbs,
            gainFat: macros.gain.fat,
            gainCalories: macros.gain.calories,  
        })

        addTdeeDbList(
            [{
                cutProtein: macros.cut.protein,
                cutCarbs: macros.cut.carbs,
                cutFat: macros.cut.fat,
                cutCalories: macros.cut.calories, 

                maintainProtein: macros.maintain.protein,
                maintainCarbs: macros.maintain.carbs,
                maintainFat: macros.maintain.fat,
                maintainCalories: macros.maintain.calories,  
                
                gainProtein: macros.gain.protein,
                gainCarbs: macros.gain.carbs,
                gainFat: macros.gain.fat,
                gainCalories: macros.gain.calories,
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
            daysRemaining: daysRemaining,
            tdeeDb: tdeeDb,
            bmrDb: bmrDb,
            fitnessGoal: fitnessGoal
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
                daysRemaining: daysRemaining,
                tdeeDb: tdeeDb,
                bmrDb: bmrDb,
                fitnessGoal: fitnessGoal
            }]
        )
    }






    /////////////////////////// ACTUAL DATABASE DATA //////////////////////////////////////
    

    useEffect(() => {

        Axios.get('http://localhost:3001/tdee').then((response) => {
            addTdeeDbList(response.data)
        })
        
    
        Axios.get('http://localhost:3001/personal').then((response) => {
            addPersonalDbList(response.data)
        })

    }, [])






    let [age, setAge] = useState('')
    let [weight, setWeight] = useState('')
    let [height, setHeight] = useState('')
    let [goalWeight, setGoalWeight] = useState('')
    
    let [activity, setActivity] = useState('')
    let [startDate, setStartDate] = useState(new Date())
    let [targetDate, setTargetDate] = useState(new Date())
    let [daysRemaining, setDaysRemaining] = useState("")

    let [bmrDb, setBmrDb] = useState(0);
    let [tdeeDb, setTdeeDb] = useState(0);

    let [gender, setGender] = useState('male')
    
    let [fitnessGoal, setFitnessGoal] = useState('cut')

    








    
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
        gain:{
            protein: 0,
            fat: 0,
            carbs: 0,
            calories: 0
        }
    }
    

    let activityLevel = {
        'none': 1,
        'sedentary': 1.2,
        'light': 1.375,
        'moderate': 1.55,
        'very': 1.725,
        'extreme': 1.9
    }
    
    useEffect(() => {
        if(gender === 'male') {
            let bmr = Math.floor(Math.round((4.536 * weight) + (15.88 * height) - (5 * age) + 5))
            let tdee = Math.floor(Math.round(bmr * Number(activityLevel[activity])))
            // let tdee = bmr * 1.25
            setBmrDb(bmr)
            setTdeeDb(tdee)
        } else {
            let bmr = Math.floor(Math.round((4.536 * weight) + (15.88 * height) - (5 * age) - 161))
            let tdee = Math.floor(Math.round(bmr * Number(activityLevel[activity])))
            setTdeeDb(tdee)
            setBmrDb(bmr)
        }

    }, [age, weight, height, activity])
    

   
    function calculation() {
        function cutWeight() {
            let calories = Math.floor(tdeeDb - (tdeeDb * .2))
            macros.cut.protein = Math.floor(calories * .215 / 4)
            macros.cut.carbs = Math.floor(calories * .485 / 4)
            macros.cut.fat = Math.floor(calories * .3 / 9)
            macros.cut.calories = calories
        }
        cutWeight();
        
        
        function maintainWeight() {
            let calories = tdeeDb
            macros.maintain.protein = Math.floor(calories * .172 / 4)
            macros.maintain.carbs = Math.floor(calories * .528 / 4)
            macros.maintain.fat = Math.floor(calories * .3 / 9)
            macros.maintain.calories = calories
        }
        maintainWeight();
        
        
        function gainWeight() {
            let calories = tdeeDb + 500
            macros.gain.protein = Math.floor(calories * .144 / 4)
            macros.gain.carbs = Math.floor(calories * .556 / 4)
            macros.gain.fat = Math.floor(calories * .3 / 9)
            macros.gain.calories = calories
        }
        gainWeight();
    }


    function dataSubmit(e) {
        e.preventDefault()
        calculation()
        setMacrosState(macros)
        addTdeeMacros(macrosState)
        addTdeeDb();
        addPersonalDb();
    }
    

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
                        <p>Gender</p>
                        <select 
                            style={{ width: '152px' , border: 'none', borderBottom: '1px solid black'}} 
                            onChange={(e) => setGender(e.target.value)} 
                            value={gender}>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                        </select>
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
                        <select style={{ width: '152px' , border: 'none', borderBottom: '1px solid black'}} onChange={e => setActivity(e.target.value)}>
                            
                            <option value="" disabled selected>Select an option</option>
                            <option value="none">No Activity</option>
                            <option value="sedentary">Sedentary</option>
                            <option value="light">Light</option>
                            <option value="moderate">Moderate</option>
                            <option value="very">Very</option>
                            <option value="extreme">Extreme</option>
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

                    <div className="bmr-info-container-first">
                        <p>Goals</p>
                        <select style={{ width: '152px' , border: 'none', borderBottom: '1px solid black'}} onChange={e => setFitnessGoal(e.target.value)}>
                            <option value="cut">Cut Weight</option>
                            <option value="maintain">Maintain Weight</option>
                            <option value="gain">Gain Weight</option>
                            
                        </select>
                    </div>

                    <button className="submitBtn" onClick={dataSubmit}>Submit</button>       
                </div>
                    
                {/*////////////  2/2 1st half  ////////////*/}
                <div className="self-widget bmr-calculation-widget-2">
                    

                    <div className="component-title-container">
                        <span className="component-title">Your Stats</span>
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
                        <div className="bmr-info-title">{`Calories By Activity Level`}</div>
                        <div className="bmr-info">
                            <div className="bmr-info-row" style={{ backgroundColor: personalDbList?.[0]?.[0]?.activity === 'none' ? 'rgb(232,240,254)' : '' }}>
                                <p>No Activity</p>
                                <p>{personalDbList?.[0]?.[0]?.bmrDb || ''} cal</p>
                            </div>
                            <div className="bmr-info-row" style={{ backgroundColor: personalDbList?.[0]?.[0]?.activity === "sedentary" ? 'rgb(232,240,254)rgb(232,240,254)' : '' }}>
                                <p>Sedentary</p>
                                <p>{Math.floor(Math.round(personalDbList?.[0]?.[0]?.bmrDb * 1.2)) || ''} cal</p>
                            </div>
                            <div className="bmr-info-row" style={{ backgroundColor: personalDbList?.[0]?.[0]?.activity === 'light' ? 'rgb(232,240,254)rgb(232,240,254)' : '' }}>
                                <p>Light</p>
                                <p>{Math.floor(Math.round(personalDbList?.[0]?.[0]?.bmrDb * 1.375)) || ''} cal</p>
                            </div>
                            <div className="bmr-info-row" style={{ backgroundColor: personalDbList?.[0]?.[0]?.activity === 'moderate' ? 'rgb(232,240,254)' : '' }}>
                                <p>Moderate</p>
                                <p>{Math.floor(Math.round(personalDbList?.[0]?.[0]?.bmrDb * 1.55)) || ''} cal</p>
                            </div>
                            <div className="bmr-info-row" style={{ backgroundColor: personalDbList?.[0]?.[0]?.activity === 'very' ? 'rgb(232,240,254)' : '' }}>
                                <p>Very</p>
                                <p>{Math.floor(Math.round(personalDbList?.[0]?.[0]?.bmrDb * 1.725)) || ''} cal</p>
                            </div>
                            <div className="bmr-info-row" style={{ backgroundColor: personalDbList?.[0]?.[0]?.activity === 'extreme' ? 'rgb(232,240,254)' : '' }}>
                                <p>Extreme</p>
                                <p>{Math.floor(Math.round(personalDbList?.[0]?.[0]?.bmrDb * 1.9)) || ''} cal</p>
                            </div>
                        </div>
                    </div>


                    <div className="bmr-info-container">
                        <div className="bmr-info-title">Recommended Calorie Intake</div>
                        <div className="bmr-info">
                            <div className="bmr-info-row">
                                <p>TDEE</p>
                                <p>{personalDbList?.[0]?.[0]?.tdeeDb || ''} cal</p>
                            </div>
                            <div className="bmr-info-row">
                                <p>BMR</p>
                                <p>{personalDbList?.[0]?.[0]?.bmrDb || ''} cal</p>
                            </div>
                            <div className="bmr-info-row bmr-info-row-text">
                                <p>{`TDEE (Total Daily Energy Expenditure): the total number of calories your body needs to sustain its energy requirements throughout the day, including physical activity.`}</p>
                                <p>{`BMR (Basal Metabolic Rate): the amount of energy (calories) your body needs to maintain basic physiological functions while at rest.`}</p>
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
                
                    <div className="self-widget tdee-cutting" style={{backgroundColor: personalDbList?.[0]?.[0]?.fitnessGoal === 'cut' ? 'rgb(232,240,254)' : ''}}>
                        Cut
                        <div className="tdee-suggested-row">
                            <p>Protein</p>
                            <p>{tdeeDbList?.[0]?.[0]?.cutProtein|| null} g</p>
                            
                        </div>
                        <div className="tdee-suggested-row">  
                            <p>Fat</p>
                            <p>{tdeeDbList?.[0]?.[0]?.cutFat || null} g</p>
                        </div>
                        <div className="tdee-suggested-row">
                            <p>Carbs</p>
                            <p>{tdeeDbList?.[0]?.[0]?.cutCarbs || null} g</p>
                        </div>
                        <div className="tdee-suggested-row">
                            <p>Calories</p>
                            <p>{tdeeDbList?.[0]?.[0]?.cutCalories || null} cal</p>
                        </div>
                    </div>



                    <div className="self-widget tdee-maintenance" style={{backgroundColor: personalDbList?.[0]?.[0]?.fitnessGoal === 'maintain' ? 'rgb(232,240,254)' : ''}}>
                        Maintain
                        <div className="tdee-suggested-row">
                            <p>Protein</p>
                            <p>{tdeeDbList?.[0]?.[0]?.maintainProtein || null} g</p>
                        </div>
                        <div className="tdee-suggested-row">
                            <p>Fat</p>
                            <p>{tdeeDbList?.[0]?.[0]?.maintainFat || null} g</p>
                        </div>
                        <div className="tdee-suggested-row">
                            <p>Carbs</p>
                            <p>{tdeeDbList?.[0]?.[0]?.maintainCarbs || null} g</p>
                        </div>
                        <div className="tdee-suggested-row">
                            <p>Calories</p>
                            <p>{tdeeDbList?.[0]?.[0]?.maintainCalories || null} cal</p>
                        </div>
                    </div>
                    
                    <div className="self-widget tdee-bulking" style={{backgroundColor: personalDbList?.[0]?.[0]?.fitnessGoal === 'gain' ? 'rgb(232,240,254)' : ''}}>
                        Gain
                        <div className="tdee-suggested-row">
                            <p>Protein</p>
                            <p>{tdeeDbList?.[0]?.[0]?.gainProtein || null} g</p>
                        </div>
                        <div className="tdee-suggested-row">
                            <p>Fat</p>
                            <p>{tdeeDbList?.[0]?.[0]?.gainFat || null} g</p>
                        </div>
                        <div className="tdee-suggested-row">
                            <p>Carbs</p>
                            <p>{tdeeDbList?.[0]?.[0]?.gainCarbs || null} g</p>
                        </div>
                        <div className="tdee-suggested-row">
                            <p>Calories</p>
                            <p>{tdeeDbList?.[0]?.[0]?.gainCalories || null} cal</p>
                        </div>
                    </div>
                </div>                          
            </div>
        </div>       
    )
}