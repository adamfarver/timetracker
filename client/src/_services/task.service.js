import config from 'config'
import { fetchWrapper } from '@/_helpers'

const baseUrl = `${config.apiUrl}/task`

export const taskService = {
  getAll,
  getById,
  getByProjectId,
  getClaimedProjectId,
  getTimeById,
  create,
  update,
  delete: _delete,
}

function getAll(token) {
  return fetchWrapper.get(baseUrl, token)
}

function getById(id, token) {
  return fetchWrapper.get(`${baseUrl}/${id}`, token)
}
function getTimeById(id, token) {
  return fetchWrapper.get(`${baseUrl}/${id}/times`, token)
}

function getByProjectId(id, token) {
  return fetchWrapper.get(`${baseUrl}/allprojecttasks/${id}`, token)
}
function getClaimedProjectId(id, token) {
  return fetchWrapper.get(`${baseUrl}/allclaimedprojecttasks/${id}`, token)
}

function create(params, token) {
  return fetchWrapper.post(baseUrl, params, token)
}

function update(id, params, token) {
  return fetchWrapper.put(`${baseUrl}/${id}`, params, token)
}

// prefixed with underscored because delete is a reserved word in javascript
function _delete(id, token) {
  return fetchWrapper.delete(`${baseUrl}/${id}`, token)
}
