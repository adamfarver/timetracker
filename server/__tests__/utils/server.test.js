import request from 'supertest'
import createServer from '../../server'

describe('Serves built client', () => {
	const app = createServer()
	it('Sends HTML as root document', async () => {
		await request(app).get('/').expect('Content-Type', /html/).expect(200)
	})

	it("Sends homepage if route doesn't exist", async () => {
		await request(app).get('/random').expect('Content-Type', /html/).expect(200)
	})
})
