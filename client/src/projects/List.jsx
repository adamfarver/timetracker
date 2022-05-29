import React, { useState, useEffect, useContext } from 'react'
import { Link, useRouteMatch } from 'react-router-dom'
import { AppContext } from '../_components/AppContext'
import { projectService, alertService } from '@/_services'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { Breadcrumbs } from '../_components/Breadcrumbs'

function List() {
  const { path } = useRouteMatch()
  const [projects, setprojects] = useState([])
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
  localStorage.removeItem('current_project')
  localStorage.removeItem('current_sprint')
  localStorage.removeItem('current_task')
  const { token } = user
  useEffect(() => {
    projectService.getAll(token).then((data) => {
      setprojects(data)
      setProject({})
      setSprint({})
      setTask({})
    })
  }, [])

  function deleteproject(id) {
    projectService.delete(id).then(() => {
      setprojects((projects) =>
        projects.filter((project) => project._id !== id)
      )
    })
  }

  return (
    <>
      <Row>
        <Col>
          <Breadcrumbs />
        </Col>
      </Row>
      <Row className="d-flex align-items-center justify-content-end mb-3">
        <Col>
          <h1>Projects</h1>
        </Col>
        <Col className="d-flex justify-content-end">
          <Link to={`${path}/add`} className="btn btn-sm btn-success ">
            Add Projects
          </Link>
        </Col>
      </Row>
      <Table striped hover responsive>
        <thead>
          <tr>
            <th>Project Name</th>
            <th>Client</th>
            <th>Project Manager</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {projects &&
            projects.map((project) => (
              <tr key={project._id}>
                <td>
                  <Link
                    to={'/projects/' + project._id}
                    onClick={() => setProject(project)}
                  >
                    {project.projectName}
                  </Link>
                </td>
                <td>{project.ownerCompany}</td>
                <td>
                  {project.projectManager.firstName}{' '}
                  {project.projectManager.lastName}
                </td>
                <td style={{ whiteSpace: 'nowrap' }}>
                  <Link
                    to={`${path}/edit/${project._id}`}
                    className="btn btn-sm btn-primary mr-1"
                  >
                    Edit
                  </Link>
                  <Button
                    onClick={() => deleteproject(project._id)}
                    className="btn btn-sm btn-danger btn-delete-project"
                    disabled={project.isDeleting}
                  >
                    {project.isDeleting ? (
                      <span className="spinner-border spinner-border-sm"></span>
                    ) : (
                      <span>Delete</span>
                    )}
                  </Button>
                </td>
              </tr>
            ))}
          {!projects && (
            <tr>
              <td colSpan="4" className="text-center">
                <div className="spinner-border spinner-border-lg align-center"></div>
              </td>
            </tr>
          )}
          {projects && !projects.length && (
            <tr>
              <td colSpan="4" className="text-center">
                <div className="p-2">No projects To Display</div>
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </>
  )
}

export { List }
