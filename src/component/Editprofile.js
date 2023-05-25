import React, { useEffect } from 'react';
import './editprofile.css'
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { API_URL } from '../config';
import axios from 'axios'
import Swal from 'sweetalert2'

const Editprofile = (props) => {
    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [dob, setDob] = useState("")
    const [userData, setUserdata] = useState();
    const userid = localStorage.getItem('loggedInUser')
    useEffect(() => {
        const header = {
            headers: {
                Authorization: "Bearer " + localStorage.getItem('userToken')
            }
        }
        axios.get(`${API_URL}auth/user/${userid}`, header)
        .then((data) => {
            console.log(data.data)
            setUserdata(data.data);
            setName(data.data.name)
            
        })
        .catch((err) => {
            console.log(err)
        })
    },[])

    const handleEdit = () => {
        console.log('yo')
        const obj = {
            name, location, dob 
        }
        const header = {
            headers: {
                Authorization: "Bearer " + localStorage.getItem('userToken')
            }
        }
        axios.put(`${API_URL}auth/user/${userid}`, obj, header)
        .then((data) => {
            console.log(data)
            window.location.reload();
        })
        .catch((err) => {
            console.log(err)
            if(err.response.status === 401) {
                Swal.fire('Please fill the empty fields !!!')
            }

        })
    } 

    return (
        <div className='edit-cont'>
            <div className='edit-first-section'>
                <div>Edit Profile</div>
                <div onClick = {props.switch}><FontAwesomeIcon icon={faXmark} /></div>
            </div>
            <hr />
            <div className='edit-form'>
                <label htmlFor="name" onChange={(e) => setName(e.target.value)}>Name</label>
                <input type="text" id='name' onChange={(e) => setName(e.target.value)} value={name}/>
                <label htmlFor="location">Location</label>
                <input type="text" id='location' onChange={(e) => setLocation(e.target.value)}/>
                <label htmlFor="dob">Date of Birth</label>
                <input type="date" id='dob' onChange={(e) => setDob(e.target.value)}/>
            </div>
            <hr />
            <div className='butt-cont'>
                <button onClick={props.switch}>Close</button>
                <button onClick={handleEdit}>Edit</button>
            </div>
        </div>
    );
}

export default Editprofile;
