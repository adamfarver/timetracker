import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'

import { projectService, alertService } from '@/_services'

function AddEdit({ history, match }) {
	const { id } = match.params
	const isAddMode = !id

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
						<div className="row align-items-center">
							<div className="col-md-8">
								<div className="form-group">
									<label htmlFor="projectName">Project Name</label>
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
								</div>
							</div>
							<div className="col-md-2 ">
								<div className="form-check-inline col-md">
									<Field
										name="active"
										type="checkbox"
										id="active"
										className={
											'form-check-input' +
											(errors.active && touched.active ? ' is-invalid' : '')
										}
									/>
									<label htmlFor="active" className="form-check-label">
										Active
									</label>
								</div>
							</div>
							<div className="col-md-2">
								<div className="form-check-inline col-md">
									<Field
										name="completed"
										type="checkbox"
										id="completed"
										className={
											'form-check-input' +
											(errors.completed && touched.completed
												? ' is-invalid'
												: '')
										}
									/>
									<label htmlFor="completed" className="form-check-label">
										Completed
									</label>
								</div>
							</div>
						</div>
						<div className="row">
							<div className="col">
								<div className="form-group">
									<label htmlFor="additionalInfo">Additional Info</label>
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
									<ErrorMessage
										name="additionalInfo"
										component="div"
										className="invalid-feedback"
									/>
								</div>
							</div>
						</div>
						<div className="row m-0">
							<h3 className="text-muted">Client</h3>
						</div>
						<div className="row">
							<div className="col-md-6">
								<div className="form-group">
									<label htmlFor="ownerName">Owner Name</label>
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
								</div>
							</div>
							<div className="col-md-6">
								<div className="form-group">
									<label htmlFor="ownerName">Owner Company</label>
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
								</div>
							</div>
						</div>
						<div className="row">
							<div className="col-md">
								<div className="form-group">
									<label htmlFor="ownerPhone">Owner Phone</label>
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
								</div>
							</div>
							<div className="col-md">
								<div className="form-group">
									<label htmlFor="ownerName">Owner Email</label>
									<Field
										name="ownerEmail"
										id="ownerEmail"
										type="email"
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
								</div>
							</div>
						</div>
						<div className="row m-0">
							<h3 className="text-muted">Team</h3>
						</div>
						<div className="row">
							<div className="col-md">
								<div className="form-group">
									<label htmlFor="projectManager">Project Manager</label>
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
										<option value="No One">No One</option>
									</Field>
									<ErrorMessage
										name="projectManager"
										component="div"
										className="invalid-feedback"
									/>
								</div>
							</div>
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
										<option value="No One">No One</option>
									</Field>
									<ErrorMessage
										name="teamLead"
										component="div"
										className="invalid-feedback"
									/>
								</div>
							</div>
						</div>

						<div className="form-group">
							<button
								type="submit"
								disabled={isSubmitting}
								className="btn btn-primary"
							>
								{isSubmitting && (
									<span className="spinner-border spinner-border-sm mr-1"></span>
								)}
								Save
							</button>
							<Link to={isAddMode ? '.' : '..'} className="btn btn-link">
								Cancel
							</Link>
						</div>
					</Form>
				)
			}}
		</Formik>
	)
}

export { AddEdit }
