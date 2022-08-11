const mongoose = require('mongoose')
const Task = require('../models/Task')
const Time = require('../models/Time')
const { ObjectId } = mongoose.Types
const asyncHandler = require('express-async-handler')
const {} = require('../services/task.service')
const { stripNulls } = require('../_helpers/stripNulls')

const getAllTasks = asyncHandler(async (req, res, next) => {
	try {
		const allTasks = await Task.find({})
		res.json(allTasks).status(200)
		res.end()
	} catch (e) {
		res.status(500)
		throw new Error('Server issues')
	}
})
const getSingleTask = asyncHandler(async (req, res, next) => {
	try {
		// const record = await Task.findById(req.params.id)
		const record = await Task.findOne({ _id: req.params.id })
		console.log(record)
		res.json(record).status(200)
		res.end()
	} catch (e) {
		res.status(404)
		throw new Error('Resource not found.')
	}
})

const getSingleTaskTimes = asyncHandler(async (req, res, next) => {
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
	} catch (e) {
		res.status(500)
		throw new Error('Server Error')
	}
})
const getAllProjectTasks = asyncHandler(async (req, res, next) => {
	try {
		const records = await Task.find({ project: ObjectId(`${req.params.id}`) })

		res.json(records).status(200)
		res.end()
	} catch (e) {
		res.status(500)
		throw new Error('Resource not found.')
	}
})
const createTask = asyncHandler(async (req, res, next) => {
	let { body } = req
	body = stripNulls(body)
	const project = new Task(body)
	try {
		await project.save().then(() => {
			res.set({ ok: 'true' }).status(200)
			res.end()
		})
	} catch (e) {
		res.status(500)
		throw new Error('Not connected to DB. Cannot Save data.')
	}
})
const updateTask = asyncHandler(async (req, res, next) => {
	const objId = req.params.id
	const { body } = req
	try {
		const record = await Task.updateOne({ _id: ObjectId(`${objId}`) }, body, {})

		res.json(record).status(200)
		res.end()
	} catch (e) {
		res.status(404)
		throw new error('could not update')
	}
})
const deleteTask = asyncHandler(async (req, res, next) => {
	const objId = req.params.id
	const { body } = req
	try {
		const record = await Task.findOneAndDelete({ _id: objId })
		res.set({ ok: 'true' }).status(200)
		res.end()
	} catch (e) {
		res.status(404)
		throw new error('Object not found')
	}
})
const getAllClaimedProjectTasks = asyncHandler(async (req, res, next) => {
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
	} catch (e) {
		res.status(404)
		throw new error('Object not found')
	}
})

module.exports = {
	getAllTasks,
	getSingleTask,
	createTask,
	updateTask,
	deleteTask,
	getSingleTaskTimes,
	getAllProjectTasks,
	getAllClaimedProjectTasks,
}
