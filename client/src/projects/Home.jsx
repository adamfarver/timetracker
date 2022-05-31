import React, { useState, useEffect, useContext } from 'react'
import { Link, useHistory, useRouteMatch } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { AppContext } from '../_components/AppContext'
import { Breadcrumbs } from '../_components/Breadcrumbs'
import { projectService, sprintService, taskService } from '@/_services'
import LineChart from '../_components/LineChart'
import { Form, Row, Col } from 'react-bootstrap'
import { HomeList } from '../_components/HomeList'
import { usDateFormat } from '../_helpers/humanDateFormatter'
import { BackLogList } from '../tasks/BackLogList'

function Home() {
  const match = useRouteMatch()
  const history = useHistory()
  const { id } = match.params
  const [taskList, setTasklist] = useState({
    completedTasks: [],
    backlogTasks: [],
    availableTasks: [],
    inProcessTasks: [],
  })
  const [sprintList, setSprintList] = useState('')
  const [project, setProject, sprint, setSprint, user, setUser, task, setTask] =
    useContext(AppContext)
  const { token } = user
  console.log("id: ", id)
  console.log("token: ", token)
  // Setting Project ID in state/localStorage and removing sprint data
  useEffect(() => {
    setTask({
      active: false,
      actualUsedTime: 0,
      claimedBy: {
        _id: '',
        firstName: '',
        lastName: '',
        v: 1,
      },
      completed: false,
      created_at: '',
      project: '',
      projectedTime: '',
      sprint: '',
      taskName: '',
      updatedAt: '',
      userCreated: '',
      userModified: '',
      __v: 0,
      _id: '',
    })
    setSprint({ _id: '', number: '' })
    projectService.getById(id, token).then((data) => {
      console.log(data)
      const { _id, projectName } = data
      const parsedData = { _id, projectName }
      setProject(parsedData)
      const stringifiedData = JSON.stringify(parsedData)
      localStorage.setItem('current_project', stringifiedData)
      localStorage.removeItem('current_sprint')
      localStorage.removeItem('current_task')
    })
  }, [])

  // Grab sprints and put into state for Sprint Select feature
  useEffect(() => {
    sprintService.filterByProjectId(id, token).then((data) => {
      const parsedData = data.map((singleSprint) => {
        const { _id, sprintType, sprint, dateStart, dateEnd } = singleSprint
        const newData = { _id, sprintType, sprint }
        newData.sprintType = newData.sprintType.toUpperCase()
        newData.dateStart = usDateFormat(dateStart)
        newData.dateEnd = usDateFormat(dateEnd)

        return newData
      })
      setSprintList(parsedData)
    })
  }, [])
  // Get All Tasks For Sprint
  useEffect(() => {
    taskService.getByProjectId(id, token).then((res) => {
      const completedTasks = res.filter(
        (task) => task.completed && task.sprint === sprint._id
      )
      const availableTasks = res.filter(
        (task) =>
          task.active &&
          !task.completed &&
          !task.claimedBy._id &&
          task.sprint === sprint._id
      )
      const backlogTasks = res.filter(
        (task) => !task.active && !task.completed && task.sprint === sprint._id
      )
      const inProcessTasks = res.filter(
        (task) =>
          task.active &&
          !task.completed &&
          task.claimedBy._id &&
          task.sprint === sprint._id
      )
      res = { completedTasks, backlogTasks, availableTasks, inProcessTasks }
      setTasklist(res)
    })
  }, [sprint])

  function handleSprintChange(e) {
    setSprint(e.target.value)
    if (e.target.value === 'add') {
      history.push('/sprints/add')
    } else if (e.target.value === 'Choose...') {
      setSprint({})
    } else {
      console.log(e.target.selectedOptions[0].innerText)
      let data = {
        _id: `${e.target.value}`,
        name: `${e.target.selectedOptions[0].innerText}`,
      }
      setSprint(data)
      localStorage.setItem('current_sprint', JSON.stringify(data))
    }
  }
  return (
    <>
      <Row>
        <Col>
          <Breadcrumbs />
        </Col>
      </Row>
      <Row>
        <Col>
          <h1>{project.projectName}</h1>
        </Col>
      </Row>
      <Row className=" justify-content-between align-items-center">
        <Col md={6}>
          <Form>
            <Form.Group controlId="sprintSelect">
              <Form.Label>Sprint</Form.Label>
              <Form.Control
                as="select"
                custom
                name="sprintSelect"
                value={sprint._id}
                onChange={handleSprintChange}
              >
                <option>Choose...</option>
                {Object.keys(sprintList).map((key, index) => (
                  <option key={sprintList[key]._id} value={sprintList[key]._id}>
                    {`${sprintList[key].sprintType} ${sprintList[key].sprint} => ${sprintList[key].dateStart} - ${sprintList[key].dateEnd}`}
                  </option>
                ))}
                <option value="add">Add Sprint</option>
              </Form.Control>
            </Form.Group>
          </Form>
        </Col>

        {sprint._id && (
          <Col md={6} className="pt-3">
            <Link to={`/sprints/edit/${sprint._id}`}>
              <FontAwesomeIcon icon="edit" /> Edit Sprint
            </Link>
          </Col>
        )}
      </Row>
      {sprint._id ? (
        <>
          <Row>
            <Col>
              <LineChart />
            </Col>
          </Row>
          <Row className="mt-4 ">
            <Col>
              <HomeList
                name="Available Tasks"
                max={5}
                project={project}
                sprint={sprint}
                taskList={taskList.availableTasks}
                user={user}
              />
            </Col>
            <Col md={4} className="mt-4 mt-md-0">
              <HomeList
                name="In-Process Tasks"
                max={5}
                project={project}
                sprint={sprint}
                taskList={taskList.inProcessTasks}
                user={user}
              />
            </Col>
            <Col md={4} className="mt-4 mt-md-0">
              <HomeList
                name="Completed Tasks"
                max={5}
                project={project}
                sprint={sprint}
                taskList={taskList.completedTasks}
                user={user}
              />
            </Col>
          </Row>
        </>
      ) : (
        <BackLogList id={id} />
      )}
    </>
  )
}

export { Home }
