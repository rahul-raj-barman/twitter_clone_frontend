const reducer = (state = false, action) => {
    if(action.type === 'deletePost') {
        return state=!state;
    }
    else return state;
}

export default reducer