const reducer = (state = false, action) => {
    if(action.type === 'reverseComment') {
        return state = !state;
    }
    else return state;
}

export default reducer;