const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Task = require('../../models/Task')
const Time = require('../../models/Time')
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
					localField: 'claimedBy',
					foreignField: '_id',
					as: 'claimedBy',
				},
			},
			{
				$unwind: { path: '$claimedBy', preserveNullAndEmptyArrays: true },
			},
		])
		const parsedResponse = record[0]
		res.json(parsedResponse).status(200)
		res.end()
	} catch (error) {
		res.status(404).send({ msg: 'Resource not found.' }).end()
	}
})
// Read Single Task Times
router.get('/:id/times', async (req, res, next) => {
	try {
		const records = await Time.aggregate([
			{
				$match: { taskId: ObjectId(`${req.params.id}`) },
			},

			{
				$lookup: {
					from: 'users',
					localField: 'userId',
					foreignField: '_id',
					as: 'userId',
				},
			},
			{
				$unwind: { path: '$userId', preserveNullAndEmptyArrays: true },
			},
		])

		res.json(records).status(200)
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

// Get claimed tasks
router.get('/allclaimedprojecttasks/:id', async (req, res, next) => {
	try {
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
	console.log('put route')
	const objId = req.params.id
	const { body } = req
	try {
		const record = await Task.updateOne({ _id: ObjectId(`${objId}`) }, body, {
			new: true,
			omitUndefined: true,
		})
		const expandedRecord = await Task.aggregate([
			{
				$match: { _id: ObjectId(`${req.params.id}`) },
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

		console.log(expandedRecord)
		res.json(expandedRecord).status(200)
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
