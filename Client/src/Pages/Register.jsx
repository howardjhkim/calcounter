import React, {useState} from "react"
import { Link } from "react-router-dom"
import axios from "axios";
import RegisterCSS from "../CSS/Register.css"


import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';


export default function Register() {
  const [username, setUserName] = useState("")
  const [password, setPassword] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  
  const onSubmit = () => {
    axios.post('https://calcounter-b4bd1e148395.herokuapp.com/users', {
        username: username, 
        password: password,
        firstName: firstName,
        lastName: lastName  
    })
  };

  function Copyright(props) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" to="https://calcounter-v1.netlify.app/">
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
          <h2>Register</h2>
          <div className="name-row" style={{ display: 'flex' }}>
            <div style={{ flex: 1, marginRight: '5px' }}>
              <TextField
                required
                fullWidth
                id="first-name"
                label="First Name"
                type="text"
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div style={{ flex: 1, marginLeft: '5px' }}>
              <TextField
              required
              fullWidth
                id="last-name"
                label="Last Name"
                type="text"
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>
          
          <div>
            <TextField
              fullWidth
              required
              id="username"
              label="Username"
              type="text"
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <div>
            <TextField
              fullWidth
              required
              id="outlined-password-input"
              label="Password"
              type="password"
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={onSubmit}
            >
              Register
            </Button>
        </div>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </div>
  );
}