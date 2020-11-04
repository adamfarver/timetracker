import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'

import { taskService, alertService } from '@/_services'

function AddEdit({ history, match }) {
	const { id } = match.params
	const isAddMode = !id

	const initialValues = {
		taskName: '',
		completed: false,
		additionalInfo: '',
		active: true,
	}

	const validationSchema = Yup.object().shape({})

	function onSubmit(fields, { setStatus, setSubmitting }) {
		setStatus()
		if (isAddMode) {
			createTask(fields, setSubmitting)
		} else {
			updateTask(id, fields, setSubmitting)
		}
	}

	function createTask(fields, setSubmitting) {
		taskService
			.create(fields)
			.then(() => {
				alertService.success('Task added', { keepAfterRouteChange: true })
				history.goBack()
			})
			.catch(() => {
				setSubmitting(false)
				alertService.error(error)
			})
	}

	function updateTask(id, fields, setSubmitting) {
		taskService
			.update(id, fields)
			.then(() => {
				alertService.success('Task updated', { keepAfterRouteChange: true })
				history.goBack()
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
				const [task, setTask] = useState({})

				useEffect(() => {
					if (!isAddMode) {
						// get task and set form fields
						taskService.getById(id).then((task) => {
							const fields = [
								'taskName',
								'dateCompleted',
								'completed',
								'userCreated',
								'userModified',
								'additionalInfo',
								'active',
								'project',
								'projectManager',
								'sprint',
								'claimedBy',
								'projectedTime',
								'actualUsedTime',
							]
							fields.forEach((field) =>
								setFieldValue(field, task[field], false)
							)
							setTask(task)
						})
					}
				}, [])

				return (
					<Form>
						<h1>{isAddMode ? 'Add Task' : 'Edit Task'}</h1>
						<div className="form-row align-items-end">
							<div className="col-md-8">
								<div className="form-group">
									<label htmlFor="taskName">Task Name</label>
									<Field
										name="taskName"
										id="taskName"
										type="text"
										className={
											'form-control' +
											(errors.taskName && touched.taskName ? ' is-invalid' : '')
										}
									/>
									<ErrorMessage
										name="taskName"
										component="div"
										className="invalid-feedback"
									/>
								</div>
							</div>
							<div className="col-md-2 mb-4">
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
							<div className="col-md-2 mb-4">
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
						<div className="form-row">
							<div className="form-group col-md">
								<label htmlFor="additionalInfo">Addtional Info</label>
								<Field
									name="additionalInfo"
									as="textarea"
									rows="3"
									id="addtionalInfo"
									className="form-control"
								/>
							</div>
						</div>
						<div className="form-row">
							<div className="form-group col">
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
						</div>
					</Form>
				)
			}}
		</Formik>
	)
}

export { AddEdit }
