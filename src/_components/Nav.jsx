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
import NavTitleComponent from './NavTitleComponent'
function NavComponent() {
	const [project, setProject, sprint, setSprint, user, setUser] = useContext(
		AppContext
	)
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
											<FontAwesomeIcon icon="user-circle" />{' '}
											{`${user.firstName}`}
										</a>
										<div
											className="dropdown-menu"
											aria-labelledby="navbarDropdown"
										>
											<a className="dropdown-item" href="#">
												My Tasks
											</a>
											<a className="dropdown-item" href="#">
												Logout
											</a>
										</div>
									</div>
								</>
							) : (
								<a href="/users" className="btn-white ">
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
