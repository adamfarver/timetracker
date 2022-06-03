import React from 'react'
import { Route, Switch, Redirect, useRouteMatch } from 'react-router-dom'
import { List as SprintList } from './List'
import { AddEdit as SprintAddEdit } from './AddEdit'
import { ProtectRoute } from '../_components/ProtectRoute'
function Sprints() {
  const { path } = useRouteMatch()

  return (
    <Switch>
      <ProtectRoute exact path={path}>
        <SprintList />
      </ProtectRoute>
      <ProtectRoute path={`${path}/add`}>
        <SprintAddEdit />
      </ProtectRoute>
      <ProtectRoute path={`${path}/edit/:id`}>
        <SprintAddEdit />
      </ProtectRoute>
      <Redirect to="/404" />
      {/* <Route exact path={path} component={List} /> */}
      {/* <Route path={`${path}/add`} component={AddEdit} /> */}
      {/* <Route path={`${path}/edit/:id`} component={AddEdit} /> */}
      {/* <Redirect to="/404" /> */}
    </Switch>
  )
}

export { Sprints }
