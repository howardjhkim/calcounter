import React from "react"




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
    

    return (
        <Context.Provider value={{
            foodList, addFood, 
            tdeeMacros, addTdeeMacros, 
            updateFood, 
            bodyInfo, addBodyInfo
        }}>

            {children}
        </Context.Provider>
    )
}

export {ContextProvider, Context}

