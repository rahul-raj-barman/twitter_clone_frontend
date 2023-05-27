import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios'
import { API_URL } from '../config';
import { faHeart, faComment, faTrashCan} from '@fortawesome/free-regular-svg-icons';
import { faRetweet, faHeart as heart, faComment as comment} from '@fortawesome/free-solid-svg-icons';
import { actionCreators } from '../states';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import './tweetcard.css';
import Swal from 'sweetalert2'
import user from '../images/user.png';





const Retweet = (props) => {
    const [liked, setLiked] = useState();
    const [retweetUser, setRetweetUser] = useState()
    const [showDel, setShowdel] = useState(false)
    const [retweeted, setRetweeted] = useState(false);

    const updateState = useSelector(state => state.update);
    const delState = useSelector(state => state.delpost)
    const navigate = useNavigate();
    
    const curr_user = localStorage.getItem('loggedInUser')
    useEffect(() => {
        if(props.userId === curr_user || props.userdata === curr_user) {
            setShowdel(true)
        }
        let flag = false;
        if(Array.isArray(props.likesArray) && props.likesArray.length ) {
        props.likesArray && props.
        likesArray.map((e) => {
            if(curr_user === e._id) {
                setLiked(false)
                flag = true;
                
            }
        })
    }
        if(!flag) setLiked(true);
    }, [props])
    
    useEffect(() => {
    const header = {
        headers: {
            Authorization : "Bearer " + localStorage.getItem('userToken')
        }
    }
    if(props.retweetBy && props.retweetBy.length) {
    axios.get(`${API_URL}auth/user/${props.retweetBy[props.retweetBy.length - 1]}`, header)
    .then((result) => {
        setRetweetUser(result.data)
    })
    .catch(err => {
      console.log(err)
    })
    }
    }, [retweeted, delState])
    const commentState = useSelector(state => state.addComment)
    const dispatch = useDispatch();
    const handleComment = (id, e) => {
      console.log(id)
        e.stopPropagation();
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
            })
      
            
            return;
          }
        console.log('hello' + id)
        dispatch(actionCreators.commentButton('reverseComment'))
        dispatch(actionCreators.currPost(id))
    }

    let handleRetweet = (e) => {
        e.stopPropagation();
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

            })
      
            
            return;
          }
        const header = {
            headers: {
              Authorization: "Bearer "+localStorage.getItem("userToken"),
            }
          }
        axios.post(`${API_URL}api/tweet/${props.post_id}/retweet`, {}, header)
        .then((result) => {
            setRetweeted(!retweeted)
            dispatch(actionCreators.deleteState('deletePost'))
            window.location.reload();
        })
        .catch((err) => {
            console.log(err)
        })



    } 

    const handleLike = (e) => {
        e.stopPropagation();
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
            })
            return;
          }
        !liked ? props.handleUnlike(): props.handleLike();
        setLiked(!liked)
    }

    const handleSeeProfile = (e) => {
        e.stopPropagation();
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
            })
      
            
            return;
          }
        console.log("userId issss")
        console.log(props.userId)
        console.log(props.userdata)
        if(!props.userdata && !props.userId) return;
        if(props.userdata){
            dispatch(actionCreators.setCurrentUserProfile(props.userdata));
            localStorage.setItem("curr_profile", props.userdata);
        }
        else {
            dispatch(actionCreators.setCurrentUserProfile(props.userId));
            localStorage.setItem("curr_profile", props.userId);
        }
        navigate('/profile');
        
    }

    const handleDelPost  = (e) => {
        e.stopPropagation();
        const header = {
            headers : {
                Authorization : "Bearer " + localStorage.getItem('userToken')
            }
        }
        let id = props.post_id;
        console.log(id)
        axios.delete(`${API_URL}api/tweet/${id}`, header)
        .then((data) => {
            dispatch(actionCreators.deleteState('deletePost'))
        })
        .catch((err) => {
            console.log(err)
        })
    }

    return (
        <div className='retweet-cont' onClick={props.onClick}>
            <div className='profile-pic me-2'>
                <img src={`${API_URL}images/${props.profilepic ? props.profilepic.slice(7) : null}`} onError={(e) => e.target.src = {user}} alt="couldn't found" />
            
            </div>
            
            <div 
            className='retweet-deatils'>
                {
                    retweetUser ? 
                    props.retweetBy ? <div className='retweeted-by'> <FontAwesomeIcon className='retweet' icon={faRetweet} /> retweeted by {retweetUser ? retweetUser.name: null}</div>: null
                    :null
                }
                
                <div>
                
                {
                    showDel ? <div className='del-post' onClick={(e)=> handleDelPost(e)}><FontAwesomeIcon icon={faTrashCan} /></div> : null
                }
                
                <span className='profile-name'><a href="#" onClick={(e) => handleSeeProfile(e)}>@{props.user}</a></span>
                <span className='retweet-date'> -Thu Dec 22 2022</span>
                </div>
                <div className="retweet-comment">
                {props.cont}
                </div>
                {
                props.image ? 
                <div className='tweet-image'>
                    <img src={`http://localhost:5000/${props.image}`} alt="not found" />
                </div>: null
                }
                <div className="retweet-icons">
                    <div onClick={(e) => handleLike(e)}><FontAwesomeIcon icon={liked ? faHeart : heart} className='likes'/><span>{props.likes}</span></div>
                    
                    
                    <div>
                    <FontAwesomeIcon icon={faComment} className='comment' onClick={(e) => handleComment(props.post_id, e)}/>
                    <span>{props.replies ? props.replies:0}</span>
                    </div>

                    <div onClick={(e) => handleRetweet(e)}>
                    
                    <FontAwesomeIcon className='retweet' icon={faRetweet} />
                        <span>{props.retweetBy?props.retweetBy.length:0}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Retweet;
