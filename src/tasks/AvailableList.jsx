import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'
import { taskService, alertService } from '@/_services'

export function AvailableList({ match }) {
	const { id } = match.params
	const { path } = match
	console.log(match)
	const [tasks, settasks] = useState([])

	useEffect(() => {
		taskService.getByProjectId(id).then((res) => {
			const filteredTaskList = res.filter((task) => task.claimedBy)

			console.log(filteredTaskList)
			settasks(filteredTaskList)
		})
	}, [])

	function deletetask(id) {
		taskService.delete(id).then(() => {
			settasks((tasks) => tasks.filter((task) => task._id !== id))
		})
	}

	return (
		<Container>
			<h1>Available Tasks</h1>
			<Link to={`${path}/add`} className="btn btn-sm btn-success mb-2">
				Add Task
			</Link>
			<table className="table table-striped">
				<thead>
					<tr>
						<th style={{ width: '30%' }}>Task</th>
						<th style={{ width: '30%' }}>Allotted Time</th>
						<th style={{ width: '30%' }}>Claimed By</th>
						<th style={{ width: '10%' }}></th>
					</tr>
				</thead>
				<tbody>
					{tasks &&
						tasks.map((task) => (
							<tr key={task._id}>
								<td>
									<Link to={`/tasks/view/${task._id}`}>{task.taskName}</Link>
								</td>
								<td>{task.projectedTime}</td>
								<td>
									{`${task.claimedBy.firstName} ${task.claimedBy.lastName}`}
								</td>
								<td style={{ whiteSpace: 'nowrap' }}>
									<Link
										to={`${path}/edit/${task._id}`}
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
			</table>
		</Container>
	)
}
