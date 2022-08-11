const Time = require('../models/Time')
const Task = require('../models/Task')
const asyncHandler = require('express-async-handler')
const {} = require('../services/time.service')

const getAllTimes = asyncHandler(async (req, res, next) => {
	try {
		const allTimes = await Time.find({})
		res.json(allTimes).status(200)
		res.end()
	} catch (e) {
		res.status(500)
		throw new Error('Server issues')
	}
})
const getSingleTime = asyncHandler(async (req, res, next) => {
	try {
		const record = await Time.findById(req.params.id)
		res.json(record).status(200)
		res.end()
	} catch (error) {
		res.status(404)
		throw new Error('Resource not found.')
	}
})
const createTime = asyncHandler(async (req, res, next) => {
	const { body } = req
	const time = new Time(body)
	try {
		const record = await time.save()
		// When adding times, get current value of actualUsedTime and add current value of body.timeUsed

		const lastValue = await Task.findById({ _id: body.taskId })
		const newUsedTimeValue = body.timeUsed + lastValue.actualUsedTime
		await Task.findOneAndUpdate(
			{ _id: body.taskId },
			{ actualUsedTime: newUsedTimeValue }
		)

		res.json(record).status(200)
		res.end()
	} catch (error) {
		res.status(404)
		throw new Error("Couldn't create record")
	}
})
const updateTime = asyncHandler(async (req, res, next) => {
	const objId = req.params.id
	const { body } = req
	try {
		await Time.findOneAndUpdate({ _id: objId }, body, { upsert: true })
		const record = await Time.findById({ _id: objId })
		res.json(record).status(200)
		res.end()
	} catch (error) {
		res.status(404)
		throw new Error('Resource not found.')
	}
})
const deleteTime = asyncHandler(async (req, res, next) => {
	const objId = req.params.id
	const { body } = req
	try {
		const record = await Time.findOneAndDelete({ _id: objId })
		res.set({ ok: 'true' }).status(200)
		res.end()
	} catch (error) {
		res.status(404)
		throw new Error('Object not found.')
	}
})

module.exports = {
	getAllTimes,
	getSingleTime,
	createTime,
	updateTime,
	deleteTime,
}
