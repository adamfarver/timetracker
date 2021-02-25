import React, { useContext } from 'react'
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
	const parsedName = name.split(' ')[0].toLowerCase()

	while (max < taskList.length) {
		taskList.pop()
	}

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
					{/* TODO: #52 Add Link to name at top of homelist components. */}
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
								<div className="truncate15">
									<Link
										to={`/tasks/view/${task._id}`}
										onClick={() => taskSetting(task)}
									>
										{task.taskName}
									</Link>
								</div>
								{task.claimedBy ? (
									<span>
										{task.claimedBy.firstName} {task.claimedBy.lastName}
									</span>
								) : null}
							</ListGroup.Item>
						)
					})}
				{taskList.length < max ? null : (
					<ListGroup.Item as="li">
						<Link to={`/tasks/${project._id}/${parsedName}`}>View More</Link>
					</ListGroup.Item>
				)}
			</ListGroup>
		</>
	)
}
