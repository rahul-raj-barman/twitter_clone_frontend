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


function Homepage() {
  const [tweets, setTweets] = useState([]);
  const [alltweets, setAlltweets] = useState([])
  const [replies, setReplies] = useState([])
  const [isDone, setIsdone] = useState(false)
  const commentState = useSelector(state => state.addComment)
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const currState = useSelector(state => state.reverse)
  const posts = useSelector(state => state.post)

  useEffect(() => {
    const userToken = localStorage.getItem("userToken")
    const header = {
      headers: {
        Authorization: "Bearer "+localStorage.getItem("userToken"),
      }
    }
    axios.get(`${API_URL}api/tweet`, header)
    .then((data) => {
      setAlltweets(data.data)

    })
    .catch((err) => {
      console.log(err)
    })
  },[])


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

  useEffect(() => {
    const temp = [];
    console.log(isDone);
    // console.log(tweets[0].replies)
    if(isDone && tweets[0].replies) {
        const temp = [];
    tweets && tweets[0].replies.map((e) => {
        const comments = alltweets.filter((tweet) => {
            console.log(tweet._id);
            console.log(e)
            if(tweet._id === e) console.log("YYYYYYYYY")
            return tweet._id === e
        });
        console.log('comments are')
        console.log(comments)
        temp.push(...comments)


    })
    console.log("The temp array  ")
    console.log(temp)
}
    setReplies(temp);
    // console.log('replies are')
    // console.log(replies)
},[tweets, isDone])

useEffect(() => {
    if(replies){
    console.log('replies are')
    console.log(replies)
    }
}, [replies])

  const switchUpload = (e) => {
    dispatch(actionCreators.postButton('reverse'))
    console.log(currState)
  }

  useEffect(() => {
    const userToken = localStorage.getItem("userToken")
    console.log('useeffecttt')
    const header = {
        headers: {
            Authorization: "Bearer " + localStorage.getItem('userToken')
        }
    }
    axios.get(`${API_URL}api/tweet/${localStorage.getItem('curr_post')}`, header)
    .then(data => {
        console.log('tweet collected')
        console.log(data)
        setTweets([data.data])
        setIsdone(true);

    })
    .catch(err => {
        console.log(err.message)
    })
  },[])

  const handleLike = (e, event) => {
    if(event) event.stopPropagation();
    const config = {
      headers: {
        Authorization: "Bearer "+ localStorage.getItem("userToken"),
      }
    }
    axios.post(`${API_URL}api/tweet/${e._id}/like`,{"data":"none"},config)
    .then((result) => {
      console.log(result.headers);
      window.location.reload();
    })
    .catch((err) => {
      console.log(err)
    })
  }
  useEffect(() => {
    replies.map((tweet) => {
        console.log("tweets areeeee")
      console.log(tweet)
    })
  },[replies])

  const handleSingleTweet = (id) => {
    console.log('Yes')
    dispatch(actionCreators.setSinglePost(id))
    localStorage.setItem('curr_post', id)
    navigate('/singletweet')

  }

  return (
        <div style={{marginLeft: '18vw', marginTop: '8vh'}}>
        <Button onClick={(e) => switchUpload(e)} style={{position:"absolute", top: '2vh', right:"10vw", width: '6rem'}}>Post</Button>
        <Popup/>
        {
        commentState ? <Comment/> : null
        }
        {
          tweets && tweets.map((tweet) => {
            if (!tweet.isComment) {
              return (
                <>
                  <Tweetcard onClick={() => handleSingleTweet(tweet._id)} post_id={tweet._id} cont={tweet.content} image={tweet.image ? tweet.image : null} user={tweet.tweetedBy.firstName} likes={tweet.likes.length ? tweet.likes.length : 0} 
                  retweetBy = {tweet.retweetBy}
                  handleLike={() => handleLike(tweet)} />
                  {
                    replies && replies.map((e) => {
                        return(<>
                            <Tweetcard
                            post_id={e._id} cont={e.content} image={e.image ? e.image : null} user={e.tweetedBy.firstName} likes={e.likes.length ? e.likes.length : 0} handleLike={(event) => handleLike(e, event)} />
                            
                            </>)
                    })
                  }
                  
                </>
              );
            } else {
              return null;
            }
          })
        }
        
        

    </div>
  )

}

export default Homepage