const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = require('../../models/User')
const { ObjectId } = mongoose.Types
// All routes added together

// User

// Read All Users
router.get('/', async (req, res, next) => {
	try {
		let allUsers
		if (req.query.r == 0) {
			allUsers = await User.aggregate([
				{
					$lookup: {
						from: 'roles',
						foreignField: '_id',
						localField: 'role',
						as: 'role',
					},
				},
				{ $unwind: '$role' },
				{
					$project: {
						_id: 1,
						firstName: 1,
						lastName: 1,
						email: 1,
						role: { _id: 1, roleName: 1 },
					},
				},
			])
		} else {
			allUsers = await User.find({})
		}

		res.json(allUsers).status(200)
		res.end()
	} catch (error) {
		res.status(500).send({ msg: 'Server issues' }).end()
	}
})

// Read Single User
router.get('/:id', async (req, res, next) => {
	try {
		const record = await User.findById(req.params.id)
		res.json(record).status(200)
		res.end()
	} catch (error) {
		res.status(404).send({ msg: 'Resource not found.' }).end()
	}
})

// Create User
router.post('/', async (req, res, next) => {
	const { body } = req
	const project = new User(body)
	if (mongoose.connection.readyState) {
		await project.save().then(() => {
			res.set({ ok: 'true' }).status(200)
			res.end()
		})
	} else {
		res.status(500).send({ msg: 'Not connected to DB. Cannot Save data' }).end()
	}
})

//Update User
router.put('/:id', async (req, res, next) => {
	const objId = req.params.id
	const { body } = req
	if (body.password === '') {
		delete body.password
	}
	try {
		await User.findOneAndUpdate({ _id: objId }, body)

		const record = await User.findById({ _id: objId })
		res.json(record).status(200)
		res.end()
	} catch (error) {
		res.status(404).send({ msg: 'Resource not found.' }).end()
	}
})

//Delete User
router.delete('/:id', async (req, res, next) => {
	const objId = req.params.id
	const { body } = req
	try {
		const record = await User.findOneAndDelete({ _id: objId })
		res.set({ ok: 'true' }).status(200)
		res.end()
	} catch (error) {
		res.status(404).send({ msg: 'Object not found.' }).end()
	}
})

module.exports = router
