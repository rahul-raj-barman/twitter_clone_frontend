const reducer = (state = null, action) => {
    if(action.type === 'setSinglePost') {
        return state = action.payload;
    }
    else return state=null;
}

export default reducer;