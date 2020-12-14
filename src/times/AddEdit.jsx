import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'

import { timeService, alertService } from '@/_services'

function AddEdit({ history, match }) {
	const { id } = match.params

	const initialValues = {}

	const validationSchema = Yup.object().shape({})

	function onSubmit(fields, { setStatus, setSubmitting }) {
		setStatus()
	}

	function updateTime(id, fields, setSubmitting) {
		timeService
			.update(id, fields)
			.then(() => {
				alertService.success('Time updated', { keepAfterRouteChange: true })
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
				const [time, settime] = useState({})
				const [showPassword, setShowPassword] = useState(false)

				useEffect(() => {
					if (!isAddMode) {
						// get time and set form fields
						timeService.getById(id).then((time) => {
							const fields = ['title', 'firstName', 'lastName', 'email', 'role']
							fields.forEach((field) =>
								setFieldValue(field, time[field], false)
							)
							settime(time)
						})
					}
				}, [])

				return (
					<Form>
						<h1>{isAddMode ? 'Add time' : 'Edit time'}</h1>
						<div className="form-row">
							<div className="form-group col">
								<label>Title</label>
								<Field
									name="title"
									as="select"
									className={
										'form-control' +
										(errors.title && touched.title ? ' is-invalid' : '')
									}
								>
									<option value=""></option>
									<option value="Mr">Mr</option>
									<option value="Mrs">Mrs</option>
									<option value="Miss">Miss</option>
									<option value="Ms">Ms</option>
								</Field>
								<ErrorMessage
									name="title"
									component="div"
									className="invalid-feedback"
								/>
							</div>
							<div className="form-group col-5">
								<label>First Name</label>
								<Field
									name="firstName"
									type="text"
									className={
										'form-control' +
										(errors.firstName && touched.firstName ? ' is-invalid' : '')
									}
								/>
								<ErrorMessage
									name="firstName"
									component="div"
									className="invalid-feedback"
								/>
							</div>
							<div className="form-group col-5">
								<label>Last Name</label>
								<Field
									name="lastName"
									type="text"
									className={
										'form-control' +
										(errors.lastName && touched.lastName ? ' is-invalid' : '')
									}
								/>
								<ErrorMessage
									name="lastName"
									component="div"
									className="invalid-feedback"
								/>
							</div>
						</div>
						<div className="form-row">
							<div className="form-group col-7">
								<label>Email</label>
								<Field
									name="email"
									type="text"
									className={
										'form-control' +
										(errors.email && touched.email ? ' is-invalid' : '')
									}
								/>
								<ErrorMessage
									name="email"
									component="div"
									className="invalid-feedback"
								/>
							</div>
							<div className="form-group col">
								<label>Role</label>
								<Field
									name="role"
									as="select"
									className={
										'form-control' +
										(errors.role && touched.role ? ' is-invalid' : '')
									}
								>
									<option value=""></option>
									<option value="time">time</option>
									<option value="Admin">Admin</option>
								</Field>
								<ErrorMessage
									name="role"
									component="div"
									className="invalid-feedback"
								/>
							</div>
						</div>
						{!isAddMode && (
							<div>
								<h3 className="pt-3">Change Password</h3>
								<p>Leave blank to keep the same password</p>
							</div>
						)}
						<div className="form-row">
							<div className="form-group col">
								<label>
									Password
									{!isAddMode &&
										(!showPassword ? (
											<span>
												{' '}
												-{' '}
												<a
													onClick={() => setShowPassword(!showPassword)}
													className="text-primary"
												>
													Show
												</a>
											</span>
										) : (
											<span> - {time.password}</span>
										))}
								</label>
								<Field
									name="password"
									type="password"
									className={
										'form-control' +
										(errors.password && touched.password ? ' is-invalid' : '')
									}
								/>
								<ErrorMessage
									name="password"
									component="div"
									className="invalid-feedback"
								/>
							</div>
							<div className="form-group col">
								<label>Confirm Password</label>
								<Field
									name="confirmPassword"
									type="password"
									className={
										'form-control' +
										(errors.confirmPassword && touched.confirmPassword
											? ' is-invalid'
											: '')
									}
								/>
								<ErrorMessage
									name="confirmPassword"
									component="div"
									className="invalid-feedback"
								/>
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
