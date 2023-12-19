import React, { useContext, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { AlertContext } from '../contexts/AlertContext'

function Login() {
  const navigate = useNavigate()
  const {showAlert} = useContext(AlertContext)
  
  const [user, setUser] = useState({ email: "", password: "" })

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }
  const onSubmit = async (e) => {
    e.preventDefault()
    console.log(user)
    const { email, password } = user
    const res = await fetch("https://react-notes-app-backend.onrender.com/api/v1/user/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        'Content-Type': "application/json"
      },
    })
    const data = await res.json()
    console.log(data)
    if (data.msg === "user not exists, please register") {
      showAlert("warning","user not exists, please register")
      navigate("/signup")
    }
    else if (data.msg === "something went wrong") {
      showAlert("danger","something went wrong try again")
    }
    else if (data.msg === "wrong email or password") {
      showAlert("danger","wrong email or password")
    }
    else if (data.msg === "login success") {
      showAlert("success","login success")
      localStorage.setItem("token", JSON.stringify(data.token))
      navigate("/")
    }
    else if (data.msg === "Internal server error") {
      showAlert("danger","Internal server error")
    }
    setUser({ email: "", password: "" })
  }
  return (
    <>
      <h3 className='text-center text-white'>Login Here</h3>
      <Form onSubmit={onSubmit} style={{ width: "400px" }} className='mx-auto text-white'>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name='email'
            placeholder="Enter Email"
            onChange={onChange}
            value={user.email}
            required
          />

        </Form.Group>

        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name='password'
            placeholder="Password"
            onChange={onChange}
            value={user.password}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>

  )
}

export default Login