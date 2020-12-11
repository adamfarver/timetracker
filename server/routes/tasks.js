const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Task = require('../../models/Task')
const { makeSparseArrays, makeDayArrays } = require('../_helpers/makeArrays')
const { ObjectId } = mongoose.Types
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
// Get project tasks
router.get('/allprojecttasks/:id', async (req, res, next) => {
	try {
		const records = await Task.find({ project: ObjectId(`${req.params.id}`) })
		res.json(records).status(200)
		res.end()
	} catch (error) {
		console.log(error)
	}
})

// Get tasks by sprint

router.get('/expectedtime/:id', async (req, res, next) => {
	try {
		let projectedTime = await Task.aggregate([
			{ $match: { sprint: ObjectId(`${req.params.id}`) } },
			{ $group: { _id: 0, projectedTime: { $sum: '$projectedTime' } } },
		])
		projectedTime = makeSparseArrays(projectedTime[0].projectedTime, 5)

		const dateStart = new Date('2020-12-07T00:00:00.000Z')
		const dateEnd = new Date('2020-12-11T00:00:00.000Z')
		makeDayArrays(dateStart, dateEnd)
		let records = {}
		records.datasets = [
			{
				label: 'Projected Pace',
				borderColor: '#333333',
				data: projectedTime,
				fill: 'origin',
			},
		]
		res.json(records).status(200)
		res.end()
	} catch (error) {
		console.log(error)
	}
})

// Create Task
router.post('/', async (req, res, next) => {
	const { body } = req
	console.log('body', body)
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
	console.log(req.body)
	try {
		const record = await Task.findOneAndUpdate({ _id: objId }, body)
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
