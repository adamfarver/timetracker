import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import { roleService, alertService } from '@/_services'

function List({ match }) {
	const { path } = match
	const [roles, setRoles] = useState(null)

	useEffect(() => {
		roleService.getAll().then(x => {
			setRoles(x)
		})
	}, [])

	function deleteRole(id) {
		roleService.delete(id).then(() => {
			setRoles(roles => roles.filter(role => role._id !== id))
		})
	}

	return (
		<div>
			<h1>Roles</h1>
			<Link to={`${path}/add`} className="btn btn-sm btn-success mb-2">
				Add Role
			</Link>
			<table className="table table-striped">
				<thead>
					<tr>
						<th style={{ width: '90%' }}>Name</th>
						<th style={{ width: '10%' }}></th>
					</tr>
				</thead>
				<tbody>
					{roles &&
						roles.map(role => (
							<tr key={role._id}>
								<td>{role.roleName}</td>
								<td style={{ whiteSpace: 'nowrap' }}>
									<Link
										to={`${path}/edit/${role._id}`}
										className="btn btn-sm btn-primary mr-1"
									>
										Edit
									</Link>
									<button
										onClick={() => deleteRole(role._id)}
										className="btn btn-sm btn-danger btn-delete-role"
										disabled={role.isDeleting}
									>
										{role.isDeleting ? (
											<span className="spinner-border spinner-border-sm"></span>
										) : (
											<span>Delete</span>
										)}
									</button>
								</td>
							</tr>
						))}
					{!roles && (
						<tr>
							<td colSpan="4" className="text-center">
								<div className="spinner-border spinner-border-lg align-center"></div>
							</td>
						</tr>
					)}
					{roles && !roles.length && (
						<tr>
							<td colSpan="4" className="text-center">
								<div className="p-2">No Roles To Display</div>
							</td>
						</tr>
					)}
				</tbody>
			</table>
		</div>
	)
}

export { List }
