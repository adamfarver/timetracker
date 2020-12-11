import React, { useContext } from 'react'
import { AppContext } from './AppContext'
import { Navbar, Nav } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
function NavComponent() {
	const [project, setProject, sprint, setSprint, user, setUser] = useContext(
		AppContext
	)
	return (
		<Navbar bg="dark" expand="lg" variant="dark">
			<Navbar.Brand href="/">Time Tracker</Navbar.Brand>
			<Navbar.Toggle aria-controls="basic-navbar-nav" />
			<Navbar.Collapse id="basic-navbar-nav">
				<Nav className="ml-auto">
					<Nav.Link href="#home">Home</Nav.Link>
					<Nav.Link href="#link">Link</Nav.Link>
					<Nav.Link href="#link">
						<FontAwesomeIcon icon="user-circle" />
						{` ${user.firstName}`}
					</Nav.Link>
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	)
}

export { NavComponent }
