import React from 'react'
import { NavLink } from 'react-router-dom'

function Nav() {
	return (
		<nav className="navbar navbar-expand navbar-dark bg-dark">
			<div className="navbar-nav">
				<NavLink exact to="/" className="nav-item nav-link">
					Home
				</NavLink>
				<NavLink to="/users" className="nav-item nav-link">
					Users
				</NavLink>
				<NavLink to="/projects" className="nav-item nav-link">
					Projects
				</NavLink>
				<NavLink to="/roles" className="nav-item nav-link">
					Roles
				</NavLink>
				<NavLink to="/sprints" className="nav-item nav-link">
					Sprints
				</NavLink>
				<NavLink to="/tasks" className="nav-item nav-link">
					Tasks
				</NavLink>
				<NavLink to="/times" className="nav-item nav-link">
					Times
				</NavLink>
			</div>
		</nav>
	)
}

export { Nav }
