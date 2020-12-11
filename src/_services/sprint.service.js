import config from 'config'
import { fetchWrapper } from '@/_helpers'

const baseUrl = `${config.apiUrl}/sprint`

export const sprintService = {
	getAll,
	getById,
	create,
	update,
	delete: _delete,
	filterByProjectId,
	getSprintNumber,
}

function getAll() {
	console.log(baseUrl)
	return fetchWrapper.get(baseUrl)
}

function getById(id) {
	return fetchWrapper.get(`${baseUrl}/${id}`)
}
function filterByProjectId(id) {
	return fetchWrapper.get(`${baseUrl}/list/${id}`)
}

function getSprintNumber(id) {
	return fetchWrapper.get(`${baseUrl}/number/${id}`)
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
