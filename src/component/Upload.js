import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./Popup.css";
import axios from "axios";
import { API_URL } from '../config'
import { actionCreators } from "../states";
import Swal from 'sweetalert2'

function Popup(props) {
  const [tweet, setTweet] = useState("");
  const [image, setImage] = useState("");
  const [show, setShow] = useState(false)

  const currState = useSelector(state => state.reverse);
  const dispatch = useDispatch();
  useEffect(() => {
    if(currState === false) {
      setShow('hidden')
    }
    else {
      setShow('visible')
    }
    console.log("State is " + currState)

  })

  const handleSubmit = (e) => {
    e.preventDefault()

    dispatch(actionCreators.setPost({ type: 'add', payload: {tweet, image, show} }))
    console.log(tweet + "  " + image)
    const header = {
      headers: {
        Authorization: "Bearer "+localStorage.getItem("userToken"),
        'Content-Type': 'multipart/form-data'
      }
    }
    const formData = new FormData();
    formData.append('content', tweet);
    formData.append('file', image);

    axios.post(`${API_URL}api/tweet`, formData, header)
    .then((result) => {
      dispatch(actionCreators.postButton('reverse'))

      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      
      Toast.fire({
        icon: 'success',
        title: 'Posted successfully'
      })
      

      console.log(result)
    })
    .catch((err) => {
      console.log(err)
    })

  }

  return (
    <div className="popup" style={{visibility:show}}>
      <div className="popup_inner">
        <h2>Upload Post</h2>
        <form onSubmit={ (e) => handleSubmit(e)}>
          <label>
            Tweet:
            <textarea value={tweet} onChange={(e) => setTweet(e.target.value)}/>
          </label>
          <br />
          <label>
            Image:
            <input type="file" onChange={(e) => setImage(e.target.files[0])} />
          </label>
          <br />
          <button type="submit">Upload</button>
          <button onClick={props.closePopup}>Cancel</button>
        </form>
      </div>
    </div>
  );
}

export default Popup;

