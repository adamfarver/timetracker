import React from 'react'
import { Route, Switch, Redirect, useLocation } from 'react-router-dom'

import { NavComponent, Alert } from '@/_components'
import { Home } from '@/home'
import { Projects } from '@/projects'
import { Roles } from '@/roles'
import { Sprints } from '@/sprints'
import { Tasks } from '@/tasks'
import { Times } from '@/times'
import { Users } from '@/users'
import Registration from '@/registration'
import { AppProvider } from '../_components/AppContext'
import { Container } from 'react-bootstrap'
function App() {
	const { pathname } = useLocation()

	return (
		<div className="app-container ">
			<AppProvider>
				<NavComponent />
				<Switch>
					<Route exact path="/" component={Home} />
				</Switch>
				<Container className="shift-below-header">
					<Alert />

					<Switch>
						<Redirect from="/:url*(/+)" to={pathname.slice(0, -1)} />
						<Route path="/projects" component={Projects} />
						<Route path="/roles" component={Roles} />
						<Route path="/sprints" component={Sprints} />
						<Route path="/tasks" component={Tasks} />
						<Route path="/times" component={Times} />
						<Route path="/users" component={Users} />
						<Route path="/registration" component={Registration} />
						<Redirect from="*" to="/" />
					</Switch>
				</Container>
			</AppProvider>
		</div>
	)
}

export { App }
