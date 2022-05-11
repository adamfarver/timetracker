import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

import { List as RoleList} from './List'
import { AddEdit as RoleAddEdit} from './AddEdit'

function Roles({ match }) {
	const { path } = match

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
