import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { API_URL } from '../config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faComment, faRetweet } from '@fortawesome/free-solid-svg-icons';
import Singlepagecomment from './Singlepagecomment';
import { actionCreators } from '../states';
import SingleCommnet from '../pages/SingleComment'
import './singletweet.css'
import { useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';
import { deleteState } from '../states/action-creators';
import Tweetcard from '../component/Tweetcard'

function Singletweet() {
    const [post, setPost] = useState(null);
    const [tweets, setTweets] = useState(null);
    const [replies, setReplies] = useState([])
    const [isDone, setIsdone] = useState(false)
    const [commentOn, setCommentOn] = useState(false);
    const [retweetby, setRetweetby] = useState()
    const [retweeted, setRetweeted] = useState(false)

    const curr_post = useSelector(state => state.singlePost)
    const commentState = useSelector(state => state.addComment)
    const delState = useSelector(state => state.delpost)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLike = (e, event) => {
        if(event) event.stopPropagation();
        const config = {
          headers: {
            Authorization: "Bearer "+ localStorage.getItem("userToken"),
          }
        }
        axios.post(`${API_URL}api/tweet/${e._id}/like`,{"data":"none"},config)
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
        axios.post(`${API_URL}api/tweet/${e._id}/dislike`,{"data":"none"},config)
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

    
    useEffect(() => {
        if(curr_post) {
            localStorage.setItem("curr_post", curr_post)
        }
        
        const header = {
            headers: {
                Authorization: "Bearer " + localStorage.getItem('userToken')
            }
        }
        axios.get(`${API_URL}api/tweet/${localStorage.getItem('curr_post')}`, header)
        .then(data => {
            console.log(data.data.content)
            setPost(data.data)
            setIsdone(true);
        })
        .catch(err => {
            console.log(err.message)
        })

    },[delState])

    useEffect(() => {
        const userToken = localStorage.getItem("userToken")
        console.log(userToken)
        const header = {
          headers: {
            Authorization: "Bearer "+localStorage.getItem("userToken"),
          }
        }
        axios.get(`${API_URL}api/tweet`, header)
        .then((data) => {
          console.log(data.data)
          setTweets(data.data)
    
        })
        .catch((err) => {
          console.log(err)
        })
      },[delState])

    useEffect(() => {
        const temp = [];
        post && post.replies.map((e) => {
            if(tweets) {
            const comments = tweets.filter((tweet) => tweet._id === e);
            temp.push(...comments)
            } 
        })
        setReplies(temp);
        console.log(delState)
    },[tweets, isDone, delState])

    useEffect(() => {
        console.log('reply is')
        console.log(replies)
    }, [replies])

    const handleComment = (e) => {
        e.stopPropagation();
        localStorage.setItem('curr_post', post._id)
        dispatch(actionCreators.deleteState('deletePost'))
        dispatch(actionCreators.commentButton('reverseComment'))

    }

    const handleLikeClick = (e) => {
        if(post){
        const id = localStorage.getItem('loggedInUser')
        const likes = [];
        post.likes.map(e => {
            likes.push(e._id);
        })
        if(likes.includes(id)) {
            handleUnlike(post);
        }
        else handleLike(post);
    }

    }

    const handleSingleTweet = (id) => {
      console.log('clcikedddddd')
      dispatch(actionCreators.setSinglePost(id))
      localStorage.setItem('curr_post', id)
      navigate('/singletweet')
      window.location.reload()
  
    }


  return (
    <div className='main-cont-retweet'>
    {
        commentState ? <SingleCommnet/> : null
    }
    <div className='retweet-cont custom-cont'>
    <div className='profile-pic me-2'>
        <img src="https://images.unsplash.com/photo-1682704109522-56a6fbc1962e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=415&q=80" alt="not found" />
    
    </div>
    
    <div 
    className='retweet-deatils'>
        <div>
        <span className='profile-name'><a href="#">@{post ? post.tweetedBy.userName:null}</a></span>
        <span className='retweet-date'> -Thu Dec 22 2022</span>
        </div>
        <div className="retweet-comment">
        {post ? post.content: null}
        </div>
        {
        post && post.image ? 
        <div className='tweet-image'>
            <img src={post ?  `http://localhost:5000/${post.image}` : null} alt="not found" />
        </div>: null
        }
        <div className="retweet-icons">
            <div onClick={handleLikeClick}><FontAwesomeIcon icon={faHeart} className='likes'/><span>{post? post.likes.length: 0}</span></div>
            
            <div onClick={(e) => handleComment(e)}>
            <FontAwesomeIcon icon={faComment} className='comment'/>
            <span>{post ? post.replies.length: 0}</span>
            </div>

            <div >
            
            <FontAwesomeIcon className='retweet' icon={faRetweet} />
                <span>0</span>
            </div>
        </div>
    </div>
</div>
{
replies.length ? <div style={{marginBottom:'1vh'}}>Replies</div>: null
}
    {
        replies && replies.map((obj) => {
            return (
                <Tweetcard likesArray = {obj.likes}  
                key = {obj._id} 
                post_id={obj._id}
                retweetBy={post.retweetBy}
                  cont={obj.content}
                  image={obj.image ? obj.image : null}
                  user={obj.tweetedBy.userName}
                  userId = {obj.tweetedBy._id}
                  likes={obj.likes.length ? obj.likes.length : 0}
                  handleLike={(event) => handleLike(obj, event)}
                  handleUnlike={() => handleUnlike(obj)}
                  onClick = {() => handleSingleTweet(obj._id)}
                  replies = {obj.replies.length}
                  />
            )
        })
    }
    
    </div>
  )
}

export default Singletweet