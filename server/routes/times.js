const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Time = require('../../models/Time')
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
	const project = new Time(body)
	if (mongoose.connection.readyState) {
		await project.save().then(() => {
			res.redirect('/dataadded')
			res.end()
		})
	} else {
		res.status(500).send({ msg: 'Not connected to DB. Cannot Save data' }).end()
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
