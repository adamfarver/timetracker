const mongoose = require('mongoose')
const Sprint = require('../../models/Sprint')
const asyncHandler = require('express-async-handler')
const { ObjectId } = mongoose.Types
// All routes added together

const getAllSprints = asyncHandler(async (req, res, next) => {
	try {
		const allSprints = await Sprint.find({})
		res.json(allSprints).status(200)
		res.end()
	} catch (error) {
		res.status(500)
		throw new Error('Server Issues')
	}
})
const getSingleSprint = asyncHandler(async (req, res, next) => {
	try {
		const allSprints = await Sprint.find({ project: req.params.id })
		res.json(allSprints).status(200)
		res.end()
	} catch (error) {
		res.status(500)
		throw new Error('Server Issues')
	}
})
const getSprintNumber = asyncHandler(async (req, res, next) => {
	try {
		const record = await Sprint.aggregate([
			{ $match: { project: ObjectId(req.params.id) } },
			{
				$group: { _id: '$sprintType', sprintType: { $sum: 1 } },
			},
		])
		res.json(record).status(200)
		res.end()
	} catch (error) {
		res.status(404)
		throw new error('Object not found')
	}
})
const createSprint = asyncHandler(async (req, res, next) => {
	const { body } = req

	const project = new Sprint(body)
	try {
		const sprint = await project.save().then(() => {
			res.set({ ok: 'true' }).status(200)
			res.end()
		})
	} catch (error) {
		res.status(500)
		throw new error('Not connected to DB. Cannot Save data.')
	}
})
const updateSprint = asyncHandler(async (req, res, next) => {
	const objId = req.params.id
	const { body } = req
	try {
		await Sprint.findOneAndUpdate({ _id: objId }, body)

		const record = await Sprint.findById({ _id: objId })
		res.json(record).status(200)
		res.end()
	} catch (error) {
		res.status(404)
		throw new error('Resource not found.')
	}
})
const deleteSprint = asyncHandler(async (req, res, next) => {
	const objId = req.params.id
	const { body } = req
	try {
		const record = await Sprint.findOneAndDelete({ _id: objId })
		res.set({ ok: 'true' }).status(200)
		res.end()
	} catch (error) {
		res.status(404)
		throw new error('Resource not found.')
	}
})

module.exports = {
	getAllSprints,
	getSingleSprint,
	createSprint,
	updateSprint,
	getSprintNumber,
	deleteSprint,
}
