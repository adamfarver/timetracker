import React, { useEffect, useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { AppContext } from '../_components/AppContext'
import { sprintService, alertService } from '@/_services'
import { Breadcrumbs } from '../_components/Breadcrumb'

function AddEdit({ history, match }) {
	const [project, setProject, sprint, setSprint, user, setUser] = useContext(
		AppContext
	)
	const { id } = match.params
	const isAddMode = !id

	const initialValues = {
		sprint: '',
		completed: false,
		userCreated: user[0]._id,
		userModified: user[0]._id,
		sprintType: '',
		active: false,
		dateStart: '',
		dateEnd: '',
		project: project,
	}

	const getToday = function todayDate() {
		const now = new Date()
		const today = now.toJSON().slice(0, 10)
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
		sprintService
			.create(fields)
			.then(() => {
				alertService.success('Sprint added', { keepAfterRouteChange: true })
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
							console.log(sprint)
							const fields = [
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
							fields.forEach((field) => {
								// Fix Date issues
								sprint.dateStart = sprint.dateStart.slice(0, 10)
								sprint.dateEnd = sprint.dateEnd.slice(0, 10)
								// Makes sure the current user is put in userModified field.
								sprint.userModified = user[0]._id
								setFieldValue(field, sprint[field], false)
							})
							setSprint(sprint)
						})
					}
				}, [])

				return (
					<>
						<Breadcrumbs />
						<Form>
							<h1>{isAddMode ? 'Add Sprint' : 'Edit Sprint'}</h1>
							<div className="form-row align-items-end">
								<div className="form-group col-md-6">
									<label htmlFor="sprintType">Sprint Type</label>
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
								</div>
								<div className="form-group col-md-6 text-danger pb-2">
									<ErrorMessage name="sprintType" />
								</div>
							</div>
							<div className="form-row align-items-end ">
								<div className="form-group col-md-2">
									<label htmlFor="dateStart">Start Date</label>
									<Field
										name="dateStart"
										className="form-control"
										type="date"
										min={getToday()}
									/>
								</div>
								<div className="form-group col-md-2">
									<label htmlFor="dateEnd	">End Date</label>
									<Field
										name="dateEnd"
										className="form-control"
										type="date"
										min={getToday()}
									/>
								</div>
								{(errors.dateStart && touched.dateStart) ||
								(errors.dateEnd && touched.dateEnd) ? (
									<div className="text-danger col-md-5 pb-2">
										<p>Both start and end dates are required.</p>
									</div>
								) : null}
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
					</>
				)
			}}
		</Formik>
	)
}

export { AddEdit }
