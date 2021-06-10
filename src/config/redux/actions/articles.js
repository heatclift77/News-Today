import axios from 'axios'
export const get_articles = () => (dispatch) => {
    return new Promise((resolve, reject) => {
        dispatch({type:"REQUEST_GET"})
        axios.get(' https://today.line.me/id/portaljson')
        .then(response => {
            dispatch({type:"GET_ARTICLES", payload:response.data.result})
            resolve(response.data.result)
        })
        .catch(() => {
            reject("network err")
        })
    })
}