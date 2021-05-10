import React, { useContext } from 'react'
import { AppContext } from './AppContext'
import {
	Navbar,
	Nav,
	Container,
	ButtonGroup,
	Dropdown,
	Button,
	NavDropdown,
} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useHistory } from 'react-router-dom'
function NavComponent() {
	const [
		project,
		setProject,
		sprint,
		setSprint,
		user,
		setUser,
		task,
		setTask,
	] = useContext(AppContext)

	let history = useHistory()
	function logout() {
		localStorage.removeItem('current_user')
		localStorage.removeItem('current_sprint')
		localStorage.removeItem('current_project')
		localStorage.removeItem('current_task')
		setUser({})
		setSprint({})
		setProject({})
		setTask({})
		history.push('/')
		return
	}
	return (
		<>
			<Navbar expand="lg" variant="dark" fixed="top">
				<Container>
					<Navbar.Brand href="/">Time Tracker</Navbar.Brand>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="ml-auto d-flex align-items-center">
							{user.firstName ? (
								<>
									<Nav.Link href="/projects">Projects</Nav.Link>
									{/* <Nav.Link href="/users">{`User: ${user.firstName}`}</Nav.Link> */}
									<div className="nav-item dropdown">
										<a
											className="nav-link dropdown-toggle"
											href="#"
											id="navbarDropdown"
											role="button"
											data-toggle="dropdown"
											aria-haspopup="true"
											aria-expanded="false"
										>
											<a href="/users" className="nav-link">
												<FontAwesomeIcon icon="user-circle" />
												{`${user.firstName}`}
											</a>
										</a>
										<div
											className="dropdown-menu"
											aria-labelledby="navbarDropdown"
										>
											<a className="dropdown-item" href={`/tasks/${user._id}`}>
												My Tasks
											</a>
											<a className="dropdown-item" onClick={logout}>
												Logout
											</a>
										</div>
									</div>
								</>
							) : (
								<a href="/registration" className="btn-white ">
									Try It Out
								</a>
							)}
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</>
	)
}

export { NavComponent }
