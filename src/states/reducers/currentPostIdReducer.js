const reducer = ((state = 123, action) => {
    if(action.type === 'setCurrentpost') {
        return state = action.payload;
    }
    else return state;
})

export default reducer;