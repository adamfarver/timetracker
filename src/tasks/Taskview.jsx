import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../_components/AppContext'
import { Breadcrumbs } from '../_components/Breadcrumb'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { taskService, alertService } from '@/_services'

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
						<h1>{task.taskName}</h1>
					</Col>
				</Row>
				<Row>
					<Col>
						{task.active ? (
							<p>
								<b>Status:</b> ACTIVE
							</p>
						) : null}
					</Col>

					<Col>
						<b>Projected Time:</b>
						<p>{task.projectedTime} hours</p>
					</Col>
					<Col>
						{task.claimedBy ? (
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
						)}
					</Col>
				</Row>
				<Row>
					<Col>{task.additionalInfo && <b>Additional Info:</b>}</Col>
				</Row>
				<Row>
					<Col>{task.additionalInfo && <p>{task.additionalInfo}</p>}</Col>
				</Row>
			</Container>
		</>
	)
}
