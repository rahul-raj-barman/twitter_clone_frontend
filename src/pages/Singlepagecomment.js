import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { API_URL } from '../config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faComment, faRetweet } from '@fortawesome/free-solid-svg-icons';
import { actionCreators } from '../states';
import { useState } from 'react';
import Swal from 'sweetalert2'

const Singlepagecomment = (props) => {
    
    const [liked, setLiked] = useState(false)

    const dispatch = useDispatch();
    const id = useSelector((state) => state.singlePost)
    const handleClcick = () => {
        dispatch(actionCreators.setSinglePost(props.pid))
        localStorage.setItem('curr_post', props.pid)
        window.location.reload();
        console.log('clicked')
    }

    const handleComment = (e) => {
        localStorage.setItem('curr_post', props.pid)
        console.log(props.id)
        e.stopPropagation();
        dispatch(actionCreators.commentButton('reverseComment'))
    }

    const handleLike = (e, event) => {
        if(event) event.stopPropagation();
        const config = {
          headers: {
            Authorization: "Bearer "+ localStorage.getItem("userToken"),
          }
        }
        axios.post(`${API_URL}api/tweet/${e}/like`,{"data":"none"},config)
        .then((result) => {
          dispatch(actionCreators.deleteState('deletePost'))
          
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
            title: 'Liked Tweet'
          })
          
    
        })
        .catch((err) => {
          console.log(err)
        })
      }

      const handleUnlike = (e, event) => {
        if(event) event.stopPropagation();
        const config = {
          headers: {
            Authorization: "Bearer "+ localStorage.getItem("userToken"),
          }
        }
        console.log(e._id)
        axios.post(`${API_URL}api/tweet/${e}/dislike`,{"data":"none"},config)
        .then((result) => {
          dispatch(actionCreators.deleteState('deletePost'))
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
            title: 'Unliked Tweet'
          })
          
        })
        .catch((err) => {
          console.log(err)
        })
      }

    const handleLikeClick = (e) => {
        e.stopPropagation()
        console.log(props.id)
        handleLike(props.id);

    }

    return (
        <div className='retweet-cont' onClick={handleClcick}>
    <div className='profile-pic me-2'>
        <img src="https://images.unsplash.com/photo-1548544149-4835e62ee5b3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80" alt="not found" />
    
    </div>
    
    <div 
    className='retweet-deatils'>
        
        <div className='retweeted-by'> <FontAwesomeIcon className='retweet' icon={faRetweet} /> retweeted by {null}</div>
        
         
        <div>
        <span className='profile-name'><a href="#">@{props.commentedBy}</a></span>
        <span className='retweet-date'> -Thu Dec 22 2022</span>
        </div>
        <div className="retweet-comment">
        {props.content}
        </div>
        <div className="retweet-icons">
            <div onClick={(e) => handleLikeClick(e)}><FontAwesomeIcon icon={faHeart} className='likes'/><span>{props.likes}</span></div>
            
            <div onClick={(e) => handleComment(e)}>
            <FontAwesomeIcon icon={faComment} className='comment'/>
            <span>1</span>
            </div>

            <div>
            
            <FontAwesomeIcon className='retweet' icon={faRetweet} />
                <span>0</span>
            </div>
        </div>
    </div>
</div>
    );
}

export default Singlepagecomment;
