import React, {useEffect} from 'react'
import {Main, Bookmark} from '../../pages'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import { get_articles } from '../redux/actions/articles'
import {useDispatch} from 'react-redux'

export default function App() {
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(get_articles())
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    return (
        <Router>
            <Switch>
                <Route path="/bookmark" component={Bookmark} />
                <Route path="/" component={Main} />
            </Switch>
        </Router>
    )
}

