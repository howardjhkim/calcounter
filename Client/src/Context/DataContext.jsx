import React, {useState} from "react"




const Context = React.createContext()

function ContextProvider({children}) {

    const [userContext, setUserContext] = React.useState([])
    const addUserContext = (newUser) => {
        setUserContext([newUser])
    }
    
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


    const [tdeeDbList, setTdeeDbList] = useState([])
    const addTdeeDbList = (newTdeeDb) => {
        setTdeeDbList([newTdeeDb])
    }

    const [personalDbList, setPersonalDbList] = useState([])
    const addPersonalDbList = (newPersonalDbList) => {
        setPersonalDbList([newPersonalDbList])
    }

    const [isAuth, setIsAuth] = useState(false)
    const addIsAuth = (newIsAuth) => {
        setIsAuth(newIsAuth)
    }

    return (
        <Context.Provider value={{
            foodList, addFood, 
            tdeeMacros, addTdeeMacros, 
            updateFood, 
            bodyInfo, addBodyInfo,
            foodDbList, addFoodDbList,
            tdeeDbList, addTdeeDbList,
            personalDbList, addPersonalDbList,
            isAuth, addIsAuth, 
            userContext, addUserContext
        }}>

            {children}
        </Context.Provider>
    )
}

export {ContextProvider, Context}

