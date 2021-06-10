const initialState = {
    data : {
        categories : [],
        categoryList : []
    },
    loading : false,
    categoryActive : "TOP"
}

const articles = (state = initialState, action) => {
    switch(action.type){
        case 'REQUEST_GET' : return {
            ...state, loading : true
        }
        case 'CHOOSE_CATEGORY' : return {
            ...state, categoryActive : action.payload 
        }
        case 'GET_ARTICLES' : return {
            ...state,
            data : action.payload,
            loading : false
        }
        default : return state
    }
}

export default articles