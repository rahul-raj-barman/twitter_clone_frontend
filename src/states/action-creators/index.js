export const postButton = (state) => {
    return (dispatch) => {
        dispatch({
            type: 'reverse',
            payload: state
        })
    }
}

export const commentButton = (state) => {
    return (dispatch) => {
        dispatch({
            type: 'reverseComment',
            payload: state
        })
    }
}

export const setPost = (state) => {
    return (dispatch) => {
        dispatch({
            type: 'add',
            payload: state
        })
    }
}


export const setComment = (state) => {
    return (dispatch) => {
        dispatch({
            type: 'add',
            payload: state
        })
    }
}

export const currPost = (state) => {
    return (dispatch) => {
        dispatch({
            type: 'setCurrentpost',
            payload: state
        })
    }
}

export const setSinglePost = (state) => {
    return(dispatch) => {
        dispatch({
            type: 'setSinglePost',
            payload: state
        })
    }
}

export const setCurrentUserProfile = (state) => {
    return(dispatch) => {
        dispatch({
            type: 'setCurrentUserProfile',
            payload: state
        })
    }
}

export const deleteState = (state) => {
    return(dispatch) => {
        dispatch({
            type: 'deletePost',
            payload: state
        })
    }
}

export const update = (state) => {
    return(dispatch) => {
        dispatch({
            type: 'update',
            payload: state
        })
    }
}