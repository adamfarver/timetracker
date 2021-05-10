import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { Button, Table, Row, Col } from 'react-bootstrap'
import { taskService, alertService } from '@/_services'
import { AppContext } from '../_components/AppContext'
import { Breadcrumbs } from '../_components/Breadcrumbs'

export function MyTasks({ match }) {
	const { id } = match.params
	const { path } = match
	const [tasks, setTasks] = useState([])
	const [claimed, setClaimed] = useState('')
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
		setTask({})
	}, [])

	useEffect(() => {
		taskService.getAll(id).then((res) => {
			console.log(res)
			const mytasks = res.filter((task) => {
				return task.claimedBy._id === user._id && !task.completed
			})

			setTasks(mytasks)
		})
	}, [])

	return (
		<>
			<Breadcrumbs />
			<Row className={'mb-3'}>
				<Col>
					<h1>{`${user.firstName}'s Tasks`}</h1>
				</Col>
			</Row>

			<Table striped hover responsive="md">
				<thead>
					<tr>
						<th>Task</th>
						<th>Additional Info</th>
						<th>Projected Time </th>
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
