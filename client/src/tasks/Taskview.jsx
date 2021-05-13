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
	const [project, setProject, sprint, setSprint, user, setUser, task, setTask] =
		useContext(AppContext)

	const [isClaimed, setIsClaimed] = useState(false)
	const [times, setTimes] = useState([])

	const getTask = async (id) => {
		const individualTask = await taskService
			.getById(id)
			.then((res) => {
				setTask(res)
			})
			.catch((e) => console.log(e))

		if (task.claimedBy._id) {
			setIsClaimed(true)
		}
	}

	useEffect(() => {
		getTask(id)
	}, [isClaimed])

	useEffect(() => {
		taskService.getTimeById(id).then((res) => setTimes(res))
	}, [])

	function claimItem(e, task, user) {
		if (e.target.innerHTML === 'Claim') {
			task.claimedBy._id = user._id
			task.claimedBy.firstName = user.firstName
			task.claimedBy.lastName = user.lastName

			setTask(task)
		} else {
			task.claimedBy._id = null
			task.claimedBy.firstName = 'Nobody'
			task.claimedBy.lastName = ' '
			setTask(task)
		}
		try {
			taskService.update(task._id, task).then((res) => {
				if (res.nModified) {
					setIsClaimed(!isClaimed)
					if (task.claimedBy._id) {
						alertService.success(`Task claimed by ${user.firstName}`)
					}
					if (!task.claimedBy._id) {
						alertService.success(`Task Released.`)
					}
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
						<strong>Active:</strong>
						<p>{task.active ? 'Yes' : 'No'}</p>
					</Col>

					<Col md={3}>
						<strong>Completed:</strong>
						<p>{task.completed ? 'Yes' : 'No'}</p>
					</Col>
					<Col md={3}>
						<strong>Projected Time:</strong>
						<p>{task.projectedTime} hours</p>
					</Col>
					<Col md={3}>
						{/* If completed, show who claimed */}
						{task.completed && (
							<>
								<strong>Completed By:</strong>
								<p>
									{task.claimedBy.firstName} {task.claimedBy.lastName}
								</p>
							</>
						)}
						{/* If not completed and not claimed, show claim button */}
						{!task.completed && !task.claimedBy._id && (
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
						{!task.completed &&
							task.claimedBy._id &&
							task.claimedBy._id === user._id && (
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
						{!task.completed &&
							task.claimedBy._id &&
							task.claimedBy._id !== user._id && (
								<>
									<strong>Claimed By:</strong>
									<p>
										{task.claimedBy.firstName} {task.claimedBy.lastName}
									</p>
								</>
							)}
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

					{user._id === task.claimedBy._id && (
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
