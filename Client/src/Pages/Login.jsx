import React, {useState, useContext, useEffect} from 'react'
import {Context} from "../Context/DataContext"
import axios from "axios"
import { useNavigate } from 'react-router-dom'

function Login() {
  const {isAuth, addIsAuth} = useContext(Context)
  const {userContext, addUserContext} = useContext(Context)

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const navigate = useNavigate()

  const login = () => {
    const data = {username: username, password: password}

    axios.post("http://localhost:3001/users/login", data).then((res) => {
      if (res.data.error) {
        alert(res.data.error);
      } else {
        localStorage.setItem("accessToken", res.data.token)
        addUserContext({
          username: res.data.username,
          id: res.data.id
        })
        alert("login successful")
        addIsAuth(true)
        navigate("/")
      }
    })
  }

  useEffect(() => {
    axios.get("http://localhost:3001/users/auth", {headers: {accessToken: localStorage.getItem("accessToken")}}).then((res) => {
      if (res.data.error) {
        addIsAuth(false)
      } else {
        addIsAuth(true)
      }
    })
  }, [])

  return (
    <div>
        <input placeholder='Username' onChange={(e) => setUsername(e.target.value)}/>
        <input placeholder='Password'onChange={(e) => setPassword(e.target.value)}/>
        <button onClick={login}>Submit</button>
    </div>
  )
}

export default Login