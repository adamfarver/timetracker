const mongoose = require('mongoose')
const Project = require('../../models/Project')
const asyncHandler = require('express-async-handler')
const { stripNulls } = require('../_helpers/stripNulls')
// TODO: Add throw statements

const getAllProjects = asyncHandler(async (req, res, next) => {
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
		res.json(allProjects)
		res.end()
	} catch (error) {
		res.status(500)
		throw new Error('Server issues')
	}
})
const getSingleProject = asyncHandler(async (req, res, next) => {
	const { id } = req.params
	try {
		const record = await Project.findById(id)
		res.json(record)
	} catch (error) {
		res.status(404)
		throw new Error('Resource not found.')
	}
})
const createProject = asyncHandler(async (req, res, next) => {
	const { body } = req
	const cleanedData = stripNulls(body)
	if (!body.projectName || !body.projectManager || !body.ownerCompany) {
		res.status(400)
		throw new Error('Requires all fields.')
	}
	const project = new Project(cleanedData)
	try {
		const savedProject = await project.save()
	} catch (error) {
		res.status(500)
		throw new Error('Server Error')
	}

	// await project
	// 	.save()
	// 	.then((e) => console.log(e))
	// 	.then(() => {
	// 		res.set({ ok: 'true' }).status(201)
	// 		res.end()
	// 	})
})
const updateProject = asyncHandler(async (req, res, next) => {
	const objId = req.params.id
	const { body } = req
	try {
		await Project.findOneAndUpdate({ _id: objId }, body)

		const record = await Project.findById({ _id: objId })
		res.json(record).status(200)
		res.end()
	} catch (error) {
		res.status(404)
		throw new Error('Resource Not Found')
	}
})
const deleteProject = asyncHandler(async (req, res, next) => {
	const objId = req.params.id
	const { body } = req
	try {
		const record = await Project.findOneAndDelete({ _id: objId })
		res.set({ ok: 'true' }).status(200)
		res.end()
	} catch (error) {
		res.status(404)
		throw new Error('Resource Not Found')
	}
})

module.exports = {
	getAllProjects,
	getSingleProject,
	createProject,
	updateProject,
	deleteProject,
}
