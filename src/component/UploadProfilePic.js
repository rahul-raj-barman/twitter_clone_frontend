import React, { useState } from 'react'
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios'
import { API_URL } from '../config';
import { useSelector, useDispatch } from 'react-redux'
import { actionCreators } from '../states'
import swal from 'sweetalert2';

function UploadProfilePic(props) {

    const [image, setImage] = useState("") 
    const [display, setDisplay] = useState("visible")

    const dispatch = useDispatch();
    const updateState = useSelector(state => state.update)

    

    const handleProfilePic = () => {
        console.log(updateState)
        setDisplay('hidden')
        const user = localStorage.getItem('curr_profile')
        const formData = new FormData();
        formData.append('file', image)
        axios.post(`${API_URL}file/${user}/uploadProfilePic`, formData)
        .then((data) => {
          console.log(data)
          // window.location.reload();
          dispatch(actionCreators.update('update'))

        })
        .catch((err) => {
          console.log(err)
        })
      }


      return (
        <div style={{position: 'fixed', zIndex: '5',border: '1px solid #535252', backgroundColor:'white', left:'30vw', visibility: `${display}`}}>  
          <div style={{ padding:'10px'}}>
            <div onClick={props.switch} className='d-flex justify-content-between align-items-center'>Upload Profile Picture<FontAwesomeIcon icon={faXmark} /></div>
            <hr />
            <div style={{backgroundColor: '#83a6fb', fontSize:'.85rem', marginTop: '2vh', borderRadius: '5px', padding: '10px', color: '#022e99', marginBottom: '3vh'}}>Note : The image should be in square in size</div>
            <input style={{border:'1px solid black', padding:'8px', borderRadius: '5px'}} type="file" onChange={(e) => setImage(e.target.files[0])}/>
          </div>
          <hr />
          <div className='d-flex justify-content-end' style={{padding: '10px'}}>
          <button style={{fontSize: '.9rem', padding:'4px', backgroundColor:'#60666d', border: 'none', letterSpacing: '2px', borderRadius: '3px', color: '#f4f4f4', marginRight:'8px'}} onClick={props.switch}>Close</button>
          <button onClick={(e) => handleProfilePic(e)} style={{fontSize: '.9rem', padding:'4px', backgroundColor:'#1b81fb', border: 'none', letterSpacing: '2px', borderRadius: '3px', color: '#f4f4f4'}}>Save Profile Pic</button>
          </div>
        </div>
      );
    }

export default UploadProfilePic