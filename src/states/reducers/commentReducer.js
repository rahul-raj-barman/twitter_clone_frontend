const reducer = (state = [], action) => {
    if(action.type === 'add') {
        return [...state, action.payload]
    }
    else return state;
}

export default reducer