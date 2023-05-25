const reducer = (state = false, action) => {
    if(action.type === 'reverse') {
        return state = !state;
    }
    else return state;
}

export default reducer;