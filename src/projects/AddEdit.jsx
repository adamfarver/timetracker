import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import { Form as BSForm, Button, Col } from 'react-bootstrap'
import * as Yup from 'yup'

import { projectService, userService, alertService } from '@/_services'

function AddEdit({ history, match }) {
	const { id } = match.params
	const isAddMode = !id
	const [managers, setManagers] = useState({})

	useEffect(() => {
		userService.getWithRole().then((users) => {
			const filteredManagers = users.filter(
				(user) => user.role.roleName === 'Manager'
			)
			setManagers(filteredManagers)
		})
	}, [])

	const initialValues = {
		projectName: '',
		active: '',
		complete: '',
		additionalInfo: '',
		ownerName: '',
		ownerCompany: '',
		ownerPhone: '',
		ownerEmail: '',
		projectManager: '',
		teamLead: '',
	}

	const validationSchema = Yup.object().shape({
		additionalInfo: Yup.string(),
		ownerCompany: Yup.string().required('Please enter client company.'),
		ownerEmail: Yup.string().required('Please enter client email.'),
		ownerName: Yup.string().required('Please enter client name.'),
		ownerPhone: Yup.string().required('Please enter client phone.'),
		projectManager: Yup.string().required('Please choose project manager.'),
		projectName: Yup.string().required('Please enter project name.'),
		teamLead: Yup.string().required('Please choose team lead.'),
	})

	function onSubmit(fields, { setStatus, setSubmitting }) {
		setStatus()
		if (isAddMode) {
			createProject(fields, setSubmitting)
		} else {
			updateProject(id, fields, setSubmitting)
		}
	}

	function createProject(fields, setSubmitting) {
		projectService
			.create(fields)
			.then(() => {
				alertService.success('Project added', { keepAfterRouteChange: true })
				history.push('.')
			})
			.catch((error) => {
				setSubmitting(false)
				alertService.error(error)
			})
	}

	function updateProject(id, fields, setSubmitting) {
		projectService
			.update(id, fields)
			.then(() => {
				alertService.success('Project updated', { keepAfterRouteChange: true })
				history.push('..')
			})
			.catch((error) => {
				setSubmitting(false)
				alertService.error(error)
			})
	}

	return (
		<Formik
			initialValues={initialValues}
			validationSchema={validationSchema}
			onSubmit={onSubmit}
		>
			{({ errors, touched, isSubmitting, setFieldValue }) => {
				const [project, setProject] = useState({})

				useEffect(() => {
					if (!isAddMode) {
						// get user and set form fields
						projectService.getById(id).then((project) => {
							const fields = [
								'active',
								'additionalInfo',
								'completed',
								'ownerCompany',
								'ownerEmail',
								'ownerName',
								'ownerPhone',
								'projectManager',
								'projectName',
								'teamLead',
							]
							fields.forEach((field) =>
								setFieldValue(field, project[field], false)
							)
							setProject(project)
						})
					}
				}, [])

				return (
					<Form>
						<h1>{isAddMode ? 'Add Project' : 'Edit Project'}</h1>
						<BSForm.Row className="align-items-center">
							<Col md={8}>
								<BSForm.Group>
									<BSForm.Label htmlFor="projectName">
										Project Name
									</BSForm.Label>

									<Field
										name="projectName"
										id="projectName"
										type="text"
										className={
											'form-control' +
											(errors.projectName && touched.projectName
												? ' is-invalid'
												: '')
										}
									/>
									<ErrorMessage
										name="projectName"
										component="div"
										className="invalid-feedback"
									/>
								</BSForm.Group>
							</Col>
							<Col md={2}>
								<BSForm.Group className="form-check-inline mt-md-4">
									<Field
										name="active"
										type="checkbox"
										id="active"
										className={
											'form-check-input' +
											(errors.active && touched.active ? ' is-invalid' : '')
										}
									/>
									<BSForm.Label htmlFor="active" className="form-check-label">
										Active
									</BSForm.Label>
								</BSForm.Group>
							</Col>
							<Col md={2}>
								<BSForm.Group className="form-check-inline mt-md-4">
									<Field
										name="complete"
										type="checkbox"
										id="completed"
										className={
											'form-check-input' +
											(errors.active && touched.active ? ' is-invalid' : '')
										}
									/>
									<BSForm.Label htmlFor="complete" className="form-check-label">
										Completed
									</BSForm.Label>
								</BSForm.Group>
							</Col>
						</BSForm.Row>

						<BSForm.Row>
							<Col>
								<BSForm.Group>
									<BSForm.Label htmlFor="additionalInfo">
										Additional Info
									</BSForm.Label>
									<Field
										as="textarea"
										rows="3"
										name="additionalInfo"
										id="addtionalInfo"
										type="textarea"
										className={
											'form-control' +
											(errors.additionalInfo && touched.additionalInfo
												? ' is-invalid'
												: '')
										}
									/>
								</BSForm.Group>
							</Col>
						</BSForm.Row>
						<BSForm.Row>
							<Col>
								<h3 className="text-muted">Client</h3>
							</Col>
						</BSForm.Row>
						<BSForm.Row>
							<Col md>
								<BSForm.Group>
									<BSForm.Label htmlFor="ownerName">Owner Name</BSForm.Label>
									<Field
										name="ownerName"
										id="ownerName"
										type="text"
										className={
											'form-control' +
											(errors.ownerName && touched.ownerName
												? ' is-invalid'
												: '')
										}
									/>
									<ErrorMessage
										name="ownerName"
										component="div"
										className="invalid-feedback"
									/>
								</BSForm.Group>
							</Col>
							<Col md>
								<BSForm.Group>
									<BSForm.Label htmlFor="ownerCompany">
										Owner Company
									</BSForm.Label>
									<Field
										name="ownerCompany"
										id="ownerCompany"
										type="text"
										className={
											'form-control' +
											(errors.ownerCompany && touched.ownerCompany
												? ' is-invalid'
												: '')
										}
									/>
									<ErrorMessage
										name="ownerCompany"
										component="div"
										className="invalid-feedback"
									/>
								</BSForm.Group>
							</Col>
						</BSForm.Row>
						<BSForm.Row>
							<Col md>
								<BSForm.Group>
									<BSForm.Label htmlFor="ownerPhone">Owner Phone</BSForm.Label>
									<Field
										name="ownerPhone"
										id="ownerPhone"
										type="text"
										className={
											'form-control' +
											(errors.ownerPhone && touched.ownerPhone
												? ' is-invalid'
												: '')
										}
									/>
									<ErrorMessage
										name="ownerPhone"
										component="div"
										className="invalid-feedback"
									/>
								</BSForm.Group>
							</Col>
							<Col md>
								<BSForm.Group>
									<BSForm.Label htmlFor="ownerEmail">Owner Email</BSForm.Label>
									<Field
										name="ownerEmail"
										id="ownerEmail"
										type="text"
										className={
											'form-control' +
											(errors.ownerEmail && touched.ownerEmail
												? ' is-invalid'
												: '')
										}
									/>
									<ErrorMessage
										name="ownerEmail"
										component="div"
										className="invalid-feedback"
									/>
								</BSForm.Group>
							</Col>
						</BSForm.Row>
						<BSForm.Row>
							<Col>
								<h3 className="text-muted">Team</h3>
							</Col>
						</BSForm.Row>
						<BSForm.Row>
							<Col md>
								<BSForm.Group>
									<BSForm.Label htmlFor="projectManager">
										Project Manager
									</BSForm.Label>
									<Field
										as="select"
										name="projectManager"
										id="projectManager"
										type="select"
										className={
											'custom-select' +
											(errors.projectManager && touched.projectManager
												? ' is-invalid'
												: '')
										}
									>
										<option value="No One">No One</option>
										{Object.keys(managers).map((key) => (
											<option key={managers[key]._id} value={managers[key]._id}>
												{managers[key].firstName} {managers[key].lastName}
											</option>
										))}
									</Field>
									<ErrorMessage
										name="projectManager"
										component="div"
										className="invalid-feedback"
									/>
								</BSForm.Group>
							</Col>

							<Col md>
								<BSForm.Group>
									<BSForm.Label htmlfor="teamLead">Team Lead</BSForm.Label>
									<Field
										as="select"
										name="teamLead"
										id="teamlead"
										type="select"
										className={
											'custom-select' +
											(errors.teamLead && touched.teamLead ? ' is-invalid' : '')
										}
									>
										{' '}
										<option value="No One">No One</option>
										{Object.keys(managers).map((key) => (
											<option key={managers[key]._id} value={managers[key]._id}>
												{managers[key].firstName} {managers[key].lastName}
											</option>
										))}
									</Field>
									<ErrorMessage
										name="teamLead"
										component="div"
										className="invalid-feedback"
									/>
								</BSForm.Group>
							</Col>
						</BSForm.Row>
						{/* 
						<div className="row">
							<div className="col-md">
								<div className="form-group">
									<label htmlFor="teamLead">Team Lead</label>
									<Field
										as="select"
										name="teamLead"
										id="teamlead"
										type="select"
										className={
											'custom-select' +
											(errors.teamLead && touched.teamLead ? ' is-invalid' : '')
										}
									>
										{' '}
										<option value="No One">No One</option>
										{Object.keys(managers).map((key) => (
											<option key={managers[key]._id} value={managers[key]._id}>
												{managers[key].firstName} {managers[key].lastName}
											</option>
										))}
									</Field>
									<ErrorMessage
										name="teamLead"
										component="div"
										className="invalid-feedback"
									/>
								</div>
							</div>
						</div> */}
						<BSForm.Row>
							<Col>
								<BSForm.Group>
									<Button
										type="submit"
										disabled={isSubmitting}
										className="btn btn-primary"
									>
										{isSubmitting && (
											<span className="spinner-border spinner-border-sm mr-1"></span>
										)}
										Save
									</Button>
									<Link to={isAddMode ? '.' : '..'} className="btn btn-link">
										Cancel
									</Link>
								</BSForm.Group>
							</Col>
						</BSForm.Row>
					</Form>
				)
			}}
		</Formik>
	)
}

export { AddEdit }
