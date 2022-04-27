const mongoose = require('mongoose')
const Role = require('../../models/Role')
const asyncHandler = require('express-async-handler')

const getAllRoles = asyncHandler(async (req, res, next) => {
	try {
		const allRoles = await Role.find({})
		res.json(allRoles).status(200)
		res.end()
	} catch (error) {
		res.status(500)
		throw new error('Server issues.')
	}
})
const getSingleRole = asyncHandler(async (req, res, next) => {
	try {
		const record = await Role.findById(req.params.id)
		res.json(record).status(200)
		res.end()
	} catch (error) {
		res.status(404)
		throw new error('Resource not found')
	}
})
const createRole = asyncHandler(async (req, res, next) => {
	const { body } = req
	const project = new Role(body)
	if (mongoose.connection.readyState) {
		await project.save().then(() => {
			res.set({ ok: 'true' }).status(200)
			res.end()
		})
	} else {
		res.status(500)
		throw new error('Not connected to DB. Cannot Save data.')
	}
})
const updateRole = asyncHandler(async (req, res, next) => {
	const objId = req.params.id
	const { body } = req
	try {
		await Role.findOneAndUpdate({ _id: objId }, body)

		const record = await Role.findById({ _id: objId })
		res.json(record).status(200)
		res.end()
	} catch (error) {
		res.status(404)
		throw new error('Resource not found')
	}
})
const deleteRole = asyncHandler(async (req, res, next) => {
	const objId = req.params.id
	const { body } = req
	try {
		const record = await Role.findOneAndDelete({ _id: objId })
		res.set({ ok: 'true' }).status(200)
		res.end()
	} catch (error) {
		res.status(404)
		throw new error('Object Not Found')
	}
})
module.exports = {
	getAllRoles,
	getSingleRole,
	createRole,
	updateRole,
	deleteRole,
}
