import React, { useContext } from 'react'
import { AppContext } from './AppContext'
import { Navbar, Nav, Container, NavDropdown, Dropdown } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link, useHistory } from 'react-router-dom'
function NavComponent() {
  const [project, setProject, sprint, setSprint, user, setUser, task, setTask] =
    useContext(AppContext)

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
          <Navbar.Brand onClick={() => history.push('/')}>Time Tracker</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto d-flex align-items-center">
              {user.firstName ? (
                <>
                  <Nav.Link onClick={() => history.push('/projects')}>Projects</Nav.Link>
                  {/* <Nav.Link href="/users">{`User: ${user.firstName}`}</Nav.Link> */}
                  <NavDropdown
                    id="navbarDropdown"
                    title={
                      <>
                        <FontAwesomeIcon icon="user-circle" />
                        {`${user.firstName}`}
                      </>}
                  >
                    <Dropdown.Item onClick={() => history.push(`/tasks/${user._id}`)}>
                      My Tasks
                    </Dropdown.Item>
                    <Dropdown.Item onClick={logout}>
                      Log Out
                    </Dropdown.Item>
                  </NavDropdown></>
              ) : (
                <>
                  <Nav.Link href="/login" className="nav-item mr-3">
                    Log In
                  </Nav.Link>
                  <Nav.Link variant='dark' as={'a'} href='/registration' className='btn-white text-primary rounded'>
                    Try It Out
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar >
    </>
  )
}

export { NavComponent }
