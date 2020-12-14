import React, { useState, useEffect, useContext } from 'react'
import { Badge, Button } from 'react-bootstrap'
import ListGroup from 'react-bootstrap/ListGroup'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { AppContext } from '../_components/AppContext'
export function HomeList(props) {
	let { name, max, taskList } = props

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
	while (max < taskList.length) {
		taskList.pop()
	}
	// This will most likely go into the individual task view.

	// function claimItem(task, user) {
	// 	task.claimedBy = user._id
	// 	taskService.update(task._id, task).then(() => console.log('updated task'))
	// }

	function taskSetting(task) {
		setTask(task)

		localStorage.setItem('current_task', JSON.stringify(task))
	}

	return (
		<>
			<ListGroup as="ul">
				<ListGroup.Item
					as="li"
					className="d-flex justify-content-between"
					active
				>
					{name}
					{name === 'Backlog Tasks' && (
						<Link to={`/tasks/add`} className="text-white">
							<FontAwesomeIcon icon="plus" /> Add Task
						</Link>
					)}
				</ListGroup.Item>
				{taskList &&
					taskList.map((task) => {
						return (
							<ListGroup.Item
								as="li"
								key={task._id}
								className="d-flex justify-content-between"
							>
								<Link
									to={`/tasks/view/${task._id}`}
									onClick={() => taskSetting(task)}
								>
									{task.taskName}{' '}
								</Link>
							</ListGroup.Item>
						)
					})}
				<ListGroup.Item as="li">View More</ListGroup.Item>
			</ListGroup>
		</>
	)
}
