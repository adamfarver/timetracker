import config from 'config'
import { fetchWrapper } from '@/_helpers'

const baseUrl = `${config.apiUrl}/auth`

let loginUser = (params) => {
	console.log(params)
	return fetchWrapper.post(baseUrl, params)
}

export const authService = {
	loginUser,
}
