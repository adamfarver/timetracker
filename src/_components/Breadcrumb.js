import React, { useContext } from 'react'
import { Breadcrumb } from 'react-bootstrap'
import { AppContext } from './AppContext'
export function Breadcrumbs() {
	const [project, setProject] = useContext(AppContext)
	const [sprint, setSprint] = useContext(AppContext)
	return (
		<Breadcrumb>
			<Breadcrumb.Item href="/projects">Project List</Breadcrumb.Item>
			{sprint.number ? (
				<Breadcrumb.Item href="https://getbootstrap.com/docs/4.0/components/breadcrumb/">
					Library
				</Breadcrumb.Item>
			) : null}
		</Breadcrumb>
	)
}
