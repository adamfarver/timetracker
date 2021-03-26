import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { List } from './List'
import { AddEdit } from './AddEdit'

function Sprints({ match }) {
	const { path } = match

	return (
		<Switch>
			<Route exact path={path} component={List} />
			<Route path={`${path}/add`} component={AddEdit} />
			<Route path={`${path}/edit/:id`} component={AddEdit} />
			<Redirect to="/404" />
		</Switch>
	)
}

export { Sprints }
