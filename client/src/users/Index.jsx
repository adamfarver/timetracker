import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

import { List as UserList } from './List'
import { AddEdit as UserAddEdit } from './AddEdit'
import { ProtectRoute } from '../_components/ProtectRoute'

function Users({ match }) {
	const { path } = match

	return (
		<Switch>
			<ProtectRoute exact path={path}>
				<UserList />
			</ProtectRoute>
			<ProtectRoute path={`${path}/add`}>
				<UserAddEdit />
			</ProtectRoute>
			<ProtectRoute path={`${path}/edit/:id`}>
				<UserAddEdit />
			</ProtectRoute>

			{/* <Route exact path={path} component={List} /> */}
			{/* <Route path={`${path}/add`} component={AddEdit} /> */}
			{/* <Route path={`${path}/edit/:id`} component={AddEdit} /> */}
			<Redirect to='/404' />
		</Switch>
	)
}

export { Users }
