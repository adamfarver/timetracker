const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Project = require('../../models/Project')
const { ObjectId } = mongoose.Types
// All routes added together

// Project

// Read All Projects
router.get('/', async (req, res, next) => {
	try {
		const allProjects = await Project.aggregate([
			{
				$lookup: {
					from: 'users',
					foreignField: '_id',
					localField: 'projectManager',
					as: 'projectManager',
				},
			},
			{ $unwind: '$projectManager' },
			{
				$project: {
					_id: 1,
					projectName: 1,
					ownerCompany: 1,
					projectManager: { _id: 1, firstName: 1, lastName: 1 },
				},
			},
		])
		res.json(allProjects).status(200)
		res.end()
	} catch (error) {
		res.status(500).send({ msg: 'Server issues' }).end()
	}
})

// Read Single Project
router.get('/:id', async (req, res, next) => {
	try {
		const record = await Project.findById(req.params.id)
		res.json(record).status(200)
		res.end()
	} catch (error) {
		res.status(404).send({ msg: 'Resource not found.' }).end()
	}
})

// Create Project
router.post('/', async (req, res, next) => {
	const { body } = req
	const project = new Project(body)
	// project.projectManager = ObjectId(body.projectManager)
	// project.teamLead = ObjectId(body.teamLead)
	// console.log(project)
	if (mongoose.connection.readyState) {
		await project.save().then(() => {
			res.set({ ok: 'true' }).status(200)
			res.end()
		})
	} else {
		res.status(500).send({ msg: 'Not connected to DB. Cannot Save data' }).end()
	}
})

//Update Project
router.put('/:id', async (req, res, next) => {
	const objId = req.params.id
	const { body } = req
	try {
		await Project.findOneAndUpdate({ _id: objId }, body)

		const record = await Project.findById({ _id: objId })
		res.json(record).status(200)
		res.end()
	} catch (error) {
		res.status(404).send({ msg: 'Resource not found.' }).end()
	}
})

//Delete Project
router.delete('/:id', async (req, res, next) => {
	const objId = req.params.id
	const { body } = req
	try {
		const record = await Project.findOneAndDelete({ _id: objId })
		res.set({ ok: 'true' }).status(200)
		res.end()
	} catch (error) {
		res.status(404).send({ msg: 'Object not found.' }).end()
	}
})

module.exports = router
