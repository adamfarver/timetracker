import React, { useContext } from 'react'
import { Breadcrumb } from 'react-bootstrap'
import { AppContext } from './AppContext'
export function Breadcrumbs(props) {
	const [project, setProject, sprint, setSprint] = useContext(AppContext)
	return (
		<Breadcrumb>
			{project ? (
				<Breadcrumb.Item href="/projects">Project List</Breadcrumb.Item>
			) : null}
			{sprint ? (
				<Breadcrumb.Item href={`/projects/${project._id}`}>
					{project.projectName}
				</Breadcrumb.Item>
			) : (
				<Breadcrumb.Item href={`/projects/${project._id}`} active>
					{project.projectName}
				</Breadcrumb.Item>
			)}
		</Breadcrumb>
	)
}
