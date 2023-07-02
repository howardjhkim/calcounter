import React, {useState} from 'react'
import axios from "axios"

function Login() {

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")


  const login = () => {
    axios.post("http://localhost:3001/auth/login")
  }

  return (
    <div>
        <input placeholder='Username' onChange={(e) => setUsername(e.target.value)}/>
        <input placeholder='Password'onChange={(e) => setPassword(e.target.value)}/>
        <button>Submit</button>
    </div>
  )
}

export default Login