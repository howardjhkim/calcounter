import React, {useState, useContext, useEffect} from 'react'
import { Link, useNavigate } from "react-router-dom"
import {Context} from "../Context/DataContext"
import axios from "axios"

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';


function Login() {
  const {isAuth, addIsAuth} = useContext(Context)
  const {userContext, addUserContext} = useContext(Context)

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const navigate = useNavigate()

  const login = () => {
    const data = {username: username, password: password}
    axios.post("https://calcounter-b4bd1e148395.herokuapp.com/users/login", data).then((res) => {
      if (res.data.error) {
        alert(res.data.error);
      } else {
        localStorage.setItem("accessToken", res.data.token)
        addUserContext({
          username: res.data.username,
          id: res.data.id,
          firstName: res.data.firstName
        })

        localStorage.setItem('userContext', JSON.stringify({
          username: res.data.username,
          id: res.data.id,
          firstName: res.data.firstName
        }));

        alert("login successful")
        addIsAuth(true)
        navigate("/")
      }
    })
  }
    
  useEffect(() => {
    axios.get("https://calcounter-b4bd1e148395.herokuapp.com/users/auth", {headers: {accessToken: localStorage.getItem("accessToken")}}).then((res) => {
      if (res.data.error) {
        addIsAuth(false)
      } else {
        addIsAuth(true)
      }
    })

  }, [])
  

  function Copyright(props) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" to="https://calcounter-v1.netlify.app">
          CALCOUNTER
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }

  return (
    <div className="register-master">
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 0 },
        }}
        noValidate
        autoComplete="off"
      >
        
        <div className="register-wrapper">
          <Avatar 
            sx={{ m: 1, bgcolor: 'secondary.main', margin: '0 auto' }}>
          </Avatar>
          <h2>Log In</h2>
    
          <div>
            <TextField
              fullWidth
              required
              id="username"
              label="Username"
              type="text"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <TextField
              fullWidth
              required
              id="outlined-password-input"
              label="Password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
            <Button
              type="button"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={login}
            >
              Log In
            </Button>
        </div>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </div>
  )
}

export default Login




