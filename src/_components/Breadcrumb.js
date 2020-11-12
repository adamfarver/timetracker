import React, { useContext } from 'react'
import { BreadcrumbContext } from './BreadcrumbContext'
export function Breadcrumb() {
	const [project, setProject] = useContext(BreadcrumbContext)
	const [sprint, setSprint] = useContext(BreadcrumbContext)
	return (
		<div>
			<nav aria-label="breadcrumb">
				<ol className="breadcrumb">
					<li
						className={
							'breadcrumb-item' + (project.projectName ? ' ' : ' active')
						}
						aria-current="page"
					>
						<a href="/projects">Home</a>
					</li>
					{project ? (
						<li className="breadcrumb-item">
							<a href="#">{project.projectName}</a>
						</li>
					) : null}
				</ol>
			</nav>
		</div>
	)
}
