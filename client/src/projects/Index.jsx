import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { ProtectRoute } from '../_components/ProtectRoute'
import { List as ProjectList } from './List'
import { AddEdit as ProjectAddEdit } from './AddEdit'
import { Home as ProjectView } from './Home'

function Projects({ match }) {
	const { path } = match

	return (
		<Switch>
			{/* <Route exact path={path} component={List} /> */}
			{/* <Route path={`${path}/add`} component={AddEdit} /> */}
			{/* <Route path={`${path}/edit/:id`} component={AddEdit} /> */}
			{/* <Route path={`${path}/:id`} component={Home} /> */}
			<ProtectRoute exact path={path}>
				<ProjectList />
			</ProtectRoute>
			<ProtectRoute path={`${path}/add`}>
				<ProjectAddEdit />
			</ProtectRoute>
			<ProtectRoute path={`${path}/edit`}>
				<ProjectAddEdit />
			</ProtectRoute>
			<ProtectRoute path={`${path}/:id`}>
				<ProjectView />
			</ProtectRoute>
			<Redirect to='/404' />
		</Switch>
	)
}

export { Projects }
