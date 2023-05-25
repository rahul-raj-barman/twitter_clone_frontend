import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { faCircleXmark} from '@fortawesome/free-solid-svg-icons';
import { actionCreators } from '../states';
import { useDispatch, useSelector } from 'react-redux';
import { API_URL } from '../config';
import axios from 'axios';

const Comment = () => {
  const [reply, setReply] = useState("");
  const current_pid = useSelector((state) => state.post_id)
  const dispatch = useDispatch();
  const onReply = () => {
    dispatch(actionCreators.commentButton('reverseComment'))
    const header = {
      headers: {
        Authorization: "Bearer "+localStorage.getItem("userToken"),
      }
    }
    console.log("token is ++  " +localStorage.getItem("userToken"))
    const body = {
      content: reply,
      isComment: true
    }

    // const comm = {

    //   tweet: reply,
    //   isComment: true,
    //   image: null
    // }

    // dispatch(actionCreators.setPost(dispatch(actionCreators.setPost({ type: 'add', payload: comm}))))

    console.log('cyysfuh');
    console.log(current_pid)

    axios.post(`${API_URL}api/tweet/${current_pid}/reply`, body, header)
    .then((result) => {
      console.log(result);
      dispatch(actionCreators.deleteState('deletePost'))
      
    })
    .catch((err) => {
      console.log(err)
    })
  }

  return (
    <div style={{border: '1px solid black', padding: '20px', position: 'fixed', zIndex: '4', backgroundColor: '#e5e3ea', top: '10px', right:'25vw'}}>
    <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '10px'}}>
      <div><h5>Tweet Your reply</h5></div>
      <div style={{cursor: 'pointer'}} onClick={() =>  dispatch(actionCreators.commentButton('reverseComment'))}><FontAwesomeIcon icon={faCircleXmark} /></div>
    </div>
      <div>
        <textarea name="comment" id="commnet" cols="30" rows="5" onChange={(e) => setReply(e.target.value)}></textarea>

      </div>
      <div style={{display: "flex", justifyContent:'flex-end'}}>
        <button style={{marginRight: '10px', backgroundColor: '#d82747', color: 'white', border: '1px solid black', borderRadius: '10%'}} onClick={() =>  dispatch(actionCreators.commentButton('reverseComment'))}>Close</button>
        <button style={{backgroundColor: '#456eba', color: 'white', border: '1px solid black', borderRadius: '10%'}} onClick={onReply}>Reply</button>
      </div>
    </div>
  );
}

export default Comment;

