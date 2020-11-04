import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { projectService, alertService } from '@/_services'

function Home({ history, match }) {
	const { id } = match.params
	const { path } = match
	const [project, setProject] = useState('')
	useEffect(() => {
		projectService.getById(id).then((data) => {
			setProject(data)
		})
	}, [])
	localStorage.setItem('current_project', id)

	return (
		<div className="container">
			<h1>{project.projectName}</h1>
			<p className="text-muted">Sprint: 11/11/2020-11/21/2020</p>
			<div className="row">
				<div className="col-md-6 mt-4">
					<ul className="list-group">
						<li className="list-group-item active d-flex justify-content-between">
							Current Tasks
							<Link to={`/tasks/add`} className="text-white">
								<FontAwesomeIcon icon="plus" /> Add Task
							</Link>
						</li>
						<li className="list-group-item ">Task 1</li>
						<li className="list-group-item ">Task 2</li>
						<li className="list-group-item ">Task 3</li>
						<li className="list-group-item ">Task 4</li>
						<li className="list-group-item ">Task 5</li>
						<li className="list-group-item ">View All</li>
					</ul>
				</div>
				<div className="col-md-6 mt-4">
					<ul className="list-group">
						<li className="list-group-item active">Chart</li>
						<li className="list-group-item ">Task 1</li>
						<li className="list-group-item ">Task 2</li>
						<li className="list-group-item ">Task 3</li>
						<li className="list-group-item ">Task 4</li>
						<li className="list-group-item ">Task 5</li>
						<li className="list-group-item ">View All</li>
					</ul>
				</div>
			</div>
			<div className="row">
				<div className="col-md-6 mt-4">
					<ul className="list-group">
						<li className="list-group-item active d-flex justify-content-between">
							Completed Tasks
							<Link to={`/tasks/add`} className="text-white">
								<FontAwesomeIcon icon="plus" /> Add Task
							</Link>
						</li>
						<li className="list-group-item ">Task 1</li>
						<li className="list-group-item ">Task 2</li>
						<li className="list-group-item ">Task 3</li>
						<li className="list-group-item ">Task 4</li>
						<li className="list-group-item ">Task 5</li>
						<li className="list-group-item ">View All</li>
					</ul>
				</div>
				<div className="col-md-6 mt-4">
					<ul className="list-group">
						<li className="list-group-item active">Backlog</li>
						<li className="list-group-item ">Task 1</li>
						<li className="list-group-item ">Task 2</li>
						<li className="list-group-item ">Task 3</li>
						<li className="list-group-item ">Task 4</li>
						<li className="list-group-item ">Task 5</li>
						<li className="list-group-item ">View All</li>
					</ul>
				</div>
			</div>
		</div>
	)
}

export { Home }
