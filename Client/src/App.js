import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, NavLink, Outlet } from "react-router-dom";

import Home from "./Pages/Home"
import TDEE from "./Pages/TDEE"
import Workouts from "./Pages/Workouts"
import Login from "./Pages/Login"
import Register from "./Pages/Register"
import Profile from "./Pages/Profile"
import Help from "./Pages/Help"
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
                      <Route path="login" element={<Login />} />
                      <Route path="register" element={<Register />} />
                      <Route path="profile/:id" element={<Profile />} />
                      <Route path="help" element={<Help />} />
                  </Route>
              </Routes>
          </BrowserRouter>
      </ContextProvider>
  )
}


export default App;
