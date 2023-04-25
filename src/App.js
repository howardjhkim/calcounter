import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, NavLink, Outlet } from "react-router-dom";

import Home from "./Pages/Home"
import TDEE from "./Pages/TDEE"
import Workouts from "./Pages/Workouts"

import Header from "./Components/Header"
import FoodInputs from "./Components/FoodInputs"
import FoodTable from "./Components/FoodTable"

import Layout from "./Components/Layout"
import {ContextProvider} from "./Context/DataContext"

function App() {
    
    return (
      <ContextProvider>
          <BrowserRouter>
              <Routes>
                  <Route path="/" element={<Layout />}>
                      <Route index element={<Home />} />
                      <Route path="tdee" element={<TDEE />} />
                      <Route path="workouts" element={<Workouts />} />
                  </Route>
              </Routes>
          </BrowserRouter>
      </ContextProvider>
  )
}


export default App;
