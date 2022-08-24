import mongoose from 'mongoose'
import { jwtSign } from '../utils/jwt.utils'

const userId = new mongoose.Types.ObjectId().toString()

export const userInput = {
	email: 'adamfarver@gmail.com',
	password: '12341234',
}

export const createUserInput = {
	email: 'd@gmail.com',
	password: '12341234',
	firstName: 'D',
	lastName: 'Smith',
	phone: '2',
}

export const userAuthReturn = {
	_id: '5fa447d6578d6b1b5f71d103',
	firstName: 'Adam',
	LastName: 'Farver',
	email: 'adamfarver@gmail.com',
	role: { _id: userId, roleName: 'manager' },
	token: 'My Token',
}
export const returnListOfUsers = [
	{
		_id: '5fa447d6578d6b1b5f71d103',
		firstName: 'Adam',
		lastName: 'Farver',
		email: 'adamfarver@gmail.com',
		phone: '843-694-7696',
	},
	{
		_id: '5fa4635ee41a86339a606672',
		firstName: 'Martha',
		lastName: 'Farver',
		email: 'marthafarver+fake@gmail.com',
		phone: '843-694-7696',
	},
	{
		_id: '5fa463b2e41a86339a606673',
		firstName: 'Pippin',
		lastName: 'Farver',
		email: 'pippinfarver+fake@gmail.com',
		phone: '843-694-7696',
	},
]
