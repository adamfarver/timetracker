const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = require('../../models/User')
const { ObjectId } = mongoose.Types
const {
	getAllUsers,
	getSingleUser,
	registerNewUser,
	updateUser,
} = require('../controllers/userController')
// All routes added together

// User

// Read All Users
router.get('/', getAllUsers)

// Read Single User
router.get('/:id', getSingleUser)

// Create User
router.post('/', registerNewUser)

//Update User
router.put('/:id', updateUser)

//Delete User
router.delete('/:id', async (req, res, next) => {
	const objId = req.params.id
	const { body } = req
	try {
		const record = await User.findOneAndDelete({ _id: objId })
		res.set({ ok: 'true' }).status(200)
		res.end()
	} catch (error) {
		res.status(404).send({ msg: 'Object not found.' }).end()
	}
})

module.exports = router
