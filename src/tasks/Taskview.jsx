import React, { useContext, useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import { AppContext } from '../_components/AppContext'
import { Breadcrumbs } from '../_components/Breadcrumb'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { taskService, alertService } from '@/_services'
import { AddEdit } from '../times/AddEdit'

export function TaskView({ history, match }) {
	const { id } = match.params
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

	const [claimed, setClaimed] = useState(false)
	useEffect(() => {
		taskService.getById(id).then((individualTask) => {
			setTask(individualTask)
		})
	}, [])

	function claimItem(e, task, user) {
		if (e.target.innerHTML === 'Claim') {
			task.claimedBy = user._id
			setTask(task)
			setClaimed(!claimed)
			console.log(task.claimedBy)
		} else {
			task.claimedBy = null
			setTask(task)
			setClaimed(!claimed)
			console.log(task.claimedBy)
		}
		try {
			taskService
				.update(task._id, task)
				.then(() => alertService.success(`Task claimed by ${user.firstName}`))
		} catch (error) {
			alertService.error(
				'Problems with Database Connection. Please contact your system administrator.'
			)
		}
	}

	return (
		<>
			<Container>
				<Row>
					<Col>
						<Breadcrumbs />
					</Col>
				</Row>
				<Row>
					<Col>
						<div className="d-flex align-items-center">
							<h1>{task.taskName}</h1>
							{user.role.rolename === 'Manager' ||
								('Admin' && !task.completed && (
									<Col md>
										<Link to={`/tasks/edit/${id}`}>
											<FontAwesomeIcon icon="edit" className={'mr-1'} />
											Edit Task
										</Link>
									</Col>
								))}
						</div>
					</Col>
				</Row>
				<Row>
					<Col md={3}>
						<b>Active:</b>
						<p>{task.active ? 'Yes' : 'No'}</p>
					</Col>

					<Col md={3}>
						<b>Completed:</b>
						<p>{task.completed ? 'Yes' : 'No'}</p>
					</Col>
					<Col md={3}>
						<b>Projected Time:</b>
						<p>{task.projectedTime} hours</p>
					</Col>
					<Col md={3}>
						{!task.completed ? (
							task.claimedBy ? (
								<Button
									variant="danger"
									onClick={(event) => {
										claimItem(event, task, user)
									}}
								>
									Release
								</Button>
							) : (
								<Button
									variant="success"
									onClick={(event) => {
										claimItem(event, task, user)
									}}
								>
									Claim
								</Button>
							)
						) : null}
					</Col>
				</Row>
				<Row>
					<Col>
						<b>Additional Info:</b>
						{task.additionalInfo ? (
							<p>{task.additionalInfo} hours</p>
						) : (
							<p>None</p>
						)}
					</Col>
				</Row>

				<Row>
					{task.claimedBy && (
						<Col md={4}>
							<AddEdit match={match} history={history} />
						</Col>
					)}
				</Row>
			</Container>
		</>
	)
}
