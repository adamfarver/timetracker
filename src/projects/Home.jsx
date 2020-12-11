import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { AppContext } from '../_components/AppContext'
import { Breadcrumbs } from '../_components/Breadcrumb'
import { projectService, sprintService, taskService } from '@/_services'
import LineChart from '../_components/LineChart'
import { Form, Container, Row, Col } from 'react-bootstrap'
import { HomeList } from '../_components/HomeList'
import { usDateFormat } from '../_helpers/humanDateFormatter'

function Home({ history, match }) {
	const { id } = match.params
	const [taskList, setTasklist] = useState([])
	const [sprintList, setSprintList] = useState([])
	const [project, setProject, sprint, setSprint, user, setUser] = useContext(
		AppContext
	)

	// Setting Project ID in state/localStorage and removing sprint data
	useEffect(() => {
		projectService.getById(id).then((data) => {
			const { _id, projectName } = data
			const parsedData = { _id, projectName }
			setProject(parsedData)
			const stringifiedData = JSON.stringify(parsedData)
			localStorage.setItem('current_project', stringifiedData)
			localStorage.removeItem('current_sprint')
			setSprint(false)
		})
	}, [])

	// Grab sprints and put into state for Sprint Select feature
	useEffect(() => {
		sprintService.filterByProjectId(id).then((data) => {
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
		taskService
			.getByProjectId(project._id)
			.then((res) => {
				const completedTasks = res.filter((task) => task.completed)
				const availableTasks = res.filter(
					(task) => task.active && !task.completed
				)
				const backlogTasks = res.filter(
					(task) => !task.active && !task.completed
				)
				res = { completedTasks, backlogTasks, availableTasks }
				return res
			})
			.then((res) => setTasklist(res))
	}, [])

	function handleSprintChange(e) {
		setSprint(e.target.value)
		if (e.target.value === 'add') {
			history.push('/sprints/add')
		} else if (e.target.value === 'Choose...') {
			setSprint({})
		} else {
			setSprint({ _id: e.target.value })
		}
	}

	return (
		<Container>
			{project ? (
				<Row>
					<Col>
						<Breadcrumbs />
					</Col>
				</Row>
			) : null}
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
								{Object.keys(sprintList).map((key) => (
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
			<Row>
				<Col>
					<LineChart />
				</Col>
			</Row>
			<Row>
				<Col md={4} className="mt-4 order-0">
					{sprint._id ? (
						<HomeList
							name="Available Tasks"
							max={5}
							project={project}
							sprint={sprint}
							taskList={taskList.availableTasks}
							user={user}
						/>
					) : null}
				</Col>
				<Col md={4} className="mt-4 ">
					{sprint._id ? (
						<HomeList
							name="Completed Tasks"
							max={5}
							project={project}
							sprint={sprint}
							taskList={taskList.completedTasks}
							user={user}
						/>
					) : null}
				</Col>
				<Col md={4} className="mt-4 ">
					{sprint._id ? (
						<HomeList
							name="Backlog Tasks"
							max={5}
							project={project}
							sprint={sprint}
							taskList={taskList.backlogTasks}
							user={user}
						/>
					) : null}
				</Col>
			</Row>
		</Container>
	)
}

export { Home }
