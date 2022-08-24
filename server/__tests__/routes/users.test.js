import request from 'supertest'
import createServer from '../../utils/server'
import * as jwtUtil from '../../utils/jwt.utils'
import { jwtSign } from '../../utils/jwt.utils'
import { jwtVerify } from '../../utils/jwt.utils'
import * as userService from '../../services/user.service'
import {
	createUserInput,
	userAuthReturn,
	userInput,
	returnListOfUsers,
} from '../../__globals/globalConfigs'

const app = createServer()

beforeAll(async () => {})

describe('Get /api/user', () => {
	describe('given no token', () => {
		it('should return error', async () => {
			const { body, statusCode } = await request(app).get('/api/user')
			expect(body).toStrictEqual({ message: 'Not authorized, no token' })
			expect(statusCode).toBe(401)
		})
	})
	describe('given correct token', () => {
		it('should return list of users', async () => {
			const id = '5fa447d6578d6b1b5f71d103'
			const token = jwtSign(id)
			const mockListOneUser = jest.spyOn(userService, 'listOneUser')
			mockListOneUser.mockResolvedValueOnce(userAuthReturn)
			const mockListAllUsers = jest.spyOn(userService, 'listAllUsers')
			mockListAllUsers.mockReturnValueOnce(returnListOfUsers)
			const { body, statusCode } = await request(app)
				.get('/api/user')
				.set('Authorization', `Bearer ${token}`)
			expect(statusCode).toBe(200)
			expect(body).toStrictEqual(returnListOfUsers)
		})
	})
})
