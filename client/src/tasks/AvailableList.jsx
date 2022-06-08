import React, { useState, useEffect, useContext } from 'react'
import { Link, useRouteMatch } from 'react-router-dom'
import { Button, Table, Row, Col } from 'react-bootstrap'
import { taskService, alertService } from '@/_services'
import { AppContext } from '../_components/AppContext'
import { Breadcrumbs } from '../_components/Breadcrumbs'

export function AvailableList() {
  const match = useRouteMatch()
  const { id } = match.params
  const [tasks, setTasks] = useState([])
  const [claimed, setClaimed] = useState('')
  const [project, setProject, sprint, setSprint, user, setUser, task, setTask] =
    useContext(AppContext)

  const { token } = user
  useEffect(() => {
    taskService.getByProjectId(id, token).then((res) => {
      const availableTasks = res.filter(
        (task) =>
          task.active &&
          !task.completed &&
          !task.claimedBy._id &&
          task.sprint === sprint._id
      )

      res = availableTasks
      setTasks(res)
    })
  }, [claimed, setClaimed])

  const claimTask = async (id) => {
    const change = {
      'claimedBy._id': user._id,
      'claimedBy.firstName': user.firstName,
      'claimedBy.lastName': user.lastName,
    }
    await taskService
      .update(id, change, token)
      .then((res) => {
        if (res.n) {
          setClaimed(claimed + 1)
          alertService.success('Task claimed.')
        }
      })
      .catch((e) => console.log(e))
  }

  return (
    <>
      <Breadcrumbs />
      <Row className={'mb-3'}>
        <Col>
          <h1>Available Tasks</h1>
        </Col>
      </Row>

      <Table striped hover responsive="md">
        <thead>
          <tr>
            <th>Task</th>
            <th>Additional Info</th>
            <th>Projected Time</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks &&
            tasks.map((task) => (
              <tr key={task._id}>
                <td>
                  <div className="truncate15">
                    <Link to={`/tasks/view/${task._id}`}>{task.taskName}</Link>
                  </div>
                </td>
                <td>
                  <div className="truncate30">{task.additionalInfo}</div>
                </td>
                <td>{task.projectedTime} hrs.</td>
                <td style={{ whiteSpace: 'nowrap' }}>
                  <Button
                    onClick={() => claimTask(task._id)}
                    className="btn btn-sm btn-success btn-delete-task"
                    disabled={task.isDeleting}
                  >
                    {task.isDeleting ? (
                      <span className="spinner-border spinner-border-sm"></span>
                    ) : (
                      <span>Claim</span>
                    )}
                  </Button>
                </td>
              </tr>
            ))}
          {!tasks && (
            <tr>
              <td colSpan="4" className="text-center">
                <div className="spinner-border spinner-border-lg align-center"></div>
              </td>
            </tr>
          )}
          {tasks && !tasks.length && (
            <tr>
              <td colSpan="4" className="text-center">
                <div className="p-2">No tasks To Display</div>
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </>
  )
}
