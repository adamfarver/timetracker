import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Form as BSForm, Row, Col, Button } from 'react-bootstrap'

import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'

import { taskService, alertService } from '@/_services'

function AddEdit({ history, match }) {
	const { id } = match.params

	const initialValues = { actualUsedTime: '0' }

	const validationSchema = Yup.object().shape({})

	function onSubmit(fields, { setStatus, setSubmitting }) {
		updateTime(id, fields, setSubmitting)
		setStatus()
		setSubmitting(false)
	}

	function updateTime(id, fields, setSubmitting) {
		taskService
			.update(id, fields)
			.then(() => {
				alertService.success('Time updated', { keepAfterRouteChange: true })
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
				const [time, setTime] = useState({})

				useEffect(() => {
					// get time and set form fields
					taskService.getById(id).then((time) => {
						const fields = ['actualUsedTime']
						fields.forEach((field) => setFieldValue(field, time[field], false))

						setTime(time)
					})
				}, [])

				return (
					<Form>
						<Row>
							<Col>
								<h4>Edit Time</h4>
							</Col>
						</Row>
						<Row>
							<Col>
								<BSForm.Group>
									<BSForm.Label htmlFor="actualUsedTime">
										Used Time
									</BSForm.Label>
									<Field
										name="actualUsedTime"
										id="actualUsedTime"
										type="number"
										min="0"
										step=".5"
										className="form-control"
									/>
								</BSForm.Group>
							</Col>
						</Row>
						<Row>
							<Col>
								<BSForm.Group>
									<Button
										type="submit"
										disabled={isSubmitting}
										className="btn btn-primary"
									>
										{isSubmitting && (
											<span className="spinner-border spinner-border-sm mr-1"></span>
										)}
										Save
									</Button>
								</BSForm.Group>
							</Col>
						</Row>
					</Form>
				)
			}}
		</Formik>
	)
}

export { AddEdit }
