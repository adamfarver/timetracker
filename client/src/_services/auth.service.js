import config from 'config'
const { fetchWrapper } = require('../_helpers/')
const baseUrl = `${config.apiUrl}/auth`

let loginUser = (params) => {
  console.log(params)

  return fetchWrapper.post(`${baseUrl}/login`, params)
}

export const authService = {
  loginUser,
}
