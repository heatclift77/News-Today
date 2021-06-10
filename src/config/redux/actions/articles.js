import axios from 'axios'
export const get_articles = () => (dispatch) => {
    return new Promise(() => {
        dispatch({type:"REQUEST_GET"})
        axios.get(' https://today.line.me/id/portaljson')
        .then(response => {
            dispatch({type:"GET_ARTICLES", payload:response.data.result})
        })
    })
}