import React from 'react'
import { Route, Switch, Redirect, useRouteMatch } from 'react-router-dom'

import { List as TimeList } from './List'
import { AddEdit as TimeAddEdit } from './AddEdit'
import { ProtectRoute } from '../_components/ProtectRoute'

function Times() {
	const match = useRouteMatch()
	const { path } = match

	return (
		<Switch>
			<ProtectRoute exact path={path}>
				<TimeList />
			</ProtectRoute>
			<ProtectRoute path={`${path}/add`}>
				<TimeAddEdit />
			</ProtectRoute>
			<ProtectRoute path={`${path}/edit/:id`}>
				<TimeAddEdit />
			</ProtectRoute>

			{/* <Route exact path={path} component={List} /> */}
			{/* <Route path={`${path}/add`} component={AddEdit} /> */}
			{/* <Route path={`${path}/edit/:id`} component={AddEdit} /> */}
			<Redirect to="/404" />
		</Switch>
	)
}

export { Times }
