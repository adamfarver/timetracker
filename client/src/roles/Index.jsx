import React from 'react'
import { Route, Switch, Redirect, useRouteMatch } from 'react-router-dom'

import { List as RoleList } from './List'
import { AddEdit as RoleAddEdit } from './AddEdit'
import { ProtectRoute } from "../_components/ProtectRoute"

function Roles() {
  const { path } = useRouteMatch()

  return (
    <Switch>
      <ProtectRoute exact path={path}>
        <RoleList />
      </ProtectRoute>
      <ProtectRoute path={`${path}/add`}>
        <RoleAddEdit />
      </ProtectRoute>
      <ProtectRoute path={`${path}/edit`}>
        <RoleAddEdit />
      </ProtectRoute>
      {/**/}
      {/* <Route exact path={path} component={List} /> */}
      {/* <Route path={`${path}/add`} component={AddEdit} /> */}
      {/* <Route path={`${path}/edit/:id`} component={AddEdit} /> */}
      {/* <Redirect to="/404" /> */}
    </Switch>
  )
}

export { Roles }
