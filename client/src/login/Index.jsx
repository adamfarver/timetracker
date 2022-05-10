import React, { useState, useContext } from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import { Link } from 'react-router-dom'
import { authService, alertService } from '@/_services'
import * as Yup from 'yup'
import ReCAPTCHA from 'react-google-recaptcha'
import { Form as BSForm, Col, Button } from 'react-bootstrap'
import { AppContext } from '../_components/AppContext'

// TODO: Add Illustration to right side of the form

function Login({ history }) {
	const [isHuman, setIsHuman] = useState(false)
	const [project, setProject, sprint, setSprint, user, setUser, task, setTask] =
		useContext(AppContext)

	const initialValues = {
		email: '',
		password: '',
	}

	const validationSchema = Yup.object().shape({
		email: Yup.string()
			.email('Email is invalid')
			.required('Email is required')
			.lowercase(),
		password: Yup.string()
			.min(8, 'Password must be at least 8 characters long.')
			.required('Password longer than 8 characters is required.'),
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
							authService
								.loginUser(fields)
								// TODO: Fix the rest of this. This contains all stuff from registration page.
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
											<h1>Login</h1>
										</Col>
									</BSForm.Row>

									<BSForm.Row>
										<Col md={4}>
											<BSForm.Group>
												<BSForm.Label htmlFor="email">Email</BSForm.Label>
												<Field
													name="email"
													type="text"
													id="email"
													className={
														'form-control' +
														(errors.email && touched.email ? ' is-invalid' : '')
													}
												/>
											</BSForm.Group>
											<BSForm.Group className=" text-danger">
												<ErrorMessage name="email" />
											</BSForm.Group>
										</Col>
									</BSForm.Row>
									<BSForm.Row>
										<Col md={4}>
											<BSForm.Group>
												<BSForm.Label htmlFor="password">Password</BSForm.Label>
												<Field
													name="password"
													type="password"
													id="password"
													className={
														'form-control' +
														(errors.password && touched.password
															? ' is-invalid'
															: '')
													}
												/>
											</BSForm.Group>
											<BSForm.Group className=" text-danger">
												<ErrorMessage name="password" />
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
											<Link to={'/'} className="btn btn-link">
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

export default Login