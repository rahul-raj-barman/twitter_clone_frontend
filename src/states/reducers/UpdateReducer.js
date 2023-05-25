const reducer = (state = false, action) => {
    if(action.type === 'update') {
        return state = !state;
    }
    else return state;
}

export default reducer;