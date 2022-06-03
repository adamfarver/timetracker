import React, { useEffect, useState, useContext } from 'react'
import { Link, useHistory, useRouteMatch } from 'react-router-dom'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import { AppContext } from '../_components/AppContext'
import * as Yup from 'yup'

import { roleService, alertService } from '@/_services'

function AddEdit() {
  const match = useRouteMatch()
  const history = useHistory()
  const { id } = match.params
  const isAddMode = !id
  const [project, setProject, sprint, setSprint, user, setUser] =
    useContext(AppContext)
  const { token } = user

  const initialValues = {
    roleName: '',
    active: false,
    projectCreate: false,
    projectRead: false,
    projectUpdate: false,
    projectRemoveData: false,
    sprintCreate: false,
    sprintRead: false,
    sprintUpdate: false,
    sprintRemoveData: false,
    taskCreate: false,
    taskRead: false,
    taskUpdate: false,
    taskRemoveData: false,
    timeCreate: false,
    timeRead: false,
    timeUpdate: false,
    timeRemoveData: false,
    userCreate: false,
    userRead: false,
    userUpdate: false,
    userRemoveData: false,
    roleCreate: false,
    roleRead: false,
    roleUpdate: false,
    roleRemoveData: false,
  }

  const validationSchema = Yup.object().shape({
    roleName: Yup.string().required('A role name is required.'),
  })

  function onSubmit(fields, { setStatus, setSubmitting }) {
    setStatus()
    if (isAddMode) {
      createRole(fields, setSubmitting)
    } else {
      updateRole(id, fields, setSubmitting)
    }
  }

  function createRole(fields, setSubmitting) {
    roleService
      .create(fields)
      .then(() => {
        alertService.success('Role added', { keepAfterRouteChange: true })
        history.push('.')
      })
      .catch((error) => {
        setSubmitting(false)
        alertService.error(error)
      })
  }

  function updateRole(id, fields, setSubmitting) {
    roleService
      .update(id, fields)
      .then(() => {
        alertService.success('Role updated', { keepAfterRouteChange: true })
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
        const [role, setRole] = useState({})

        useEffect(() => {
          if (!isAddMode) {
            // get user and set form fields
            roleService
              .getById(id)
              .then((role) => {
                const fields = [
                  'roleName',
                  'active',
                  'projectCreate',
                  'projectRead',
                  'projectUpdate',
                  'projectRemoveData',
                  'sprintCreate',
                  'sprintRead',
                  'sprintUpdate',
                  'sprintRemoveData',
                  'taskCreate',
                  'taskRead',
                  'taskUpdate',
                  'taskRemoveData',
                  'timeCreate',
                  'timeRead',
                  'timeUpdate',
                  'timeRemoveData',
                  'userCreate',
                  'userRead',
                  'userUpdate',
                  'userRemoveData',
                  'roleCreate',
                  'roleRead',
                  'roleUpdate',
                  'roleRemoveData',
                ]
                fields.forEach((field) =>
                  setFieldValue(field, role[field], false)
                )
                setRole(role)
              })
              .catch((e) => history.push('/404'))
          }
        }, [])

        return (
          <Form>
            <h1>{isAddMode ? 'Add Role' : 'Edit Role'}</h1>
            <div className="form-row align-items-center mb-3">
              <div className="col-md-8">
                <div className="form-group mb-0">
                  <Field
                    name="roleName"
                    id="roleName"
                    type="text"
                    className={
                      'form-control' +
                      (errors.roleName && touched.roleName ? ' is-invalid' : '')
                    }
                    placeholder="Role Name"
                  />
                </div>
              </div>
              <div className="col-md-2 ">
                <div className="form-check">
                  <Field
                    className="form-check-input"
                    type="checkbox"
                    id="active"
                    name="active"
                  />
                  <label className="form-check-label" htmlFor="active">
                    Active
                  </label>
                </div>
              </div>
            </div>
            <div className="form form-row mb-3 ">
              <div className="col-md">
                <h4 className="text-muted">Projects</h4>
                <div className="form-check">
                  <Field
                    className="form-check-input"
                    type="checkbox"
                    id="projectCreate"
                    name="projectCreate"
                  />
                  <label className="form-check-label" htmlFor="projectCreate">
                    Create
                  </label>
                </div>
                <div className="form-check">
                  <Field
                    className="form-check-input"
                    type="checkbox"
                    id="projectRead"
                    name="projectRead"
                  />
                  <label className="form-check-label" htmlFor="projectRead">
                    Read
                  </label>
                </div>
                <div className="form-check">
                  <Field
                    className="form-check-input"
                    type="checkbox"
                    id="projectUpdate"
                    name="projectUpdate"
                  />
                  <label className="form-check-label" htmlFor="projectUpdate">
                    Update
                  </label>
                </div>
                <div className="form-check">
                  <Field
                    className="form-check-input"
                    type="checkbox"
                    id="projectRemoveData"
                    name="projectRemoveData"
                  />
                  <label
                    className="form-check-label"
                    htmlFor="projectRemoveData"
                  >
                    Delete
                  </label>
                </div>
              </div>
              <div className="col-md">
                <h4 className="text-muted">Sprints</h4>
                <div className="form-check">
                  <Field
                    className="form-check-input"
                    type="checkbox"
                    id="sprintCreate"
                    name="sprintCreate"
                  />
                  <label className="form-check-label" htmlFor="sprintCreate">
                    Create
                  </label>
                </div>
                <div className="form-check">
                  <Field
                    className="form-check-input"
                    type="checkbox"
                    id="sprintRead"
                    name="sprintRead"
                  />
                  <label className="form-check-label" htmlFor="sprintRead">
                    Read
                  </label>
                </div>
                <div className="form-check">
                  <Field
                    className="form-check-input"
                    type="checkbox"
                    id="sprintUpdate"
                    name="sprintUpdate"
                  />
                  <label className="form-check-label" htmlFor="sprintUpdate">
                    Update
                  </label>
                </div>
                <div className="form-check">
                  <Field
                    className="form-check-input"
                    type="checkbox"
                    id="sprintRemoveData"
                    name="sprintRemoveData"
                  />
                  <label
                    className="form-check-label"
                    htmlFor="sprintRemoveData"
                  >
                    Delete
                  </label>
                </div>
              </div>
              <div className="col-md">
                <h4 className="text-muted">Tasks</h4>
                <div className="form-check">
                  <Field
                    className="form-check-input"
                    type="checkbox"
                    id="taskCreate"
                    name="taskCreate"
                  />
                  <label className="form-check-label" htmlFor="taskCreate">
                    Create
                  </label>
                </div>
                <div className="form-check">
                  <Field
                    className="form-check-input"
                    type="checkbox"
                    id="taskRead"
                    name="taskRead"
                  />
                  <label className="form-check-label" htmlFor="taskRead">
                    Read
                  </label>
                </div>
                <div className="form-check">
                  <Field
                    className="form-check-input"
                    type="checkbox"
                    id="taskUpdate"
                    name="taskUpdate"
                  />
                  <label className="form-check-label" htmlFor="taskUpdate">
                    Update
                  </label>
                </div>
                <div className="form-check">
                  <Field
                    className="form-check-input"
                    type="checkbox"
                    id="taskRemoveData"
                    name="taskRemoveData"
                  />
                  <label className="form-check-label" htmlFor="taskRemoveData">
                    Delete
                  </label>
                </div>
              </div>
              <div className="col-md">
                <h4 className="text-muted">Times</h4>
                <div className="form-check">
                  <Field
                    className="form-check-input"
                    type="checkbox"
                    id="timeCreate"
                    name="timeCreate"
                  />
                  <label className="form-check-label" htmlFor="timeCreate">
                    Create
                  </label>
                </div>
                <div className="form-check">
                  <Field
                    className="form-check-input"
                    type="checkbox"
                    id="timeRead"
                    name="timeRead"
                  />
                  <label className="form-check-label" htmlFor="timeRead">
                    Read
                  </label>
                </div>
                <div className="form-check">
                  <Field
                    className="form-check-input"
                    type="checkbox"
                    id="timeUpdate"
                    name="timeUpdate"
                  />
                  <label className="form-check-label" htmlFor="timeUpdate">
                    Update
                  </label>
                </div>
                <div className="form-check">
                  <Field
                    className="form-check-input"
                    type="checkbox"
                    id="timeRemoveData"
                    name="timeRemoveData"
                  />
                  <label className="form-check-label" htmlFor="timeRemoveData">
                    Delete
                  </label>
                </div>
              </div>
              <div className="col-md">
                <h4 className="text-muted">Users</h4>
                <div className="form-check">
                  <Field
                    className="form-check-input"
                    type="checkbox"
                    id="userCreate"
                    name="userCreate"
                  />
                  <label className="form-check-label" htmlFor="userCreate">
                    Create
                  </label>
                </div>
                <div className="form-check">
                  <Field
                    className="form-check-input"
                    type="checkbox"
                    id="userRead"
                    name="userRead"
                  />
                  <label className="form-check-label" htmlFor="userRead">
                    Read
                  </label>
                </div>
                <div className="form-check">
                  <Field
                    className="form-check-input"
                    type="checkbox"
                    id="userUpdate"
                    name="userUpdate"
                  />
                  <label className="form-check-label" htmlFor="userUpdate">
                    Update
                  </label>
                </div>
                <div className="form-check">
                  <Field
                    className="form-check-input"
                    type="checkbox"
                    id="userRemoveData"
                    name="userRemoveData"
                  />
                  <label className="form-check-label" htmlFor="userRemoveData">
                    Delete
                  </label>
                </div>
              </div>
              <div className="col-md">
                <h4 className="text-muted">Roles</h4>
                <div className="form-check">
                  <Field
                    className="form-check-input"
                    type="checkbox"
                    id="roleCreate"
                    name="roleCreate"
                  />
                  <label className="form-check-label" htmlFor="roleCreate">
                    Create
                  </label>
                </div>
                <div className="form-check">
                  <Field
                    className="form-check-input"
                    type="checkbox"
                    id="roleRead"
                    name="roleRead"
                  />
                  <label className="form-check-label" htmlFor="roleRead">
                    Read
                  </label>
                </div>
                <div className="form-check">
                  <Field
                    className="form-check-input"
                    type="checkbox"
                    id="roleUpdate"
                    name="roleUpdate"
                  />
                  <label className="form-check-label" htmlFor="roleUpdate">
                    Update
                  </label>
                </div>
                <div className="form-check">
                  <Field
                    className="form-check-input"
                    type="checkbox"
                    id="roleRemoveData"
                    name="roleRemoveData"
                  />
                  <label className="form-check-label" htmlFor="roleRemoveData">
                    Delete
                  </label>
                </div>
              </div>
            </div>
            <div className="row form-row">
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
            </div>
          </Form>
        )
      }}
    </Formik>
  )
}

export { AddEdit }
