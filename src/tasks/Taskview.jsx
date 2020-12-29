import React, { useContext, useEffect } from 'react'
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

	useEffect(() => {
		taskService.getById(id).then((individualTask) => setTask(individualTask))
	}, [])

	function claimItem(task, user) {
		task.claimedBy = user._id
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
						<Button
							variant="success"
							onClick={() => {
								claimItem(task, user)
							}}
						>
							Claim
						</Button>
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
