const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Task = require('../../models/Task')
// All routes added together

// Task

// Read All Tasks
router.get('/', async (req, res, next) => {
	try {
		const allTasks = await Task.find({})
		res.json(allTasks).status(200)
		res.end()
	} catch (error) {
		res.status(500).send({ msg: 'Server issues' }).end()
	}
})

// Read Single Task
router.get('/:id', async (req, res, next) => {
	try {
		const record = await Task.findById(req.params.id)
		res.json(record).status(200)
		res.end()
	} catch (error) {
		res.status(404).send({ msg: 'Resource not found.' }).end()
	}
})

// Create Task
router.post('/', async (req, res, next) => {
	const { body } = req
	const project = new Task(body)
	if (mongoose.connection.readyState) {
		await project.save().then(() => {
			res.set({ ok: 'true' }).status(200)
			res.end()
		})
	} else {
		res.status(500).send({ msg: 'Not connected to DB. Cannot Save data' }).end()
	}
})

//Update Task
router.put('/:id', async (req, res, next) => {
	const objId = req.params.id
	const { body } = req
	try {
		await Task.findOneAndUpdate({ _id: objId }, body)

		const record = await Task.findById({ _id: objId })
		res.json(record).status(200)
		res.end()
	} catch (error) {
		res.status(404).send({ msg: 'Resource not found.' }).end()
	}
})

//Delete Task
router.delete('/:id', async (req, res, next) => {
	const objId = req.params.id
	const { body } = req
	try {
		const record = await Task.findOneAndDelete({ _id: objId })
		res.set({ ok: 'true' }).status(200)
		res.end()
	} catch (error) {
		res.status(404).send({ msg: 'Object not found.' }).end()
	}
})

module.exports = router
