import React, { useState, useContext } from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import { Link } from 'react-router-dom'
import { userService, alertService } from '@/_services'
import * as Yup from 'yup'
import ReCAPTCHA from 'react-google-recaptcha'
import { Form as BSForm, Col, Button } from 'react-bootstrap'
import { AppContext } from '../_components/AppContext'

function Registration({ history }) {
	const [isHuman, setIsHuman] = useState(false)
	const [project, setProject, sprint, setSprint, user, setUser, task, setTask] =
		useContext(AppContext)

	const initialValues = {
		firstName: '',
		lastName: '',
		email: '',
	}

	const validationSchema = Yup.object().shape({
		firstName: Yup.string().required('First Name is required'),
		lastName: Yup.string().required('Last Name is required'),
		email: Yup.string().email('Email is invalid').required('Email is required'),
	})

	const onChange = (response) => {
		if (response) {
			setIsHuman(true)
		} else {
			setIsHuman(false)
		}
	}

	return (
		<>
			<div>
				<Formik
					initialValues={initialValues}
					validationSchema={validationSchema}
					onSubmit={(fields, { setStatus, setSubmitting }) => {
						if (isHuman) {
							fields.role = '5f83b76c9afb0523d2e7ac7a'
							userService
								.create(fields)
								.then(() => {
									alertService.success('User added', {
										keepAfterRouteChange: true,
									})
								})

								.then(async () => {
									// Get list of users and sets storage location
									const list = await userService.getWithRole()
									// Get length of array
									const lastUser = list.length - 1
									// Get last added user
									let newestUser = list[lastUser]
									// Sets current user in state
									setUser(newestUser)
									newestUser = JSON.stringify(newestUser)
									// Sets current user in local storage
									localStorage.setItem('current_user', newestUser)
								})
								.then(() => {
									history.push('/projects')
								})
								.catch((error) => {
									setSubmitting(false)
									alertService.error(error)
								})
						} else {
							alertService.error('Please return when human.')
							setSubmitting(false)
						}
					}}
				>
					{({ errors, touched, isSubmitting, setFieldValue }) => {
						return (
							<>
								<Form>
									<BSForm.Row>
										<Col>
											<h1>Sign Up</h1>
										</Col>
									</BSForm.Row>
									<BSForm.Row>
										<Col>
											<small>
												This will give you a taste of the app and we reset all
												data in the database at midnight of every day. If your
												session is across midnight, it will create issues
												because your user will no longer be in the database. By
												default, you will be a manager of the data.
											</small>
										</Col>
									</BSForm.Row>
									<BSForm.Row className="mt-3">
										<Col md={6}>
											<BSForm.Group>
												<BSForm.Label htmlFor="firstName">
													First Name
												</BSForm.Label>
												<Field
													name="firstName"
													type="text"
													id="firstName"
													className={
														'form-control' +
														(errors.projectName && touched.projectName
															? ' is-invalid'
															: '')
													}
												/>
											</BSForm.Group>
											<BSForm.Group className=" text-danger">
												<ErrorMessage name="firstName" />
											</BSForm.Group>
										</Col>
										<Col md={6}>
											<BSForm.Group>
												<BSForm.Label htmlFor="lastName">
													Last Name
												</BSForm.Label>
												<Field
													name="lastName"
													type="text"
													id="lastName"
													className={
														'form-control' +
														(errors.projectName && touched.projectName
															? ' is-invalid'
															: '')
													}
												/>
											</BSForm.Group>
											<BSForm.Group className=" text-danger">
												<ErrorMessage name="lastName" />
											</BSForm.Group>
										</Col>
									</BSForm.Row>
									<BSForm.Row>
										<Col md={6}>
											<BSForm.Group>
												<BSForm.Label htmlFor="email">Email</BSForm.Label>
												<Field
													name="email"
													type="text"
													id="email"
													className={
														'form-control' +
														(errors.projectName && touched.projectName
															? ' is-invalid'
															: '')
													}
												/>
											</BSForm.Group>
											<BSForm.Group className=" text-danger">
												<ErrorMessage name="email" />
											</BSForm.Group>
										</Col>
									</BSForm.Row>
									<BSForm.Row className="mb-3">
										<Col>
											<ReCAPTCHA
												sitekey="6LcjAEoaAAAAAOWjWJ0Q6TUd55nsRZr1UFTbDxDu"
												onChange={onChange}
											/>
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
											<Link to={'/projects'} className="btn btn-link">
												Cancel
											</Link>
										</Col>
									</BSForm.Row>
								</Form>
							</>
						)
					}}
				</Formik>
			</div>
		</>
	)
}

export default Registration
