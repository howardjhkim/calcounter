import React, { useContext, useState, useEffect, useRef} from "react"
import {Context} from "../Context/DataContext"
import Axios from "axios"



export default function FoodInputs() {
    //for using componentRef.currentd
    const componentRef = useRef(null)
    
    //inline function that adds food/state to the DataContext
    const { addFood } = useContext(Context);

    //input value states
    const [foodName, setFoodName] = React.useState("")
    const [inputCalPerServ, setInputCalPerServ] = React.useState("")
    const [inputServings, setInputServings] = React.useState("")
    const [inputGrams, setInputGrams] = React.useState("")
    const [inputCarbs, setInputCarbs] = React.useState("")
    const [inputProtein, setInputProtein] = React.useState("")
    const [inputFat, setInputFat] = React.useState("")
    

    

    const { foodDbList } = useContext(Context)
    const { addFoodDbList } = useContext(Context)


    const addFoodDb = () => {
        Axios.post('http://localhost:3001/create', {
            name: foodName, 
            protein: Number(inputProtein),  
            carbs: Number(inputCarbs),
            fat: Number(inputFat),
            calories: Number(inputCalPerServ)
        })
        addFoodDbList(
            [
                ...foodDbList, 
                {
                    name: foodName, 
                    protein: Number(inputProtein),  
                    carbs: Number(inputCarbs),
                    fat: Number(inputFat),
                    calories: Number(inputCalPerServ)
                }
            ])
    }

















    
    //completed food data
    const [food, setFood] = React.useState([])
    
    
    // current new food object based on input value - before button submission
    let newFood = {
        food: foodName,
        calPerServ: Number(inputCalPerServ),
        servings: Number(inputServings),
        grams: Number(inputGrams),
        carbs: Number(inputCarbs),
        fat: Number(inputFat),
        protein: Number(inputProtein),
        // calories: (calPerServ * servings) * grams
    }  
    
    //toggles the food input container
    function OpenContainer() {        
        useEffect(() => {
            document.body.addEventListener('click', e => {
                const foodInputDetailsContainer = document.querySelector(".food-input-details-container")
                const linebreak = document.querySelector(".linebreak")
                
                if (componentRef.current) {
                    if(
                    e.target.classList.contains("food-input-container") 
                    || e.target.classList.contains("food-input-starter")
                    || e.target.classList.contains("food-input-details-container")  
                    || e.target.classList.contains("food-input-details-subcontainer")
                    || e.target.classList.contains("food-input-details-category")
                    || e.target.classList.contains("food-input-details-input")
                    || e.target.classList.contains("submitBtn")) {
                        foodInputDetailsContainer.style.display = "flex";
                    } else {
                        foodInputDetailsContainer.style.display = "none";
                    }
                }
            })
        }, [])  
    }
    OpenContainer()


    // data submission button function
    function dataSubmit(e) {
        e.preventDefault();
        
        if
        (
            (isNaN(Number(inputCalPerServ)) || 
            (isNaN(Number(inputServings)) ||
            (isNaN(Number(inputGrams)) || 
            (isNaN(Number(inputCarbs)) ||
            (isNaN(Number(inputFat)) ||
            (isNaN(Number(inputProtein)))))))))
            {
            alert("Please enter numbers only")
            return
        } else {
            addFood(newFood)
            addFoodDb()
            clearVals()
        }
    }
    
    //clears all inputs
    function clearVals() {
        setFoodName('')
        setInputCalPerServ('')
        setInputServings('')
        setInputGrams('')
        setInputProtein('')
        setInputCarbs('')
        setInputFat('')
    }
    
    
    return (
        <div className="widget">
                <div className="component-title-container">
                    <span className="component-title">Food Log</span>
                    <span className="component-subtitle">Input the details of the food you ate:</span>              
                </div>
                <div className="food-input-container widget" ref={componentRef}>
                    <input 
                    className="food-input-starter" 
                    placeholder="What did you eat today?"
                    value={foodName}
                    onChange={e => setFoodName(e.target.value)}/>

                    <div className="food-input-details-container">
                        
                        <div className="food-input-details-subcontainer">
                            <span className="food-input-details-category">Food Weight</span>
                            <div className="food-input-details">
                                <p>Calories per Serving</p>
                                <input 
                                className="food-input-details-input" 
                                value={inputCalPerServ}
                                onChange={e => setInputCalPerServ(e.target.value)}/>
                            </div>
                            <div className="food-input-details">
                                <p>Servings</p>
                                <input 
                                className="food-input-details-input" 
                                value={inputServings}
                                onChange={e => setInputServings(e.target.value)}/>
                            </div>
                            <div className="food-input-details">
                                <p>Grams</p>
                                <input 
                                className="food-input-details-input" 
                                value={inputGrams}
                                onChange={e => setInputGrams(e.target.value)}/>
                            </div>
                        </div>
                        
                        
                        
                        
                        <div className="food-input-details-subcontainer">
                            <span className="food-input-details-category">Macros</span>
                            <div className="food-input-details">
                                <p>Protein</p>
                                <input 
                                className="food-input-details-input" 
                                value={inputProtein}
                                onChange={e => setInputProtein(e.target.value)}/>
                            </div>
                            <div className="food-input-details">
                                <p>Carbs</p>
                                <input 
                                className="food-input-details-input" 
                                value={inputCarbs}
                                onChange={e => setInputCarbs(e.target.value)}/>
                            </div>
                            <div className="food-input-details">
                                <p>Fat</p>
                                <input 
                                className="food-input-details-input" 
                                value={inputFat}
                                onChange={e => setInputFat(e.target.value)}/>
                            </div>
                        </div>
                        
                        
                        
                        <button className="submitBtn" onClick={dataSubmit}>Submit</button>
                    </div>
                </div>
        </div>
    ) 
}