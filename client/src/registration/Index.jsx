import React, { useState, useContext } from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import { Link, useHistory } from 'react-router-dom'
import { userService, alertService } from '@/_services'
import * as Yup from 'yup'
import ReCAPTCHA from 'react-google-recaptcha'
import { Form as BSForm, Row, Col, Button, Container } from 'react-bootstrap'
import { AppContext } from '../_components/AppContext'
import registration from '../img/registration.svg'

// TODO: Add Illustration to right side of the form

function Registration() {
	const history = useHistory()
	const [isHuman, setIsHuman] = useState(false)
	const [project, setProject, sprint, setSprint, user, setUser, task, setTask] =
		useContext(AppContext)

	const initialValues = {
		firstName: '',
		lastName: '',
		email: '',
		password: '',
		verifyPassword: '',
	}

	const validationSchema = Yup.object().shape({
		firstName: Yup.string().required('First Name is required'),
		lastName: Yup.string().required('Last Name is required'),
		email: Yup.string()
			.email('Email is invalid')
			.required('Email is required')
			.lowercase(),
		password: Yup.string()
			.min(8, 'Password must be at least 8 characters long.')
			.required('Password longer than 8 characters is required.'),
		verifyPassword: Yup.string().oneOf(
			[Yup.ref('password'), null],
			'Passwords must match'
		),
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
							delete fields.verifyPassword
							userService
								.create(fields)

								.then((res) => {
									setUser(res)
									res = JSON.stringify(res)
									// Sets current user in local storage
									localStorage.setItem('current_user', res)
								})
								.then((res) => {
									console.log(res)
									alertService.success('User added', {
										keepAfterRouteChange: true,
									})
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
							<Container className="m-0 px-0">
								<Row className=" d-flex align-items-center">
									<Col lg={4} className={'mt-3 order-2 order-lg-1'}>
										<Form>
											<h1>Sign Up</h1>

											<small>
												This will give you a taste of the app and we reset all
												data in the database at midnight of every day. If your
												session is across midnight, it will create issues
												because your user will no longer be in the database. By
												default, you will be a manager of the data.
											</small>

											<BSForm.Group className="pt-3">
												<BSForm.Label htmlFor="firstName">
													First Name
												</BSForm.Label>
												<Field
													name="firstName"
													type="text"
													id="firstName"
													className={
														'form-control' +
														(errors.firstName && touched.firstName
															? ' is-invalid'
															: '')
													}
												/>
											</BSForm.Group>
											<BSForm.Group className=" text-danger">
												<ErrorMessage name="firstName" />
											</BSForm.Group>

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
														(errors.lastName && touched.lastName
															? ' is-invalid'
															: '')
													}
												/>
											</BSForm.Group>
											<BSForm.Group className=" text-danger">
												<ErrorMessage name="lastName" />
											</BSForm.Group>

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

											<BSForm.Group>
												<BSForm.Label htmlFor="verifyPassword">
													Verify Password
												</BSForm.Label>
												<Field
													name="verifyPassword"
													type="password"
													id="verifyPassword"
													className={
														'form-control' +
														(errors.verifyPassword && touched.verifyPassword
															? ' is-invalid'
															: '')
													}
												/>
											</BSForm.Group>
											<BSForm.Group className=" text-danger">
												<ErrorMessage name="verifyPassword" />
											</BSForm.Group>

											<ReCAPTCHA
												sitekey="6LcjAEoaAAAAAOWjWJ0Q6TUd55nsRZr1UFTbDxDu"
												onChange={onChange}
												className={'pb-3'}
											/>

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
										</Form>
									</Col>
									<Col className="order-1 order-lg-2">
										<img src={registration} alt="Image of people using app" />
									</Col>
								</Row>
							</Container>
						)
					}}
				</Formik>
			</div>
		</>
	)
}

export default Registration
