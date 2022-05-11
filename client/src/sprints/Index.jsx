import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { List as SprintList } from './List'
import { AddEdit as SprintAddEdit} from './AddEdit'

function Sprints({ match }) {
	const { path } = match

	return (
		<Switch>
			<ProtectRoute exact path={path}>
				<SprintList />
			</ProtectRoute>
			<ProtectRoute path={`${path}/add`}>
				<SprintAddEdit />
			</ProtectRoute>
			<ProtectRoute path={`${path}/edit`}>
				<SprintAddEdit />
			</ProtectRoute>
			<Redirect to='/404' />
			{/* <Route exact path={path} component={List} /> */}
			{/* <Route path={`${path}/add`} component={AddEdit} /> */}
			{/* <Route path={`${path}/edit/:id`} component={AddEdit} /> */}
			{/* <Redirect to="/404" /> */}
		</Switch>
	)
}

export { Sprints }
