const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Sprint = require('../../models/Sprint')
const Task = require('../../models/Task')
const { makeSparseArrays, makeDayArrays } = require('../_helpers/makeArrays')
const { ObjectId } = mongoose.Types
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
// Read All Sprints, filtered by Project.
router.get('/list/:id', async (req, res, next) => {
	try {
		const allSprints = await Sprint.find({ project: req.params.id })
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

router.get('/sprintgraph/:id', async (req, res, next) => {
	const records = {}
	try {
		let projectedTime = await Task.aggregate([
			{ $match: { sprint: ObjectId(`${req.params.id}`) } },
			{ $group: { _id: 0, projectedTime: { $sum: '$projectedTime' } } },
		])
		projectedTime = makeSparseArrays(projectedTime[0].projectedTime, 5)
		const sprintInfo = await Sprint.findOne({ _id: req.params.id })
		records.labels = makeDayArrays(sprintInfo.dateStart, sprintInfo.dateEnd)
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
// Aggregate number of sprint types in current project
router.get('/number/:id', async (req, res, next) => {
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
		console.log(error)
		res.status(404).send({ msg: 'Resource not found.' }).end()
	}
})
// Create Sprint
router.post('/', async (req, res, next) => {
	const { body } = req

	const project = new Sprint(body)
	if (mongoose.connection.readyState) {
		await project.save().then(() => {
			res.set({ ok: 'true' }).status(200)
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
		res.set({ ok: 'true' }).status(200)
		res.end()
	} catch (error) {
		res.status(404).send({ msg: 'Object not found.' }).end()
	}
})

module.exports = router
