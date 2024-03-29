import React, { useState, useEffect } from 'react'
import { Link, useRouteMatch } from 'react-router-dom'

import { userService, alertService } from '@/_services'

function List() {
	const match = useRouteMatch()
	const { path } = match
	const [users, setUsers] = useState(null)

	useEffect(() => {
		userService.getAll().then((x) => {
			setUsers(x)
		})
	}, [])

	function deleteUser(id) {
		userService.delete(id).then(() => {
			setUsers((users) => users.filter((user) => user._id !== id))
		})
	}

	return (
		<div>
			<h1>Users</h1>
			<Link to={`${path}/add`} className="btn btn-sm btn-success mb-2">
				Add User
			</Link>
			<table className="table table-striped">
				<thead>
					<tr>
						<th style={{ width: '30%' }}>Name</th>
						<th style={{ width: '30%' }}>Email</th>
						<th style={{ width: '30%' }}>Role</th>
						<th style={{ width: '10%' }}></th>
					</tr>
				</thead>
				<tbody>
					{users &&
						users.map((user) => (
							<tr key={user._id}>
								<td>
									{user.title} {user.firstName} {user.lastName}
								</td>
								<td>{user.email}</td>
								<td>{user.role}</td>
								<td style={{ whiteSpace: 'nowrap' }}>
									<Link
										to={`${path}/edit/${user._id}`}
										className="btn btn-sm btn-primary mr-1"
									>
										Edit
									</Link>
									<button
										onClick={() => deleteUser(user._id)}
										className="btn btn-sm btn-danger btn-delete-user"
										disabled={user.isDeleting}
									>
										{user.isDeleting ? (
											<span className="spinner-border spinner-border-sm"></span>
										) : (
											<span>Delete</span>
										)}
									</button>
								</td>
							</tr>
						))}
					{!users && (
						<tr>
							<td colSpan="4" className="text-center">
								<div className="spinner-border spinner-border-lg align-center"></div>
							</td>
						</tr>
					)}
					{users && !users.length && (
						<tr>
							<td colSpan="4" className="text-center">
								<div className="p-2">No Users To Display</div>
							</td>
						</tr>
					)}
				</tbody>
			</table>
		</div>
	)
}

export { List }
