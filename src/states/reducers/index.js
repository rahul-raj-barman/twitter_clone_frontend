import { combineReducers } from 'redux'
import postButtonReducer from './postButtonReducer'
import PostReducer from './postReducer'
import commentReducer from './commentReducer'
import commentButtonReducer from './commentButtonReducer'
import currentPostIdReducer from './currentPostIdReducer'
import SinglePostReducer from './SinglePostReducer'
import currentUserProfileReducer from './currentUserProfileReducer'
import DelPostReducer from './DelPostReducer'
import UpdateReducer from './UpdateReducer'

const reducers = combineReducers({
    reverse: postButtonReducer,
    post: PostReducer,
    comment: commentReducer,
    addComment: commentButtonReducer,
    post_id : currentPostIdReducer,
    singlePost: SinglePostReducer,
    currentProfile : currentUserProfileReducer,
    delpost: DelPostReducer,
    update: UpdateReducer
})

export default reducers;