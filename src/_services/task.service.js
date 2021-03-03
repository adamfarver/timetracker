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

function getAll() {
	return fetchWrapper.get(baseUrl)
}

function getById(id) {
	return fetchWrapper.get(`${baseUrl}/${id}`)
}
function getTimeById(id) {
	return fetchWrapper.get(`${baseUrl}/${id}/times`)
}

function getByProjectId(id) {
	return fetchWrapper.get(`${baseUrl}/allprojecttasks/${id}`)
}
function getClaimedProjectId(id) {
	return fetchWrapper.get(`${baseUrl}/allclaimedprojecttasks/${id}`)
}

function create(params) {
	return fetchWrapper.post(baseUrl, params)
}

function update(id, params) {
	return fetchWrapper.put(`${baseUrl}/${id}`, params)
}

// prefixed with underscored because delete is a reserved word in javascript
function _delete(id) {
	return fetchWrapper.delete(`${baseUrl}/${id}`)
}
