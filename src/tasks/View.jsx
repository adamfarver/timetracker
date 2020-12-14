import React, { useContext, useEffect } from 'react'
import { AppContext } from '../_components/AppContext'
import { Breadcrumbs } from '../_components/Breadcrumb'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { taskService } from '@/_services'

export function TaskView() {
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

	function claimItem(task, user) {
		task.claimedBy = user._id
		taskService.update(task._id, task).then(() => console.log('updated task'))
	}
	return (
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
							console.log('You are success.')
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
	)
}
