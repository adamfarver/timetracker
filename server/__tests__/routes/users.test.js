import request from 'supertest'
import createServer from '../../utils/server'
import { jwtSign } from '../../utils/jwt.utils'

const app = createServer()

beforeAll(async () => {})

describe('GET /api/user/', () => {
	describe('given no authorization', () => {
		it('returns 404', async () => {
			await request(app)
				.get('/api/user/')
				.expect('Content-Type', /json/)
				.expect(401)
		})
	})
	describe('given no header', () => {
		it('returns 404', async () => {
			await request(app)
				.get('/api/user/')
				.expect('Content-Type', /json/)
				.expect(401)
		})
	})
	describe('given authorized user', () => {
		it('returns list of users', async () => {
			const user = '5fa447d6578d6b1b5f71d103'
			const token = jwtSign(user)
			const response = await request(app)
				.get('/api/user/')
				.set('Authorization', `Bearer ${token}`)
				.send()
				.expect('Content-Type', /json/)
				.expect(200)
			console.log(response)
		})
	})
})
