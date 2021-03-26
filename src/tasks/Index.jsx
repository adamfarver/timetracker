import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

import { InProcessList } from './InProcessList'
import { AvailableList } from './AvailableList'
import { CompletedList } from './CompletedList'
import { BackLogList } from './BackLogList'
import { AddEdit } from './AddEdit'
import { TaskView } from './Taskview'

export function Tasks({ match }) {
	const { path } = match

	return (
		<Switch>
			<Route path={`${path}/add`} component={AddEdit} />
			<Route path={`${path}/edit/:id`} component={AddEdit} />
			<Route path={`${path}/view/:id`} component={TaskView} />
			<Route path={`${path}/:id/in-process`} component={InProcessList} />
			<Route path={`${path}/:id/available`} component={AvailableList} />
			<Route path={`${path}/:id/completed`} component={CompletedList} />
			<Route path={`${path}/:id/backlog`} component={BackLogList} />
			<Redirect to="/404" />
		</Switch>
	)
}
