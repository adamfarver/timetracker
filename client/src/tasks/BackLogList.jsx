import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { Breadcrumbs } from '../_components/Breadcrumbs'
import { taskService, alertService } from '@/_services'

export function BackLogList({ match }) {
	const { id } = match.params
	const { path } = match
	const [tasks, settasks] = useState([])

	useEffect(() => {
		taskService.getByProjectId(id).then((res) => {
			const filteredTaskList = res.filter(
				(task) => !task.active && !task.completed
			)

			settasks(filteredTaskList)
		})
	}, [])

	function deletetask(id) {
		taskService.delete(id).then(() => {
			settasks((tasks) => tasks.filter((task) => task._id !== id))
		})
	}

	return (
		<>
			<Row>
				<Col>
					<Breadcrumbs />
				</Col>
			</Row>
			<Row className={'mb-3 d-flex align-items-center'}>
				<Col>
					<h1>Backlog Tasks</h1>
				</Col>
				<Col className="d-flex justify-content-end">
					<Link to={`/tasks/add`} className="btn btn-sm btn-success mb-2">
						Add Task
					</Link>
				</Col>
			</Row>
			<Table responsive="md" hover striped>
				<thead>
					<tr>
						<th>Task</th>
						<th>Addtional Info</th>
						<th>Estimated Time</th>
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
									<Link
										to={`/tasks/edit/${task._id}`}
										className="btn btn-sm btn-primary mr-1"
									>
										Edit
									</Link>
									<button
										onClick={() => deletetask(task._id)}
										className="btn btn-sm btn-danger btn-delete-task"
										disabled={task.isDeleting}
									>
										{task.isDeleting ? (
											<span className="spinner-border spinner-border-sm"></span>
										) : (
											<span>Delete</span>
										)}
									</button>
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
