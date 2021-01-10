import React, { useContext } from 'react'
import { Breadcrumb } from 'react-bootstrap'
import { AppContext } from './AppContext'
export function Breadcrumbs() {
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
	return (
		<Breadcrumb>
			<Breadcrumb.Item active={project._id ? false : true} href="/projects">
				Project List
			</Breadcrumb.Item>
			{project._id && (
				<Breadcrumb.Item
					active={sprint._id ? false : true}
					href={`/projects/${project._id}`}
				>
					{project.projectName}
				</Breadcrumb.Item>
			)}
			{sprint._id && (
				<Breadcrumb.Item
					active={task._id ? false : true}
					href={`/projects/${project._id}`}
				>
					{sprint.name}
				</Breadcrumb.Item>
			)}
			{task._id && <Breadcrumb.Item active>{task.taskName}</Breadcrumb.Item>}
		</Breadcrumb>
	)
}
