import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from '../pages/HomePage'
import SinglePostPage from '../pages/SinglePostPage'

export default (
  <Switch>
      <Route exact path='/' component={ Home }/>
      <Route path='/singlepost' component={ SinglePostPage }/>
    </Switch>
)
