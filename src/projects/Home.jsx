import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { AppContext } from '../_components/AppContext'
import { Breadcrumbs } from '../_components/Breadcrumb'
import { projectService, sprintService, taskService } from '@/_services'
import LineChart from '../_components/LineChart'
import { Form, Container, Row, Col } from 'react-bootstrap'

function Home({ history, match }) {
	const { id } = match.params

	const [project, setProject, sprint, setSprint] = useContext(AppContext)
	useEffect(() => {
		projectService.getById(id).then((data) => {
			const { _id, projectName } = data
			const parsedData = { _id, projectName }
			setProject(parsedData)
			const stringifiedData = JSON.stringify(parsedData)
			localStorage.setItem('current_project', stringifiedData)
			localStorage.removeItem('current_sprint')
		})
	}, [])
	function addSprint() {
		console.log('value', sprint)
	}
	function handleSprintChange(e) {
		setSprint(e.target.value)
		if (e.target.value === 'add') {
			history.push('/sprints/add')
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
								value={sprint}
								onChange={handleSprintChange}
							>
								<option value="1">1</option>
								<option value="2">2</option>
								<option value="3">3</option>
								<option value="4">4</option>
								<option value="add">Add Sprint</option>
							</Form.Control>
						</Form.Group>
					</Form>
				</Col>

				<Col md={6} className="pt-3">
					<Link to="/sprints/edit">
						<FontAwesomeIcon icon="plus" /> Edit Sprint
					</Link>
				</Col>
			</Row>
			<Row>
				<Col md={6} className="mt-4 order-1">
					<ul className="list-group">
						<li className="list-group-item active d-flex justify-content-between">
							Current Tasks
							<Link to={`/tasks/add`} className="text-white">
								<FontAwesomeIcon icon="plus" /> Add Task
							</Link>
						</li>
						<li className="list-group-item ">Task 1</li>
						<li className="list-group-item ">Task 2</li>
						<li className="list-group-item ">Task 3</li>
						<li className="list-group-item ">Task 4</li>
						<li className="list-group-item ">Task 5</li>
						<li className="list-group-item ">View All</li>
					</ul>
				</Col>
				<div className="col-md-6 mt-4 order-0">
					<LineChart />
				</div>
			</Row>
			<Row>
				<Col md={6} className="mt-4">
					<ul className="list-group">
						<li className="list-group-item active d-flex justify-content-between">
							Completed Tasks
							<Link to={`/tasks/add`} className="text-white">
								<FontAwesomeIcon icon="plus" /> Add Task
							</Link>
						</li>
						<li className="list-group-item ">Task 1</li>
						<li className="list-group-item ">Task 2</li>
						<li className="list-group-item ">Task 3</li>
						<li className="list-group-item ">Task 4</li>
						<li className="list-group-item ">Task 5</li>
						<li className="list-group-item ">View All</li>
					</ul>
				</Col>
				<Col md={6} className="mt-4">
					<ul className="list-group">
						<li className="list-group-item active">Backlog</li>
						<li className="list-group-item ">Task 1</li>
						<li className="list-group-item ">Task 2</li>
						<li className="list-group-item ">Task 3</li>
						<li className="list-group-item ">Task 4</li>
						<li className="list-group-item ">Task 5</li>
						<li className="list-group-item ">View All</li>
					</ul>
				</Col>
			</Row>
		</Container>
	)
}

export { Home }
