import config from 'config'
import { fetchWrapper } from '@/_helpers'

const baseUrl = `${config.apiUrl}/charts`

export const chartService = {
	getBySprintId,
}

function getBySprintId(id) {
	return fetchWrapper.get(`${baseUrl}/${id}`)
}
