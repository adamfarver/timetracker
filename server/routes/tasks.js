const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Task = require('../../models/Task')
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
		// const record = await Task.findById(req.params.id)
		const record = await Task.aggregate([
			{
				$match: { _id: ObjectId(`${req.params.id}`) },
			},
			{
				$lookup: {
					from: 'users',
					localField: 'projectManager',
					foreignField: '_id',
					as: 'projectManager',
				},
			},
		])
		const parsedResponse = record[0]
		res.json(parsedResponse).status(200)
		res.end()
	} catch (error) {
		res.status(404).send({ msg: 'Resource not found.' }).end()
	}
})
// Get project tasks
router.get('/allprojecttasks/:id', async (req, res, next) => {
	console.log(`Getting all tasks for ${req.params.id}`)
	try {
		// const records = await Task.find({ project: ObjectId(`${req.params.id}`) })
		const records = await Task.aggregate([
			{
				$match: { project: ObjectId(`${req.params.id}`) },
			},
			{
				$lookup: {
					from: 'users',
					localField: 'claimedBy',
					foreignField: '_id',
					as: 'claimedBy',
				},
			},
			{
				$unwind: { path: '$claimedBy', preserveNullAndEmptyArrays: true },
			},
		])
		res.json(records).status(200)
		res.end()
	} catch (error) {
		console.log(error)
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
	console.log('This is the request body: \n', body, '\n')
	try {
		const record = await Task.findOneAndUpdate(
			{ _id: ObjectId(`${objId}`) },
			body,
			{
				new: true,
			}
		)
		console.log('This is the returned record:\n', record, '\n')
		res.json(record).status(200)
		res.end()
	} catch (error) {
		res.status(404).send({ msg: error }).end()
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
