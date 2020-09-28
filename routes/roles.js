const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Role = require('../models/Role')
// All routes added together

// Role

// Read All Roles
router.get('/', async (req, res, next) => {
	try {
		const allRoles = await Role.find({})
		res.json(allRoles).status(200)
		res.end()
	} catch (error) {
		res.status(500).send({ msg: 'Server issues' }).end()
	}
})

// Read Single Role
router.get('/:id', async (req, res, next) => {
	try {
		const record = await Role.findById(req.params.id)
		res.json(record).status(200)
		res.end()
	} catch (error) {
		res.status(404).send({ msg: 'Resource not found.' }).end()
	}
})

// Create Role
router.post('/', async (req, res, next) => {
	const { body } = req
	const project = new Role(body)
	if (mongoose.connection.readyState) {
		await project.save().then(() => {
			res.redirect('/dataadded')
			res.end()
		})
	} else {
		res.status(500).send({ msg: 'Not connected to DB. Cannot Save data' }).end()
	}
})

//Update Role
router.put('/:id', async (req, res, next) => {
	const objId = req.params.id
	const { body } = req
	try {
		await Role.findOneAndUpdate({ _id: objId }, body)

		const record = await Role.findById({ _id: objId })
		res.json(record).status(200)
		res.end()
	} catch (error) {
		res.status(404).send({ msg: 'Resource not found.' }).end()
	}
})

//Delete Role
router.delete('/:id', async (req, res, next) => {
	const objId = req.params.id
	const { body } = req
	try {
		const record = await Role.findOneAndDelete({ _id: objId })
		res.status(200)
		res.end()
	} catch (error) {
		res.status(404).send({ msg: 'Object not found.' }).end()
	}
})

module.exports = router
