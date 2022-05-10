import React from 'react'
import { Route, Switch, Redirect, useLocation } from 'react-router-dom'

import { NavComponent, Alert } from '../_components/index'
import { Home } from '../home/Index'
import { Projects } from '../projects/Index'
import { Roles } from '../roles/Index'
import { Sprints } from '../sprints/Index'
import { Tasks } from '../tasks/Index'
import { Times } from '../times/Index'
import { Users } from '../users/Index'
import Registration from '../registration/Index'
import _404 from '../404/index'
import { AppProvider } from '../_components/AppContext'
import { Container } from 'react-bootstrap'
import Footer from '../_components/Footer'
import Login from '../login/Index'
function App() {
	const { pathname } = useLocation()

	return (
		<div className="app-container ">
			<AppProvider>
				<NavComponent />
				<Switch>
					<Route exact path="/" component={Home} />
				</Switch>
				{/* This container is for all of the views below, instead of having to have one in each of the views. */}
				{pathname === '/' ? null : (
					<Container className="shift-below-header">
						<Alert />

						<Switch>
							<Redirect from="/:url*(/+)" to={pathname.slice(0, -1)} />
							{/* TODO: Protect Routes */}
							<Route path="/projects" component={Projects} />
							<Route path="/roles" component={Roles} />
							<Route path="/sprints" component={Sprints} />
							<Route path="/tasks" component={Tasks} />
							<Route path="/times" component={Times} />
							<Route path="/users" component={Users} />
							{/* End Protected Routes */}
							<Route path="/registration" component={Registration} />
							<Route path="/login" component={Login} />
							<Route path="*" component={_404} />
						</Switch>
					</Container>
				)}
				{pathname === '/' ? null : <Container className="mb-5" />}
			</AppProvider>
		</div>
	)
}

export { App }
