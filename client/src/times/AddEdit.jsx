import React, { useEffect, useState, useContext } from 'react'
import { Link, useHistory, useRouteMatch } from 'react-router-dom'
import { Form as BSForm, Row, Col, Button } from 'react-bootstrap'

import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'

import { timeService, alertService } from '@/_services'
import { AppContext } from '../_components/AppContext'
import { DateTime } from 'luxon'

function AddEdit({ times, setTimes }) {
  const match = useRouteMatch()
  const history = useHistory()
  const { id } = match.params
  const [
    project,
    setProject,
    sprint,
    setSprint,
    user,
    setUser,
    task,
    setTask,
  ] = useContext(AppContext)
  const { token } = user
  const initialValues = { timeUsed: 0 }

  const validationSchema = Yup.object().shape({})

  function onSubmit(fields, { setStatus, setSubmitting, resetForm }) {
    addTime(id, fields, setSubmitting)

    setStatus()
    setSubmitting(false)
    resetForm()
  }

  function addTime(id, fields, setSubmitting) {
    fields.userId = user._id
    fields.sprint = sprint._id
    fields.taskId = task._id
    fields.createdAt = DateTime.now().toISO()
    console.log(fields.createdAt)
    timeService
      .create(fields, token)
      .then((response) => {
        alertService.success('Time Added', { keepAfterRouteChange: true })
        const { firstName, lastName } = user
        response.userId = { firstName, lastName }

        // console.log(response)
        setTimes(times.concat(response))
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
        return (
          <Form>
            <Row>
              <Col>
                <BSForm.Group>
                  <BSForm.Label htmlFor="timeUsed">Add Time</BSForm.Label>
                  <Field
                    name="timeUsed"
                    id="timeUsed"
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
                <BSForm.Group className="mb-0">
                  <Button
                    type="submit"
                    disabled={isSubmitting || values.timeUsed == 0}
                    className="btn btn-primary"
                  >
                    {isSubmitting && (
                      <span className="spinner-border spinner-border-sm mr-1"></span>
                    )}
                    Add
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
