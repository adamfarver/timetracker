import React, { useContext, useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import { AppContext } from '../_components/AppContext'
import { Breadcrumbs } from '../_components/Breadcrumbs'
import { Row, Col, Button } from 'react-bootstrap'
import { taskService, alertService } from '@/_services'
import { AddEdit } from '../times/AddEdit'
import TaskViewTimesList from '../times/TaskViewTimesList'

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
	const [times, setTimes] = useState([])
	useEffect(() => {
		taskService.getById(id).then((individualTask) => {
			setTask(individualTask)
		})
	}, [])

	useEffect(() => {
		taskService.getTimeById(id).then((res) => setTimes(res))
	}, [])

	function claimItem(e, task, user) {
		if (e.target.innerHTML === 'Claim') {
			task.claimedBy = user._id
			setTask(task)
			setClaimed(!claimed)
		} else {
			task.claimedBy = undefined
			setTask(task)
			setClaimed(!claimed)
		}
		try {
			taskService.update(task._id, task).then(() => {
				if (!claimed) {
					alertService.success(`Task claimed by ${user.firstName}`)
				}
				if (claimed) {
					alertService.success(`Task Released.`)
				}
			})
		} catch (error) {
			alertService.error(
				'Problems with Database Connection. Please contact your system administrator.'
			)
		}
	}

	return (
		<>
			<>
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
								('Admin' && (
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
						{/* If completed, show who claimed */}
						{task.completed && (
							<>
								<p>
									<strong>Claimed By:</strong>
								</p>{' '}
								<p>
									{task.claimedBy.firstName} {task.claimedBy.lastName}
								</p>
							</>
						)}
						{/* If not completed and not claimed, show claim button */}
						{!task.completed && !task.claimedBy && (
							<Button
								variant="success"
								onClick={(event) => {
									claimItem(event, task, user)
								}}
							>
								Claim
							</Button>
						)}
						{/* If not completed and claimed equals owner, show release button */}
						{!task.completed && task.claimedBy._id === user._id && (
							<Button
								variant="danger"
								onClick={(event) => {
									claimItem(event, task, user)
								}}
							>
								Release
							</Button>
						)}
						{/* If not completed and claimed not equal owner, show who claimed*/}
						{!task.completed && task.claimedBy._id !== user._id && (
							<>
								<strong>Claimed By:</strong>
								<p>
									{task.claimedBy.firstName} {task.claimedBy.lastName}
								</p>
							</>
						)}
						{/* {!task.completed && user._id === task.claimedBy._id ? (
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
						) : (
							<>
								<strong>Claimed By:</strong>
								<p>
									{task.claimedBy.firstName} {task.claimedBy.lastName}
								</p>
							</>
						)} */}
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
					<Col>
						<h4>
							<strong>Time Log</strong>
						</h4>
					</Col>
				</Row>
				<Row className="timelog py-3 mt-n1 ">
					<Col>
						<TaskViewTimesList times={times} setTimes={setTimes} />
					</Col>
					{task.claimedBy._id === user._id && (
						<Col md={4}>
							<AddEdit
								match={match}
								history={history}
								times={times}
								setTimes={setTimes}
							/>
						</Col>
					)}
				</Row>
			</>
		</>
	)
}
