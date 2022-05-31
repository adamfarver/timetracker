import React, { useEffect, useState, useContext } from 'react'
import { Link, useHistory, useRouteMatch } from 'react-router-dom'
import { Form as BSForm, Button, Col } from 'react-bootstrap'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { AppContext } from '../_components/AppContext'

import { roleService, userService, alertService } from '@/_services'

function AddEdit() {
  const match = useRouteMatch()
  const history = useHistory()
  const [roleList, setRoleList] = useState({})
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

  useEffect(() => {
    roleService.getAll(token).then((roles) => setRoleList(roles)).catch(e => console.log(e))
  }, [])
  const { id } = match.params
  const isAddMode = !id

  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    role: '',
    password: '',
    confirmPassword: '',
    phone: '',
  }

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    email: Yup.string().email('Email is invalid').required('Email is required'),
    role: Yup.string().required('Role is required'),
    password: Yup.string()
      .concat(isAddMode ? Yup.string().required('Password is required') : null)
      .min(6, 'Password must be at least 6 characters'),
    confirmPassword: Yup.string()
      .when('password', (password, schema) => {
        if (password || isAddMode)
          return schema.required('Confirm Password is required')
      })
      .oneOf([Yup.ref('password')], 'Passwords must match'),
    phone: Yup.string().required('Please enter a phone number.'),
  })

  function onSubmit(fields, { setStatus, setSubmitting }) {
    setStatus()
    if (isAddMode) {
      createUser(fields, setSubmitting)
    } else {
      updateUser(id, fields, setSubmitting)
    }
  }

  function createUser(fields, setSubmitting) {
    userService
      .create(fields, token)
      .then(() => {
        alertService.success('User added', { keepAfterRouteChange: true })
        history.push('.')
      })
      .catch(() => {
        setSubmitting(false)
        alertService.error(error)
      })
  }

  function updateUser(id, fields, setSubmitting) {
    userService
      .update(id, fields, token)
      .then(() => {
        alertService.success('User updated', { keepAfterRouteChange: true })
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
        const [user, setUser] = useState({})
        const [showPassword, setShowPassword] = useState(false)

        useEffect(() => {
          if (!isAddMode) {
            // get user and set form fields
            userService
              .getById(id, token)
              .then((user) => {
                const fields = [
                  'firstName',
                  'lastName',
                  'email',
                  'role',
                  'password',
                  'phone',
                ]
                fields.forEach((field) => {
                  if (user[field]) {
                    setFieldValue(field, user[field], false)
                  }
                })
                setUser(user)
              })
              .catch((e) => history.push('/404'))
          }
        }, [])

        return (
          <Form>
            <h1>{isAddMode ? 'Add User' : 'Edit User'}</h1>
            <BSForm.Row className='align-items-center'>
              <Col md={4} >
                <BSForm.Group>
                  <BSForm.Label htmlFor="firstName">
                    First Name
                  </BSForm.Label>
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
                </BSForm.Group>
              </Col>
              <Col md={4} >
                <BSForm.Group>
                  <BSForm.Label htmlFor="lastName">
                    Last Name
                  </BSForm.Label>
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
                </BSForm.Group>
              </Col>
              <Col md={4} >
                <BSForm.Group>
                  <BSForm.Label htmlFor="phone">
                    Phone
                  </BSForm.Label>
                  <Field
                    name="phone"
                    type="text"
                    className={
                      'form-control' +
                      (errors.phone && touched.phone ? ' is-invalid' : '')
                    }
                  />
                  <ErrorMessage
                    name="phone"
                    component="div"
                    className="invalid-feedback"
                  />
                </BSForm.Group>
              </Col>
            </BSForm.Row>
            <BSForm.Row>
              <Col md={7} >
                <BSForm.Group>
                  <BSForm.Label htmlFor="email">
                    Email
                  </BSForm.Label>
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
                </BSForm.Group>
              </Col>
              <Col md={5} ><BSForm.Group><BSForm.Label htmlFor='role'>Role</BSForm.Label>
                <Field
                  name="role"
                  as="select"
                  className={
                    'form-control' +
                    (errors.role && touched.role ? ' is-invalid' : '')
                  }
                >
                  <option value=""></option>
                  {Object.keys(roleList).map((key) => (
                    <option key={roleList[key]._id} value={roleList[key]._id}>
                      {roleList[key].roleName}
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  name="role"
                  component="div"
                  className="invalid-feedback"
                />
              </BSForm.Group></Col>
            </BSForm.Row>
            {
              !isAddMode && (
                <BSForm.Row>
                  <Col>
                    <h3 className="pt-3">Change Password</h3>
                    <p>Leave blank to keep the same password</p>
                  </Col>
                </BSForm.Row>
              )
            }
            <BSForm.Row>
              <Col md={6}>
                <BSForm.Group>
                  <BSForm.Label htmlFor="password">
                    Password
                  </BSForm.Label>
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
                </BSForm.Group>
              </Col>
              <Col md={6}>
                <BSForm.Group>
                  <BSForm.Label htmlFor='confirmPassword'>
                    Confirm Password
                  </BSForm.Label>
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
                </BSForm.Group>
              </Col>
            </BSForm.Row>


            <BSForm.Row>
              <Col>
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

                <Link to={isAddMode ? '.' : '..'} className="btn btn-link">
                  Cancel
                </Link>
              </Col>
            </BSForm.Row>
          </Form >
        )
      }}
    </Formik >
  )
}

export { AddEdit }
