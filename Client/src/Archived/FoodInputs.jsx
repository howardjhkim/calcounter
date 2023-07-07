import React, { useContext, useState, useEffect, useRef} from "react"
import {Context} from "../Context/DataContext"
import Axios from "axios"



export default function FoodInputs() {
    ///////////// Component Ref /////////////
    const componentRef = useRef(null)

    
    ///////////// States for inputs /////////////
    const [foodName, setFoodName] = React.useState("")
    const [inputCalPerServ, setInputCalPerServ] = React.useState("")
    const [inputServings, setInputServings] = React.useState("")
    const [inputGrams, setInputGrams] = React.useState("")
    const [inputCarbs, setInputCarbs] = React.useState("")
    const [inputProtein, setInputProtein] = React.useState("")
    const [inputFat, setInputFat] = React.useState("")

    
    ///////////// Database State & Add Function ///////////// 
    const { foodDbList } = useContext(Context)
    const { addFoodDbList } = useContext(Context)

    const accessToken = sessionStorage.getItem("accessToken");
    console.log(accessToken)

    ///////////// Database GET & DELETE ///////////// 
    const addFoodDb = () => {
        const accessToken = sessionStorage.getItem("accessToken");
        if (!accessToken) {
            alert("You must be logged in");
            return;
        }
        Axios.post('http://localhost:3001/food', {
            name: foodName, 
            protein: Number(inputProtein),  
            carbs: Number(inputCarbs),
            fat: Number(inputFat),
            calories: Number(inputCalPerServ)
        }, 
        
        {
            headers: {
                accessToken: accessToken,
            },
        }
        )
        .then((res) => {
            if (res.data.error) {
              console.log(res.data.error);
              alert(res.data.error)
            } else {
                addFoodDbList(
                    [...foodDbList, 
                        {
                            name: foodName, 
                            protein: Number(inputProtein),  
                            carbs: Number(inputCarbs),
                            fat: Number(inputFat),
                            calories: Number(inputCalPerServ)
                        }
                    ]
                )
            }
          });
    }

    ///////////// Data submission button /////////////
    function dataSubmit(e) {
        e.preventDefault();
        
        if (
            (isNaN(Number(inputCalPerServ)) || 
            (isNaN(Number(inputServings)) ||
            (isNaN(Number(inputGrams)) || 
            (isNaN(Number(inputCarbs)) ||
            (isNaN(Number(inputFat)) ||
            (isNaN(Number(inputProtein))))))))
            )
            {
                alert("Please enter numbers only")
            return
        } else {
            addFoodDb()
            clearVals()
        }
    }


    ///////////// clears all inputs /////////////
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