import React, { useState, useEffect, useContext } from 'react'
import { AppContext } from '../_components/AppContext'
import { Link } from 'react-router-dom'
import { Container, Button, Table, Row, Col } from 'react-bootstrap'
import { Breadcrumbs } from '../_components/Breadcrumbs'
import { taskService, alertService } from '@/_services'

export function InProcessList({ match }) {
	const { id } = match.params
	const { path } = match
	const [tasks, settasks] = useState([])
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

	useEffect(() => {
		taskService.getByProjectId(id).then((res) => {
			const filteredTaskList = res.filter((task) => task.claimedBy)

			settasks(filteredTaskList)
		})
	}, [])

	return (
		<Container>
			<Row>
				<Col>
					<Breadcrumbs />
				</Col>
			</Row>
			<Row className={'mb-3'}>
				<Col>
					<h1>In-Process Tasks</h1>
				</Col>
			</Row>

			<Table striped hover responsive="md">
				<thead>
					<tr>
						<th>Task</th>
						<th>Additional Info</th>
						<th>Claimed By</th>
						<th>Expected Time</th>
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
								<td>
									{task.claimedBy.firstName} {task.claimedBy.lastName}
								</td>
								<td style={{ whiteSpace: 'nowrap' }}>
									{task.projectedTime} hrs
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
		</Container>
	)
}
