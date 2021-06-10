import {combineReducers} from 'redux'
import articles from './articles'
const RootReducer = combineReducers({
    articles : articles
})
export default RootReducer