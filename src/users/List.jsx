import React, { useState, useEffect, useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { AppContext } from '../_components/AppContext'
import { Table, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import { userService, alertService } from '@/_services'

function List({ history, match }) {
	const { path } = match
	const [users, setUsers] = useState(null)
	const [project, setProject, sprint, setSprint, user, setUser] = useContext(
		AppContext
	)

	useEffect(() => {
		userService.getWithRole().then((x) => {
			setUsers(x)
		})
	}, [])

	function deleteUser(id) {
		userService.delete(id).then(() => {
			setUsers((users) => users.filter((user) => user._id !== id))
		})
	}
	function selectUser(id) {
		let selectedUser = users.filter((user) => user._id === id)
		selectedUser[0].isSelected = true
		console.log(selectedUser)
		setUser(selectedUser)
		alertService.success(
			`Current User: ${selectedUser[0].firstName} ${selectedUser[0].lastName}`,
			{ keepAfterRouteChange: true }
		)
		history.push('/projects')
	}

	return (
		<div>
			<h1>Users</h1>
			<Link to={`${path}/add`} className="btn btn-sm btn-success mb-2">
				Add User
			</Link>
			<Table striped>
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
									{user.firstName} {user.lastName}
								</td>
								<td>{user.email}</td>
								<td>{user.role.roleName}</td>
								<td style={{ whiteSpace: 'nowrap' }}>
									<Button
										size="sm"
										onClick={() => selectUser(user._id)}
										className="btn btn-success mr-1"
									>
										{user.isSelected ? (
											<span>
												<FontAwesomeIcon icon="check" />
											</span>
										) : (
											<span>Select</span>
										)}
									</Button>
									<Link
										to={`${path}/edit/${user._id}`}
										className="btn btn-sm btn-primary mr-1"
									>
										Edit
									</Link>
									<Button
										size="sm"
										onClick={() => deleteUser(user._id)}
										className="btn btn-sm btn-danger btn-delete-user"
										disabled={user.isDeleting}
									>
										{user.isDeleting ? (
											<span className="spinner-border spinner-border-sm"></span>
										) : (
											<span>Delete</span>
										)}
									</Button>
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
			</Table>
		</div>
	)
}

export { List }
