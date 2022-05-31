import React from 'react'
import { Switch, Redirect, useRouteMatch } from 'react-router-dom'

import { InProcessList } from './InProcessList'
import { AvailableList } from './AvailableList'
import { CompletedList } from './CompletedList'
import { BackLogList } from './BackLogList'
import { AddEdit as TaskAddEdit } from './AddEdit'
import { TaskView } from './Taskview'
import { MyTasks } from './MyTasks'
import { ProtectRoute } from '../_components/ProtectRoute'

export function Tasks() {
  const match = useRouteMatch()
  const { path } = match

  return (
    <Switch>
      <ProtectRoute path={`${path}/add`}>
        <TaskAddEdit />
      </ProtectRoute>

      <ProtectRoute path={`${path}/edit/:id`}>
        <TaskAddEdit />
      </ProtectRoute>

      <ProtectRoute path={`${path}/view/:id`}>
        <TaskView />
      </ProtectRoute>

      <ProtectRoute path={`${path}/:id/in-process`}>
        <InProcessList />
      </ProtectRoute>

      <ProtectRoute path={`${path}/:id/available`}>
        <AvailableList />
      </ProtectRoute>

      <ProtectRoute path={`${path}/:id/completed`}>
        <CompletedList />
      </ProtectRoute>

      <ProtectRoute path={`${path}/:id/backlog`}>
        <BackLogList />
      </ProtectRoute>

      <ProtectRoute path={`${path}/:id`}>
        <MyTasks />
      </ProtectRoute>

      {/* <Route path={`${path}/add`} component={AddEdit} /> */}
      {/* <Route path={`${path}/edit/:id`} component={AddEdit} /> */}
      {/* <Route path={`${path}/view/:id`} component={TaskView} /> */}
      {/* <Route path={`${path}/:id/in-process`} component={InProcessList} /> */}
      {/* <Route path={`${path}/:id/available`} component={AvailableList} /> */}
      {/* <Route path={`${path}/:id/completed`} component={CompletedList} /> */}
      {/* <Route path={`${path}/:id/backlog`} component={BackLogList} /> */}

      {/* <Route path={`${path}/:id`} component={MyTasks} /> */}

      <Redirect to="/404" />
    </Switch>
  )
}
