import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMessage, faHome, faUser, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import './sidebar.css'
import { useRef } from 'react';
import { useEffect, useState } from 'react';
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import Swal from 'sweetalert2'
import userpic from '../images/user.png'
import axios from 'axios';
import { API_URL } from '../config'


function ActiveExample() {
  const [prevActive, setPrevActive] = useState("")
  const [profilePic, setProfilepic] = useState()
  const [username, setUsername] = useState()
  const [email, setEmail] = useState()
  const [user, setUser] = useState();

  const navigate = useNavigate();
  const location = useLocation();
  const elementRef = useRef(null)

  useEffect(() => {
    if(elementRef.current) {
      console.log(location.pathname)
      console.log(elementRef.current.style)
      if(location.pathname === '/login' || location.pathname === '/register') {
        elementRef.current.style.visibility = 'hidden'
      }
    }
  },[])


  const header = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem('userToken')
    }
  }
  const userid = localStorage.getItem('loggedInUser')
  useEffect(() => {
    axios.get(`${API_URL}auth/user/${userid}`, header)
    .then((data) => {
      // console.log(data)

      // if(data.data){
      //   setProfilepic(data.dataprofilePic.slice(7))
      // }
      // setEmail(data.data.email)
      // setUsername(data.data.userName)
      // console.log('ooooooooooooooooo')

      // console.log(data.data.userName)
      setUser(data.data)

    })
    .catch((err) => {
      console.log(err);
    })
    
  },[])

  const handleActive = (e) => {
    if(!localStorage.getItem('userToken')) {
      Swal.fire({
        title: 'You are not Logged In !!!',
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
        else {
          navigate('/')
        }
      })

      
      return;
    }
    localStorage.setItem('curr_profile', localStorage.getItem('loggedInUser'))
    
  }

  const handleLogout = (e) => {
      localStorage.removeItem('loggedInUser');
      localStorage.removeItem('userToken')
      navigate('/login');
      window.location.reload();

  }

  return (
    <div className='sidebar-cont' ref={elementRef}>
        <div className="sidebar">
            <ul>
                <li><i><FontAwesomeIcon icon={faMessage} /></i></li>

                <NavLink className='nav-link' to="/">
                <li>
                <i><FontAwesomeIcon icon={faHome} /></i><span>Home</span></li>
                </NavLink>

                
                
                <NavLink className='nav-link' to ="/profile">
                <li onClick={(e) => handleActive(e)}>
                
                <i><FontAwesomeIcon icon={faUser} /></i><span>Profile</span></li>
                </NavLink>
                <li className='nav-link' onClick={(e) => handleLogout(e)}><i><FontAwesomeIcon icon={faArrowRightFromBracket} /></i><span>Logout</span></li>
            </ul>

            {
              user&&user.userName ? <div id='userProfile'>
              <img style={{borderRadius: '10px'}} src={user.profilePic ? `http://localhost:5000/images/${user.profilePic.slice(7)}` : userpic} alt="" height={`25px`}/>
              <span style={{fontSize: '1.2rem'}}>{user.name} <br /> <span style={{fontSize: '.9rem'}} id='email-span'>@{user.email.slice(0, user.email.indexOf('@'))}</span> </span>
            </div>: null
            }
            
        </div>
    </div>
  );
}

export default ActiveExample;