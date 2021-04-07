const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Time = require('../../models/Time')
const Task = require('../../models/Task')
// All routes added together

// Time

// Read All Times
router.get('/', async (req, res, next) => {
	try {
		const allTimes = await Time.find({})
		res.json(allTimes).status(200)
		res.end()
	} catch (error) {
		res.status(500).send({ msg: 'Server issues' }).end()
	}
})

// Read Single Time
router.get('/:id', async (req, res, next) => {
	try {
		const record = await Time.findById(req.params.id)
		res.json(record).status(200)
		res.end()
	} catch (error) {
		res.status(404).send({ msg: 'Resource not found.' }).end()
	}
})

// Create Time
router.post('/', async (req, res, next) => {
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
		res.status(404).send({ msg: "Couldn't create record" }).end()
	}
})

//Update Time
router.put('/:id', async (req, res, next) => {
	const objId = req.params.id
	const { body } = req
	try {
		await Time.findOneAndUpdate({ _id: objId }, body, { upsert: true })
		const record = await Time.findById({ _id: objId })
		res.json(record).status(200)
		res.end()
	} catch (error) {
		res.status(404).send({ msg: 'Resource not found.' }).end()
	}
})

//Delete Time
router.delete('/:id', async (req, res, next) => {
	const objId = req.params.id
	const { body } = req
	try {
		const record = await Time.findOneAndDelete({ _id: objId })
		res.set({ ok: 'true' }).status(200)
		res.end()
	} catch (error) {
		res.status(404).send({ msg: 'Object not found.' }).end()
	}
})

module.exports = router
