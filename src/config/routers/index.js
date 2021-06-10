import React from 'react'
import {Main, Bookmark} from '../../pages'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

export default function App() {
    return (
        <Router>
            <Switch>
                <Route path="/bookmark" component={Bookmark} />
                <Route path="/" component={Main} />
            </Switch>
        </Router>
    )
}

