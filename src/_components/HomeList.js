import React, { useState, useEffect } from 'react'
import { Badge, Button } from 'react-bootstrap'
import ListGroup from 'react-bootstrap/ListGroup'
import { Link } from 'react-router-dom'
import { taskService } from '@/_services'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
export function HomeList(props) {
	let { project, sprint, name, max, taskList, user } = props

	while (max < taskList.length) {
		taskList.pop()
	}
	function claimItem(task, user) {
		task.claimedBy = user._id
		taskService.update(task._id, task).then(() => console.log('updated task'))
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
								{task.taskName}{' '}
								{name == 'Available Tasks' && (
									<Button
										variant="info"
										size="sm"
										onClick={() => claimItem(task, user)}
									>
										Claim
									</Button>
								)}
							</ListGroup.Item>
						)
					})}
				<ListGroup.Item as="li">View More</ListGroup.Item>
			</ListGroup>
		</>
	)
}
