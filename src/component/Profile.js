import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCakeCandles, faLocationDot, faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'react-bootstrap'
import axios from 'axios';
import { useSelector } from 'react-redux';
import { API_URL } from '../config';
import Tweetcard from './Tweetcard'
import UploadProfilePic from './UploadProfilePic';
import Editprofile from './Editprofile';
import './profile.css'


const Profile = () => {
    const [userData, setUserData] = useState(null);
    const [tweets, setTweets] = useState([])
    const [profileImg, setProfileImg] = useState("");
    const [picPopup, setPicPopup] = useState(false)
    const [editpopup, setEditpopup] = useState(false)

    const[following, setFollowing] = useState(false);
    const delState = useSelector(state => state.delpost)
    const current_user = localStorage.getItem("curr_profile")
    const user = localStorage.getItem('userId')
    useEffect(() => {
        const header = {
            headers : {
                Authorization: "Bearer " + localStorage.getItem('userToken')
            }
        }
        axios.get(`${API_URL}auth/user/${current_user}`, header)
        .then((data) => {
            console.log(data.data)
            setUserData(data.data);
        })
        .catch((err) => {
            console.log(err)
        })
    }, [current_user, delState])
    useEffect(() => {
        const userToken = localStorage.getItem("userToken")
        const header = {
          headers: {
            Authorization: "Bearer "+localStorage.getItem("userToken"),
          }
        }
        axios.get(`${API_URL}api/tweet`, header)
        .then((data) => {
          setTweets(data.data)

    
        })
        .catch((err) => {
          console.log(err)
        })
      },[delState])
      useEffect(() => {
        if(userData && userData.profilePic) {
            const filename = userData.profilePic.slice(7);

            setProfileImg(filename)
        }
        },[userData])
    

    const handleUploadPopup = () => {
        console.log('ok')
        setPicPopup(!picPopup);

    }

    const handleFollow = (e) => {
        console.log('following')
        const headers = {
                Authorization: "Bearer " + localStorage.getItem('userToken')
        }
        
        if(!following){
        axios.put(`${API_URL}auth/user/${current_user}/follow`,null ,{headers})
        .then((data) => {
            console.log('followed')
            setFollowing(true);
        })
        .catch((err) => {
            console.log(err);
        })
        }
        else {
            axios.put(`${API_URL}auth/user/${current_user}/unfollow`,null ,{headers})
        .then((data) => {
            console.log(data)
            setFollowing(false);
            console.log('Unfollowed')
        })
        .catch((err) => {
            console.log(err);
        })
        }
    }

    const handleEditPopup = () => {
        setEditpopup(!editpopup)
    }

    return (
        <>
        {
            editpopup ? <Editprofile switch={handleEditPopup}/> : null
        }
        {
            picPopup ? <UploadProfilePic switch = {handleUploadPopup}/>:null
        }
        
        <div className='profile-cont'>
        
            <div className='top-section'>

            </div>

            <div className="profile-identity">
                <div className="profile-img">
                {
                    <img src={`http://localhost:5000/images/${profileImg}`} onError={(e) => e.target.src = 'https://images.unsplash.com/photo-1611605698335-8b1569810432?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80'} alt="not found" />
                }
                </div>
                {
                    current_user && user && user != current_user ? <div className="follow-button">
                    <Button onClick={(e) => handleFollow(e)}>{!following ? 'Follow' : 'Following'}</Button>
                </div>: 
                <div className='button-cont'>
                <div className='upload-profile-pic'>
                <button onClick={handleUploadPopup}>
                    Upload Profile pic
                </button></div>
                <div className='edit-profile'>
                    <button onClick={() => setEditpopup(!editpopup)}>Edit</button>
                </div>
                </div>
                }
                
            </div>
            <div className="username-cont">
                <div className='username'>
                    {userData ? userData.userName:null}
                </div>
                <div className="email-address">
                    {userData ? userData.email:null}           
                </div>
            
            </div>

            <div className="about-profile">
                <div className="profile-date-location">
                    <div className="birthday">
                        <FontAwesomeIcon icon={faCakeCandles} />
                        <span> Dob, {userData && userData.dob ? userData.dob.slice(0, 10) : "unknown"}</span>
                    </div>
                    <div className="profile-location">
                    <FontAwesomeIcon icon={faLocationDot} />
                    <span> Location, {userData && userData.location ? userData.location : "unknown"}</span>
                    </div>
                </div>

                <div className="profile-creation-date">
                <FontAwesomeIcon icon={faCalendarDays} />
                <span> Joined Tue Dec 2000</span>
                </div>

            </div>
            <div className="follow-details">
                <span>{userData ? userData.followings.length:null} Followings</span>
                <span>{userData?userData.followers.length:null} Followers</span>
            
            </div>

            <div className='tweets-and-replies text-center'>
                <div className='sec-heading'>Tweets and Replies</div>
            </div>

            {
                tweets.map((e) => {
                    console.log(e)
                    return (<div className='posts-comments'>
                    {        
                         e.tweetedBy._id === current_user ?  <Tweetcard key={e._id} post_id ={e._id} user={e.tweetedBy.userName}
                         userId = {e.tweetedBy._id} cont={e.content}likes = {e.likes.length} image = {e.image} profilepic = {e.tweetedBy.profilePic}/>:null
                    }
                        </div>)
                })
            }

        </div>

      

        </>
    );
}

export default Profile;
