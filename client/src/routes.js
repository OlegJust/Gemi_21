import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import {CreatePage} from './pages/CreatePage'
import {AuthPage} from './pages/AuthPage'
import {PlayroomsPage} from "./pages/PlayroomsPage";
import {Game21} from "./pages/Game21";

export const useRoutes = isAuthenticated => {
  if (isAuthenticated) {
    return (
      <Switch>
        <Route path="/create" exact>
          <CreatePage />
          <PlayroomsPage />
        </Route>
          <Route path="/game21" exact>
              <Game21 />
          </Route>
        <Redirect to="/create" />
      </Switch>
    )
  }

  return (
    <Switch>
      <Route path="/" exact>
        <AuthPage />
      </Route>
      <Redirect to="/" />
    </Switch>
  )
}
