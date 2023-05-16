import React, {useState} from "react"




const Context = React.createContext()

function ContextProvider({children}) {
    
    const [foodList, setFoodList] = React.useState([])
    const addFood = (newFood) => {
        newFood.id = foodList.length + 1
        setFoodList([...foodList, newFood]);
    }


    const updateFood = (updatedFood) => {
        setFoodList(updatedFood)
    }
    
    
    const [tdeeMacros, setTdeeMacros] = React.useState([])
    const addTdeeMacros = (newTdeeMacros) => {
        setTdeeMacros([newTdeeMacros])
    }
    

    const [bodyInfo, setBodyInfo] = React.useState([])
    const addBodyInfo = (newBodyInfo) => {
        setBodyInfo([newBodyInfo])
    }

    const [foodDbList, setFoodDbList] = useState([])
    const addFoodDbList = (newFoodDb) => {
        setFoodDbList([newFoodDb])
    }

    // console.log(foodDbList[0])
    

    return (
        <Context.Provider value={{
            foodList, addFood, 
            tdeeMacros, addTdeeMacros, 
            updateFood, 
            bodyInfo, addBodyInfo,
            foodDbList, addFoodDbList
        }}>

            {children}
        </Context.Provider>
    )
}

export {ContextProvider, Context}

