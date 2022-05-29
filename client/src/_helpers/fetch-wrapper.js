export const fetchWrapper = {
	get,
	post,
	put,
	delete: _delete,
}

function get(url, token) {
	const requestOptions = {
		method: 'GET',
		headers: {
			authorization: `Bearer ${token}`,
		},
	}
	return fetch(url, requestOptions).then(handleResponse)
}

function post(url, body, token) {
	const requestOptions = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			authorization: `Bearer ${token}`,
		},

		body: JSON.stringify(body),
	}
	return fetch(url, requestOptions).then(handleResponse)
}

function put(url, body, token) {
	const requestOptions = {
		method: 'PUT',
		headers: {
			authorization: `Bearer ${token}`,
			'Content-Type': 'application/json',
		},

		authorization: `Bearer ${token}`,
		body: JSON.stringify(body),
	}
	return fetch(url, requestOptions).then(handleResponse)
}

// prefixed with underscored because delete is a reserved word in javascript
function _delete(url, token) {
	const requestOptions = {
		method: 'DELETE',
		headers: {
			authorization: `Bearer ${token}`,
			'Content-Type': 'application/json',
		},
	}
	return fetch(url, requestOptions).then(handleResponse)
}

// helper functions

function handleResponse(response) {
	return response.text().then((text) => {
		const data = text && JSON.parse(text)
		if (!response.ok) {
			const error = (data && data.message) || response.statusText
			return Promise.reject(error)
		}

		return data
	})
}
