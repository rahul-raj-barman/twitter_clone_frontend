import React, { useState } from 'react'
import {Button, Form} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import './register.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Spinner from 'react-bootstrap/Spinner';
import axios from 'axios'
import { Link } from 'react-router-dom'
import { API_URL } from '../config'
import loginImage from '../images/login.jpg'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router'


function Login() {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate();
  const handleRegistration = (e) => {
    setLoading(true);
    e.preventDefault();
    const Data = {
      name: fullname, email:email, 
      username: userName, 
      password: password
    }

    const headers =  {
      "Content-Type": "application/json"
    }

    axios.post(`${API_URL}auth/register`, Data, {header: headers})
    .then((data) => {
        console.log(data)
        setLoading(false)
        navigate('/login')
    })
    .catch((err) => {
      setLoading(false)
      console.log(err.response.status)
        if(err.response.status === 500) {


          Swal.fire({
            title: 'User already exists !!!',
            text: "Go to Login page ?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
          }).then((result) => {
            if (result.isConfirmed) {
              navigate('/login')
            }
          })
        }
    })
  }
  return (
    <div className='cont-body'>
    {
      loading ? <div className='spinner-cont'>
      <Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
      </Spinner>
      </div> : null
    }
        <div className="cont">
            <div className="img-cont">
                <img src={loginImage} alt="not found"/>
            </div>
            <div className="form-cont">
            
            <Form>
            <Form.Text className='title'>Register</Form.Text>
            <Form.Group className="mb-3 mt-1" controlId="formBasicText">
    
              <Form.Control type="text" placeholder="Enter fullname" className='form-inp' onChange={(e) => setFullname(e.target.value)} value={fullname}/>
            </Form.Group>

            <Form.Group className="mb-3 mt-1" controlId="formBasicEmail">
    
              <Form.Control type="email" placeholder="Enter email" className='form-inp' onChange={(e) => setEmail(e.target.value)} value={email}/>
            </Form.Group>

            <Form.Group className="mb-3 mt-1" controlId="formBasicText">
    
              <Form.Control type="text" placeholder="Enter username" className='form-inp' onChange={(e) => setUserName(e.target.value)} value={userName}/>
            </Form.Group>
      
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Control className='form-inp' type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password}/>
            </Form.Group>
            <Button 
            type="submit" className='page-button' onClick={(e) => handleRegistration(e)}>
              Signup
            </Button>
          </Form>
          <Form.Text className='switch-page'>Already have an account?<Link to="/login">Login</Link></Form.Text>
            </div>
        </div>
    </div>
  )
}

export default Login