import React, { useEffect, useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { AppContext } from '../_components/AppContext'
import { sprintService, alertService } from '@/_services'
import { Breadcrumbs } from '../_components/Breadcrumb'
import { dateSlice } from '../_helpers/humanDateFormatter'
import { Form as BSForm, Button, Col } from 'react-bootstrap'
import moment from 'moment'
function AddEdit({ history, match }) {
	const [sprintNumber, setSprintNumber] = useState({})
	const [project, setProject, sprint, setSprint, user, setUser] = useContext(
		AppContext
	)
	const { id } = match.params
	const isAddMode = !id

	const initialValues = {
		sprint: 1,
		completed: false,
		userCreated: user._id,
		userModified: user._id,
		sprintType: '',
		active: false,
		dateStart: '',
		dateEnd: '',
		project: project,
	}

	const getToday = function todayDate() {
		const now = new Date()
		const today = moment(now, 'YYYY-MM-DDTHH:mm:ss.SSS').format('YYYY-MM-DD')
		return today
	}
	const validationSchema = Yup.object().shape({
		sprintType: Yup.string().required('Please select a sprint type.'),
		dateStart: Yup.string().required('Sprint start date required.'),
		dateEnd: Yup.string().required('Sprint end date required.'),
	})

	function onSubmit(fields, { setStatus, setSubmitting }) {
		setStatus()
		if (isAddMode) {
			createSprint(fields, setSubmitting)
		} else {
			updateSprint(id, fields, setSubmitting)
		}
	}

	function createSprint(fields, setSubmitting) {
		fields.project = project._id
		const filteredSprintNumber = sprintNumber.filter(
			(obj) => obj._id === fields.sprintType
		)
		if (filteredSprintNumber.length >= 1) {
			fields.sprint = filteredSprintNumber[0].sprintType + 1
		}
		sprintService
			.create(fields)
			.then(() => {
				alertService.success('Sprint added', { keepAfterRouteChange: true })
				localStorage.setItem('current_sprint', JSON.stringify(fields))
				setSprint(fields)
				history.goBack()
			})
			.catch((error) => {
				setSubmitting(false)
				alertService.error(error)
			})
	}

	function updateSprint(id, fields, setSubmitting) {
		sprintService
			.update(id, fields)
			.then(() => {
				alertService.success('Sprint updated', { keepAfterRouteChange: true })
				history.goBack()
			})
			.catch((error) => {
				setSubmitting(false)
				alertService.error(error)
			})
	}

	function deleteSprint(id) {
		sprintService
			.delete(id)
			.then(() => {
				alertService.success('Sprint Deleted', { keepAfterRouteChange: true })
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
				const [sprint, setSprint] = useState({})

				useEffect(() => {
					if (!isAddMode) {
						// get sprint and set form fields
						sprintService.getById(id).then((sprint) => {
							let fields = [
								'sprint',
								'completed',
								'userCreated',
								'userModified',
								'sprintType',
								'active',
								'dateStart',
								'dateEnd',
								'project',
							]

							sprint.dateStart = dateSlice(sprint.dateStart)
							sprint.dateEnd = dateSlice(sprint.dateEnd)
							fields.forEach((field) => {
								// Makes sure the current user is put in userModified field.
								sprint.userModified = user._id
								setFieldValue(field, sprint[field], false)
							})
							setSprint(sprint)
						})
					} else {
						sprintService.getSprintNumber(project._id).then((data) => {
							setSprintNumber(data)
						})
					}
				}, [])

				return (
					<>
						<Breadcrumbs />
						<Form>
							<BSForm.Row className="m-0">
								<h1>{isAddMode ? 'Add Sprint' : 'Edit Sprint'}</h1>
							</BSForm.Row>
							<BSForm.Row className="align-items-center">
								<Col md={6}>
									<BSForm.Group>
										<BSForm.Label htmlFor="sprintType">
											Sprint Type
										</BSForm.Label>
										<Field
											name="sprintType"
											as="select"
											className={
												'form-control custom-select' +
												(errors.sprintType && touched.sprintType
													? ' is-invalid'
													: '')
											}
										>
											<option value="">None</option>
											<option value="code">Code</option>
											<option value="design">Design</option>
										</Field>
									</BSForm.Group>
									<BSForm.Group className=" text-danger">
										<ErrorMessage name="sprintType" />
									</BSForm.Group>
								</Col>
								<Col md={2} className="pt-md-4">
									<Field type="checkbox" name="active" />
									<BSForm.Label htmlFor="active" className="ml-1">
										Active
									</BSForm.Label>
								</Col>
								<Col md={2} className="pt-md-4">
									<Field type="checkbox" name="completed" />
									<BSForm.Label htmlFor="completed" className="ml-1">
										Complete
									</BSForm.Label>
								</Col>
							</BSForm.Row>
							<BSForm.Row className="align-items-end ">
								<Col md={2}>
									<BSForm.Group>
										<BSForm.Label htmlFor="dateStart">Start Date</BSForm.Label>
										<Field
											name="dateStart"
											className="form-control"
											type="date"
											min={getToday()}
										/>
									</BSForm.Group>
								</Col>
								<Col md={2}>
									<BSForm.Group>
										<BSForm.Label htmlFor="dateEnd">End Date</BSForm.Label>
										<Field
											name="dateEnd"
											className="form-control"
											type="date"
											min={getToday()}
										/>
									</BSForm.Group>
								</Col>
							</BSForm.Row>
							<BSForm.Row className="align-items-between">
								<Col>
									<Button
										type="submit"
										disabled={isSubmitting}
										variant="primary"
									>
										{isSubmitting && (
											<span className="spinner-border spinner-border-sm mr-1"></span>
										)}
										Save
									</Button>
									<Link
										to={`/projects/${project._id}`}
										className="btn btn-link"
									>
										Cancel
									</Link>
								</Col>
								{!isAddMode ? (
									<Col>
										<Button variant="danger" onClick={() => deleteSprint(id)}>
											Delete
										</Button>
									</Col>
								) : null}
							</BSForm.Row>
						</Form>
					</>
				)
			}}
		</Formik>
	)
}

export { AddEdit }
