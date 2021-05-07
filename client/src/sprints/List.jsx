import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'
import { sprintService, alertService } from '@/_services'

function List({ match }) {
	const { path } = match
	const [sprints, setSprints] = useState(null)

	useEffect(() => {
		sprintService.getAll().then((x) => {
			setSprints(x)
		})
	}, [])

	function deleteSprint(id) {
		sprintService.delete(id).then(() => {
			setSprints((sprints) => sprints.filter((sprint) => sprint._id !== id))
		})
	}

	return (
		<div>
			<h1>Sprints</h1>
			<Link to={`${path}/add`} className="btn btn-sm btn-success mb-2">
				Add Sprint
			</Link>
			<Table className="table table-striped hover">
				<thead>
					<tr>
						<th style={{ width: '30%' }}>Name</th>
						<th style={{ width: '30%' }}>Email</th>
						<th style={{ width: '30%' }}>Role</th>
						<th style={{ width: '10%' }}></th>
					</tr>
				</thead>
				<tbody>
					{sprints &&
						sprints.map((sprint) => (
							<tr key={sprint._id}>
								<td>
									{sprint.title} {sprint.firstName} {sprint.lastName}
								</td>
								<td>{sprint.email}</td>
								<td>{sprint.role}</td>
								<td style={{ whiteSpace: 'nowrap' }}>
									<Link
										to={`${path}/edit/${sprint._id}`}
										className="btn btn-sm btn-primary mr-1"
									>
										Edit
									</Link>
									<button
										onClick={() => deleteSprint(sprint._id)}
										className="btn btn-sm btn-danger btn-delete-sprint"
										disabled={sprint.isDeleting}
									>
										{sprint.isDeleting ? (
											<span className="spinner-border spinner-border-sm"></span>
										) : (
											<span>Delete</span>
										)}
									</button>
								</td>
							</tr>
						))}
					{!sprints && (
						<tr>
							<td colSpan="4" className="text-center">
								<div className="spinner-border spinner-border-lg align-center"></div>
							</td>
						</tr>
					)}
					{sprints && !sprints.length && (
						<tr>
							<td colSpan="4" className="text-center">
								<div className="p-2">No Sprints To Display</div>
							</td>
						</tr>
					)}
				</tbody>
			</Table>
		</div>
	)
}

export { List }
