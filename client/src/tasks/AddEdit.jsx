import React, { useEffect, useState, useContext } from 'react'
import { AppContext } from '../_components/AppContext'
import { Link } from 'react-router-dom'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import { Form as BSForm, Button, Col } from 'react-bootstrap'
import * as Yup from 'yup'
import { dateSlice } from '../_helpers/humanDateFormatter'

import { taskService, sprintService, alertService } from '@/_services'
import { FindValueSubscriber } from 'rxjs/internal/operators/find'

function AddEdit({ history, match }) {
	const [project, setProject, sprint, setSprint, user, setUser] =
		useContext(AppContext)
	const [sprintList, setSprintList] = useState([])
	const { id } = match.params
	const isAddMode = !id

	useEffect(() => {
		try {
			sprintService
				.filterByProjectId(project._id)
				.then((data) => data.filter((sprint) => sprint.completed === false))
				.then((list) =>
					list.map((item) => {
						item.dateStart = dateSlice(item.dateStart)
						item.dateEnd = dateSlice(item.dateStart)
						return item
					})
				)
				.then((list) => setSprintList(list))
		} catch (error) {
			console.log(error)
		}
	}, [])

	const initialValues = {
		taskName: '',
		dateCompleted: '',
		completed: false,
		userCreated: '',
		userModified: user._id,
		additionalInfo: '',
		active: false,
		project: project._id,
		sprint: '',
		claimedBy: '',
		projectedTime: '',
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
		fields.userCreated = user._id
		const emptyKeys = Object.keys(fields).filter((key) => fields[key] === '')
		emptyKeys.map((key) => delete fields[key])
		taskService
			.create(fields)
			.then(() => {
				alertService.success('Task added', { keepAfterRouteChange: true })
				history.goBack()
			})
			.catch((error) => {
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
			{({ values, errors, touched, isSubmitting, setFieldValue }) => {
				const [task, setTask] = useState({})

				useEffect(() => {
					if (!isAddMode) {
						// get task and set form fields
						taskService
							.getById(id)
							.then((task) => {
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
								]
								fields.forEach((field) =>
									setFieldValue(field, task[field], false)
								)
								setTask(task)
							})
							.catch((e) => history.push('/404'))
					}
				}, [])

				return (
					<Form>
						<BSForm.Row className="m-0">
							<h1>{isAddMode ? 'Add Task' : 'Edit Task'}</h1>
						</BSForm.Row>
						<BSForm.Row className="align-items-center">
							<Col md={4}>
								<BSForm.Group>
									<BSForm.Label htmlFor="taskName">Task Name</BSForm.Label>
									<Field
										name="taskName"
										id="taskName"
										type="text"
										className={
											'form-control' +
											(errors.projectName && touched.projectName
												? ' is-invalid'
												: '')
										}
									/>
								</BSForm.Group>
								<BSForm.Group className=" text-danger">
									<ErrorMessage name="taskName" />
								</BSForm.Group>
							</Col>
							<Col md={1} className="pt-md-4">
								<Field type="checkbox" name="active" />
								<BSForm.Label htmlFor="active" className="ml-1">
									Active
								</BSForm.Label>
							</Col>
							<Col>
								<BSForm.Group controlId="sprint">
									<BSForm.Label>Sprint</BSForm.Label>
									<Field
										as="select"
										name="sprint"
										disabled={values.active !== true}
										className={
											'custom-select' +
											(errors.sprint && touched.sprint ? ' is-invalid' : '')
										}
									>
										<option>Choose...</option>
										{Object.keys(sprintList).map((key) => (
											<option
												key={sprintList[key]._id}
												value={sprintList[key]._id}
											>
												{`${sprintList[key].sprintType} ${sprintList[key].sprint} => ${sprintList[key].dateStart} - ${sprintList[key].dateEnd}`}
											</option>
										))}
									</Field>
								</BSForm.Group>
							</Col>

							<Col md={2} className="pt-md-4">
								<Field type="checkbox" name="completed" />
								<BSForm.Label htmlFor="completed" className="ml-1">
									Complete
								</BSForm.Label>
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
							<Col xl={2}>
								<BSForm.Group>
									<BSForm.Label htmlFor="projectedTime">
										Projected Time
									</BSForm.Label>
									<Field
										name="projectedTime"
										type="number"
										step=".25"
										min=".25"
										id="projectedTime"
										className={
											'form-control' +
											(errors.projectName && touched.projectName
												? ' is-invalid'
												: '')
										}
									/>
								</BSForm.Group>
							</Col>
						</BSForm.Row>
						<BSForm.Row className="align-items-between">
							<Col>
								<Button type="submit" disabled={isSubmitting} variant="primary">
									{isSubmitting && (
										<span className="spinner-border spinner-border-sm mr-1"></span>
									)}
									Save
								</Button>
								{isAddMode ? (
									<Link
										to={`/tasks/${project._id}/backlog`}
										className="btn btn-link"
									>
										Cancel
									</Link>
								) : (
									<Link to={`/tasks/view/${id}`} className="btn btn-link">
										Cancel
									</Link>
								)}
							</Col>
							{!isAddMode ? (
								<Col>
									<Button variant="danger" onClick={() => deleteTask(id)}>
										Delete
									</Button>
								</Col>
							) : null}
						</BSForm.Row>
					</Form>
				)
			}}
		</Formik>
	)
}

export { AddEdit }
