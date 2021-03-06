import config from 'config'
import { fetchWrapper } from '@/_helpers'

const baseUrl = `${config.apiUrl}/user`

export const userService = {
	getAll,
	getById,
	getWithRole,
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
function getWithRole() {
	return fetchWrapper.get(`${baseUrl}/?r=0`)
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
