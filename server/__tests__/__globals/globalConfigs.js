import mongoose from 'mongoose'
import { jwtSign } from '../../utils/jwt.utils'

const userId = new mongoose.Types.ObjectId().toString()

const userInput = {
	email: 'adamfarver@gmail.com',
	password: '12341234',
}

const createUserInput = {
	email: 'd@gmail.com',
	password: '12341234',
	firstName: 'D',
	lastName: 'Smith',
	phone: '2',
}

const userAuthReturn = {
	_id: userId,
	firstName: 'Adam',
	LastName: 'Farver',
	email: 'adamfarver@gmail.com',
	role: { _id: userId, roleName: 'manager' },
	token: 'My Token',
}
module.exports = { createUserInput, userInput, userAuthReturn }
