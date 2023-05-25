import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faComment, faRetweet } from '@fortawesome/free-solid-svg-icons';
import './retweet.css';

const Retweet = () => {
    return (
        <div className='retweet-cont'>
            <div className='profile-pic me-2'>
                <img src="https://images.unsplash.com/photo-1548544149-4835e62ee5b3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80" alt="not found" />
            
            </div>
            <div className='retweet-deatils'>
                <div className='retweeted-by'> <FontAwesomeIcon className='retweet' icon={faRetweet} /> retweeted by ronaldo</div>
                <div>
                <span className='profile-name'><a href="#">@Rahul</a></span>
                <span className='retweet-date'> -Thu Dec 22 2022</span>
                </div>
                <div className="retweet-comment">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor eius maxime, fugiat voluptatibus atque tempore natus debitis at omnis quisquam quidem beatae est aperiam nemo! Atque quae illum voluptas saepe deleniti nulla aliquid reprehenderit. Suscipit numquam corrupti modi praesentium labore!
                </div>
                <div className="retweet-icons">
                    <div><FontAwesomeIcon icon={faHeart} className='likes'/><span>1</span></div>
                    
                    <div>
                    <FontAwesomeIcon icon={faComment} className='comment' />
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

export default Retweet;
