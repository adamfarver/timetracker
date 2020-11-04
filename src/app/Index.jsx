import React from 'react'
import { Route, Switch, Redirect, useLocation } from 'react-router-dom'

import { Nav, Alert } from '@/_components'
import { Home } from '@/home'
import { Projects } from '@/projects'
import { Roles } from '@/roles'
import { Sprints } from '@/sprints'
import { Tasks } from '@/tasks'
import { Times } from '@/times'
import { Users } from '@/users'
import { BreadcrumbProvider } from '../_components/BreadcrumbContext'
function App() {
	const { pathname } = useLocation()

	return (
		<div className="app-container bg-light">
			<BreadcrumbProvider>
				<Nav />
				<Alert />
				<div className="container pt-4 pb-4">
					<Switch>
						<Redirect from="/:url*(/+)" to={pathname.slice(0, -1)} />
						<Route exact path="/" component={Home} />
						<Route path="/projects" component={Projects} />
						<Route path="/roles" component={Roles} />
						<Route path="/sprints" component={Sprints} />
						<Route path="/tasks" component={Tasks} />
						<Route path="/times" component={Times} />
						<Route path="/users" component={Users} />
						<Redirect from="*" to="/" />
					</Switch>
				</div>
			</BreadcrumbProvider>
		</div>
	)
}

export { App }
