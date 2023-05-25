import React, { useState } from 'react'
import {Button, Form} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import Spinner from 'react-bootstrap/Spinner';
import { Link } from 'react-router-dom'
import {useNavigate} from 'react-router-dom'
import './login.css'
import axios from 'axios'
import { API_URL } from '../config'
import loginImage from '../images/login.jpg'
import Swal from 'sweetalert2'


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate();

  const handleLogin = (e) => {
    console.log(password)
    e.preventDefault();
    setLoading(true);
    const data = {
      email, password
    };

    axios.post(`${API_URL}auth/login`, data)
    .then((data) => {
      setLoading(false);
      console.log(data.data)
      localStorage.setItem("userToken", data.data.token);
      localStorage.setItem('userId', data.data.user._id)
      localStorage.setItem('loggedInUser', data.data.user._id)
      navigate('/')
      window.location.reload();
    })
    .catch((err) => {
      setLoading(false)
      console.log(err)
      if(err.response.status === 404 ||err.response.status === 401) {
        Swal.fire("Invalid Credentails !!!")
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
            <Form.Text className='title'>Login</Form.Text>
            <Form.Group className="mb-3 mt-1" controlId="formBasicEmail">
    
              <Form.Control type="email" placeholder="Enter email" className='form-inp' onChange={(e) => setEmail(e.target.value)} value={email}/>
            </Form.Group>
      
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Control className='form-inp' type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password}/>
            </Form.Group>
            <Button 
            type="submit" className='page-button' onClick={(e) => handleLogin(e)}>
              Login
            </Button>
          </Form>
          <Form.Text className='switch-page'>Don't have an account?<Link to="/register">Signup</Link></Form.Text>
            </div>
        </div>
    </div>
  )
}

export default Login