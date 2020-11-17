import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { Breadcrumbs } from '../_components/Breadcrumb'
import { AppContext } from '../_components/AppContext'
import { projectService, alertService } from '@/_services'

function List({ match }) {
	const { path } = match
	const [projects, setprojects] = useState(null)
	const [project, setProject] = useContext(AppContext)
	localStorage.removeItem('current_project')

	useEffect(() => {
		projectService.getAll().then((data) => {
			setprojects(data)
			setProject({})
		})
	}, [])

	function deleteproject(id) {
		projectService.delete(id).then(() => {
			setprojects((projects) =>
				projects.filter((project) => project._id !== id)
			)
		})
	}

	return (
		<div>
			{project.name ? (
				<div className="row">
					<div className="col-12">
						<Breadcrumbs />
					</div>
				</div>
			) : null}
			<h1>Projects</h1>
			<Link to={`${path}/add`} className="btn btn-sm btn-success mb-2">
				Add Projects
			</Link>
			<table className="table table-striped">
				<thead>
					<tr>
						<th className="col-4">Project Name</th>
						<th className="col-3">Client</th>
						<th className="col-3">Project Manager</th>
						<th className="col-2 mr-auto"></th>
					</tr>
				</thead>
				<tbody>
					{projects &&
						projects.map((project) => (
							<tr key={project._id}>
								<td>
									<Link
										to={'/projects/' + project._id}
										onClick={() => setProject(project)}
									>
										{project.projectName}
									</Link>
								</td>
								<td>{project.ownerCompany}</td>
								<td>
									{project.projectManager.firstName}{' '}
									{project.projectManager.lastName}
								</td>
								<td style={{ whiteSpace: 'nowrap' }}>
									<Link
										to={`${path}/edit/${project._id}`}
										className="btn btn-sm btn-primary mr-1"
									>
										Edit
									</Link>
									<button
										onClick={() => deleteproject(project._id)}
										className="btn btn-sm btn-danger btn-delete-project"
										disabled={project.isDeleting}
									>
										{project.isDeleting ? (
											<span className="spinner-border spinner-border-sm"></span>
										) : (
											<span>Delete</span>
										)}
									</button>
								</td>
							</tr>
						))}
					{!projects && (
						<tr>
							<td colSpan="4" className="text-center">
								<div className="spinner-border spinner-border-lg align-center"></div>
							</td>
						</tr>
					)}
					{projects && !projects.length && (
						<tr>
							<td colSpan="4" className="text-center">
								<div className="p-2">No projects To Display</div>
							</td>
						</tr>
					)}
				</tbody>
			</table>
		</div>
	)
}

export { List }
