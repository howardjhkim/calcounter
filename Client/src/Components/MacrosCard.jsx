import React, { useContext, useState, useEffect} from "react"
import {Context} from "../Context/DataContext"

import carbIcon from "../Images/carbIcon.svg"
import fatsIcon from "../Images/fatIcon.svg"
import caloriesIcon from "../Images/caloriesIcon.svg"
import meatIcon from "../Images/meatIcon.svg"
import Axios from 'axios'

import macroscard from "../CSS/MacrosCard.css"

import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';







export default function MacrosCard() {
    
    ///////////// Database State Datas /////////////
    const { foodDbList } = useContext(Context)
    const { addFoodDbList } = useContext(Context)

    const {tdeeDbList} = useContext(Context)
    const { addTdeeDbList } = useContext(Context)


    const {personalDbList} = useContext(Context)
    const { addPersonalDbList } = useContext(Context)





    ///////////// Database GET & DELETE /////////////
    Axios.get('http://localhost:3001/tdee').then((response) => {
        addTdeeDbList(response.data)
    })



    Axios.get('http://localhost:3001/personal').then((response) => {
        addPersonalDbList(response.data)
    })


    ///////////// Initial macros values /////////////
    let protein = 0;
    let carbs = 0;
    let fat = 0;
    let calories = 0;

        
    ///////////// Accumulate total macros if food has been submitted /////////////
    if (foodDbList[0]) {
        protein = foodDbList[0].reduce((acc, curr) => acc + curr.protein, protein);
        carbs = foodDbList[0].reduce((acc, curr) => acc + curr.carbs, carbs);
        fat = foodDbList[0].reduce((acc, curr) => acc + curr.fat, fat);
        calories = foodDbList[0].reduce((acc, curr) => acc + curr.calories, calories);
    }

        
    ///////////// Initial macros percentage values /////////////
    let proteinCurrPercentage = 0;
    let carbsCurrPercentage = 0;
    let fatCurrPercentage = 0;
    let caloriesCurrPercentage = 0;
   

    ///////////// Calculates the macros percentage if TDEE AND food has been submitted /////////////
    if (foodDbList[0] && tdeeDbList[0]?.[0]) {
        proteinCurrPercentage = Math.floor(((protein / tdeeDbList[0][0].cutProtein) * 100))
        carbsCurrPercentage = Math.floor(((carbs / tdeeDbList[0][0].cutCarbs) * 100))
        fatCurrPercentage = Math.floor(((fat / tdeeDbList[0][0].cutFat) * 100))
        caloriesCurrPercentage = Math.floor(((fat / tdeeDbList[0][0].cutCalories) * 100))
    }
    
       
    ///////////// State used to graphically display progress bar increment/decrements /////////////
    const [macroPercent, setMacroPercent] = useState({
        protein: 0,
        carbs: 0,
        fat: 0,
        calories: 0
    })
    
    
    ///////////// Progressbar function /////////////
    const useProgressBar = (macroName, endValue, setMacroPercent) => {
        let speed = 12;
        useEffect(() => {
            const progress = setInterval(() => {
                
                if (endValue > macroPercent[macroName]) {
                    setMacroPercent((prevValue) => {
                        const nextValue = prevValue[macroName] + 1;                        
                        if (nextValue === endValue) {
                            clearInterval(progress);
                        };
                        
                        return {
                            ...prevValue,
                            [macroName]: nextValue
                        };
                    });
                } else if (endValue < macroPercent[macroName]) {
                    setMacroPercent((prevValue) => {
                        const nextValue = prevValue[macroName] - 1;                        
                        if (nextValue === endValue) {
                            clearInterval(progress);
                        };
                        
                        return {
                            ...prevValue,
                            [macroName]: nextValue
                        };
                    });
                }  
            }, speed);
            return () => clearInterval(progress);
        }, [endValue]);
    }

    useProgressBar("protein", proteinCurrPercentage, setMacroPercent);
    useProgressBar("carbs", carbsCurrPercentage, setMacroPercent);
    useProgressBar("fat", fatCurrPercentage, setMacroPercent);
    useProgressBar("calories", caloriesCurrPercentage, setMacroPercent);




    ///////////// Used for mapping cards dynamically /////////////
    const macroData = [
        {
          name: 'Protein',
          icon: meatIcon,
          color: '#F6D4D4',
          state: protein,
          suggested: tdeeDbList?.[0]?.[0]?.[`${personalDbList?.[0]?.[0]?.fitnessGoal}Protein`] || 0,
          percent: macroPercent.protein,
          iconClass: 'card-1-icon-bg',
        },
        {
          name: 'Carbs',
          icon: carbIcon,
          color: '#F2DBB9',
          state: carbs,
          suggested: tdeeDbList?.[0]?.[0]?.[`${personalDbList?.[0]?.[0]?.fitnessGoal}Carbs`] || 0,
          percent: macroPercent.carbs,
          iconClass: 'card-2-icon-bg',
        },
        {
          name: 'Fat',
          icon: fatsIcon,
          color: '#7CBF85',
          state: fat,
          suggested: tdeeDbList?.[0]?.[0]?.[`${personalDbList?.[0]?.[0]?.fitnessGoal}Fat`] || 0,
          percent: macroPercent.fat,
          iconClass: 'card-3-icon-bg',
        },
        {
          name: 'Calories',
          icon: caloriesIcon,
          color: '#8BAEC1',
          state: calories,
          suggested: tdeeDbList?.[0]?.[0]?.[`${personalDbList?.[0]?.[0]?.fitnessGoal}Calories`] || 0,
          percent: macroPercent.calories,
          iconClass: 'card-4-icon-bg',
        },
    ];







    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };
        window.addEventListener('rezise', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [windowWidth])

    const shouldRenderCarousel = windowWidth < 400;

    

    return (
      
            <div className="macros-card-grid">
                {macroData.map((data, index) => (
                <div className={`card-${index + 1}`} key={index}>
                    <div className="macro-name-with-icon-container">
                    <span className="macros-card-macro-name">{data.name}</span>
                    <img className={`macroscard-icon ${data.iconClass}`} src={data.icon} alt={data.name} />
                    </div>
        
                    <div className="suggested-consumed-master-container">
                    <div className="suggested-consumed-sub-container">
                        <span className="consumed-suggested-text">Consumed</span>
                        <span className="macro-counter">{data.state || 0}</span>
                    </div>
        
                    <div className="suggested-consumed-sub-container">
                        <span className="consumed-suggested-text">Suggested</span>
                        <span className="macro-counter">{data.suggested}</span>
                    </div>
                    </div>
        
                    <div className="macros-card-progressbar-container">
                    <div className="progress-container">
                        <div
                        className="linear-progress"
                        style={{
                            width: `${data.percent > 100 ? 100 : data.percent || 0}%`,
                            background: data.color,
                        }}
                        ></div>
                        <span className="percentage">
                        {data.percent > 0 ? `${data.percent} %` : '0 %'}
                        </span>
                    </div>
                    </div>
                </div>
                ))}
            </div>
    )
}