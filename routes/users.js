const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = require('../models/User')
// All routes added together

// User

// Read All Users
router.get('/', async (req, res, next) => {
	try {
		const allUsers = await User.find({})
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
	console.log(req.baseUrl)
	const project = new User(body)
	if (mongoose.connection.readyState) {
		await project.save().then(() => {
			// TODO: Add Redirect
			// Will Error Because doesn't exist
			res.redirect('/dataadded')
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
		res.status(200)
		res.end()
	} catch (error) {
		res.status(404).send({ msg: 'Object not found.' }).end()
	}
})

module.exports = router
