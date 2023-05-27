import React, { useEffect, useState } from 'react'
import Tweetcard from '../component/Tweetcard'
import Comment from '../component/Comment'
import Popup from '../component/Upload'
import { Button } from 'react-bootstrap'
import axios from 'axios'
import { API_URL } from '../config'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { actionCreators } from '../states/index'
import Swal from 'sweetalert2'


function Homepage() {
  const [tweets, setTweets] = useState([]);
  const commentState = useSelector(state => state.addComment)
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const currState = useSelector(state => state.reverse)
  const posts = useSelector(state => state.post)
  const delState = useSelector(state => state.delpost)
  useEffect(() => {
    
    console.log("comment state is "+ commentState)
    console.log(posts)
    posts.map((post) => {
      if(post){ 
      // console.log(post.payload.tweet)
      const content = post.payload.tweet
      // console.log(post.payload.image.name)
      let image;
      post.payload.image ? image = "images\\"+ post.payload.image.name : image = null;
      const user = "none";
      setTweets([...tweets, {content:content, image:image, tweetedBy:{userName: user}, "likes": "0", replies:[]}])
      }

    })
  }, [posts, commentState])

  const switchUpload = (e) => {
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
    dispatch(actionCreators.postButton('reverse'))  
  }

  useEffect(() => {
    
    console.log(delState)
    const header = {
      headers: {
        Authorization: "Bearer "+localStorage.getItem("userToken"),
      }
    }
    axios.get(`${API_URL}api/tweet`, header)
    .then((data) => {
      setTweets(data.data)
      console.log("deState is changedddddd")

    })
    .catch((err) => {
      console.log(err)
    })
  },[currState, commentState, delState])

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


  const handleSingleTweet = (id) => {
    dispatch(actionCreators.setSinglePost(id))
    localStorage.setItem('curr_post', id)
    navigate('/singletweet')

  }

  useEffect(() => {
    console.log(tweets)
  }, [tweets])

  return (
    <div style={{ marginLeft: '18vw', marginTop: '8vh' }}>
      <Button onClick={(e) => switchUpload(e)} style={{ position: "absolute", top: '2vh', right: "10vw", width: '6rem' }}>Post</Button>
      <Popup />
      {commentState ? <Comment /> : null}
      {tweets && tweets.map((tweet) => (
        tweet && !tweet.isComment && (
          <React.Fragment key={tweet._id}>
            <Tweetcard onClick={() => handleSingleTweet(tweet._id)}
            likesArray = {tweet.likes} post_id={tweet._id} cont={tweet.content} userdata = {tweet.tweetedBy._id} image={tweet.image ? tweet.image : null} user={tweet.tweetedBy.userName} likes={tweet.likes.length ? tweet.likes.length : 0}
            profilepic = {tweet.tweetedBy.profilePic}
            replies = {tweet.replies.length}
              retweetBy={tweet.retweetBy}
              handleLike={() => handleLike(tweet)}
              handleUnlike={() => handleUnlike(tweet)}
               />
            {tweet.replies.map((com) => {
              let foundTweet = tweets.find((obj) => obj._id === com);
              if (foundTweet) {
                console.log('foundTweet')
                console.log(foundTweet)
                return (
                  <div key={foundTweet._id}>
                    <Tweetcard
                    likesArray = {foundTweet.likes}   
                    post_id={foundTweet._id}
                    retweetBy={tweet.retweetBy}
                    profilepic = {tweet.tweetedBy.profilePic}
                      cont={foundTweet.content}
                      image={foundTweet.image ? foundTweet.image : null}
                      user={foundTweet.tweetedBy.userName}
                      userId = {foundTweet.tweetedBy._id}
                      replies = {foundTweet.replies.length}
                      likes={foundTweet.likes.length ? foundTweet.likes.length : 0}
                      handleLike={(event) => handleLike(foundTweet, event)}
                      handleUnlike={() => handleUnlike(foundTweet)} />
                  </div>
                );
              }
              return <div></div>;
            })}
          </React.Fragment>
        )
      ))}
    </div>
  );
  
  
}

export default Homepage