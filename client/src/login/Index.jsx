import React, { useState, useContext } from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import { Link, useHistory } from 'react-router-dom'
import { authService, userService, alertService } from '@/_services'
import * as Yup from 'yup'
import ReCAPTCHA from 'react-google-recaptcha'
import { Container, Form as BSForm, Row, Col, Button } from 'react-bootstrap'
import { AppContext } from '../_components/AppContext'
import Collaboration from '../img/collaborationillustration.svg'

// TODO: Add Illustration to right side of the form

function Login() {
	const history = useHistory()
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
		password: Yup.string().required('Password is required'),
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
								.then(async (res) => {
									setUser(res)
									res = JSON.stringify(res)
									// Sets current user in local storage
									localStorage.setItem('current_user', res)
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
							<Container className={'px-0'}>
								<Row>
									<Col sm={10} lg={8} className={'offset-sm-1 offset-lg-0'}>
										<img src={Collaboration} alt="Collaboration Image" />
									</Col>
									<Col
										lg={4}
										className="d-flex flex-column justify-content-center mt-5 mt-lg-0"
									>
										<Form>
											<h1>Login</h1>

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

											<ReCAPTCHA
												sitekey="6LcjAEoaAAAAAOWjWJ0Q6TUd55nsRZr1UFTbDxDu"
												onChange={onChange}
											/>

											<div className="mt-3">
												<Button
													type="submit"
													disabled={isSubmitting}
													variant="primary"
												>
													{isSubmitting && (
														<span className="spinner-border spinner-border-sm mr-1"></span>
													)}
													Login
												</Button>
												<Link to={'/'} className="btn btn-link">
													Cancel
												</Link>
											</div>
										</Form>
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

export default Login
