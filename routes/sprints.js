const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Sprint = require('../models/Sprint')
// All routes added together

// Sprint

// Read All Sprints
router.get('/', async (req, res, next) => {
	try {
		const allSprints = await Sprint.find({})
		res.json(allSprints).status(200)
		res.end()
	} catch (error) {
		res.status(500).send({ msg: 'Server issues' }).end()
	}
})

// Read Single Sprint
router.get('/:id', async (req, res, next) => {
	try {
		const record = await Sprint.findById(req.params.id)
		res.json(record).status(200)
		res.end()
	} catch (error) {
		res.status(404).send({ msg: 'Resource not found.' }).end()
	}
})

// Create Sprint
router.post('/', async (req, res, next) => {
	const { body } = req
	const project = new Sprint(body)
	if (mongoose.connection.readyState) {
		await project.save().then(() => {
			res.redirect('/dataadded')
			res.end()
		})
	} else {
		res.status(500).send({ msg: 'Not connected to DB. Cannot Save data' }).end()
	}
})

//Update Sprint
router.put('/:id', async (req, res, next) => {
	const objId = req.params.id
	const { body } = req
	try {
		await Sprint.findOneAndUpdate({ _id: objId }, body)

		const record = await Sprint.findById({ _id: objId })
		res.json(record).status(200)
		res.end()
	} catch (error) {
		res.status(404).send({ msg: 'Resource not found.' }).end()
	}
})

//Delete Sprint
router.delete('/:id', async (req, res, next) => {
	const objId = req.params.id
	const { body } = req
	try {
		const record = await Sprint.findOneAndDelete({ _id: objId })
		res.status(200)
		res.end()
	} catch (error) {
		res.status(404).send({ msg: 'Object not found.' }).end()
	}
})

module.exports = router
