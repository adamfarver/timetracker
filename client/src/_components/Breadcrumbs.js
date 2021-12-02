import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Breadcrumb } from 'react-bootstrap'
import { AppContext } from './AppContext'
export function Breadcrumbs() {
	const [project, setProject, sprint, setSprint, user, setUser, task, setTask] =
		useContext(AppContext)
	return (
		<Breadcrumb>
			<Link
				to="/projects"
				className={`breadcrumb-item ${project._id ? '' : ' active'}`}
			>
				Project List
			</Link>
			{project._id && (
				<Link
					to={`/projects/${project._id}`}
					className={`breadcrumb-item ${sprint._id ? '' : ' active'}`}
				>
					{project.projectName}
				</Link>
			)}
			{sprint._id && (
				<Link
					to={`/projects/${project._id}`}
					className={`breadcrumb-item ${task._id ? '' : ' active'}`}
				>
					{sprint.name}
				</Link>
			)}
			{task._id && <Breadcrumb.Item active>{task.taskName}</Breadcrumb.Item>}
		</Breadcrumb>
	)
}
