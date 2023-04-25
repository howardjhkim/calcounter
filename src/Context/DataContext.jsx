import React from "react"

const Context = React.createContext()

function ContextProvider({children}) {
    const [foodList, setFoodList] = React.useState([])
    const addFood = (newFoodList) => {
        setFoodList([...foodList, newFoodList])
    }
    
    
    const [tdeeMacros, setTdeeMacros] = React.useState([])
    const addTdeeMacros = (newTdeeMacros) => {
        setTdeeMacros([newTdeeMacros])
    }
        
    return (
        <Context.Provider value={{foodList, addFood, tdeeMacros, addTdeeMacros}}>
            {children}
        </Context.Provider>
    )
}

export {ContextProvider, Context}

