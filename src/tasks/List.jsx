import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import { taskService, alertService } from '@/_services'

function List({ match }) {
	const { path } = match
	const [tasks, settasks] = useState(null)

	useEffect(() => {
		taskService.getAll().then((x) => {
			settasks(x)
		})
	}, [])

	function deletetask(id) {
		taskService.delete(id).then(() => {
			settasks((tasks) => tasks.filter((task) => task._id !== id))
		})
	}

	return (
		<div>
			<h1>Tasks</h1>
			<Link to={`${path}/add`} className="btn btn-sm btn-success mb-2">
				Add Task
			</Link>
			<table className="table table-striped">
				<thead>
					<tr>
						<th style={{ width: '30%' }}>Name</th>
						<th style={{ width: '30%' }}>Allotted Time</th>
						<th style={{ width: '30%' }}>Used Time</th>
						<th style={{ width: '10%' }}></th>
					</tr>
				</thead>
				<tbody>
					{tasks &&
						tasks.map((task) => (
							<tr key={task._id}>
								<td>{task.taskName}</td>
								<td>{task.projectedTime}</td>
								<td>{task.actualUsedTime}</td>
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
		</div>
	)
}

export { List }
