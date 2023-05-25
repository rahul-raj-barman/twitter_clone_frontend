const reducer = (state = null, action) => {
    if (action.type === 'setCurrentUserProfile') {
        return action.payload;
    } else {
        return state;
    }
}

export default reducer;
