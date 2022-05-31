const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../../models/User')

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_KEY, { expiresIn: '1h' })
}

// @desc Auth User
// @route Auth /api/user/login
// @access PUBLIC

const authUser = asyncHandler(async (req, res, next) => {
  console.log(req.body)
  // Get password and email
  const { email, password } = req.body

  /* Following aggregation:
  Here's what's happening:
  Because the name of the role name is not in the table, it's only stored as the objectId, we are forced to do an aggregation. So, here are the steps that we are doing to get there. We're also only using one request of our database. */
  // Get user
  let user = await User.aggregate([
    [
      //  $match is pulling everything from the collection then filter for email.
      { $match: { email: email } },
      // $lookup is the same as a join in SQL.
      {
        $lookup: {
          // Collection to pull from
          from: 'roles',
          // Field in main document to lookup
          localField: 'role',
          // Field from roles collection that you want to join to main document.
          foreignField: '_id',
          // Where to put it on the main document.
          as: 'role',
        },
      },
      // Role comes back as an array so, we flatten it.
      { $unwind: { path: '$role' } },
      // Give me these object properties via project
      {
        $project: {
          _id: 1,
          password: 1,
          firstName: 1,
          lastName: 1,
          email: 1,
          role: 1,
        },
      },
    ],
  ])
  // set user as first element of returned array in user
  user = user[0]
  // hash and compare
  if (user && (await bcrypt.compare(password, user.password))) {
    // issue token
    res
      .status(200)
      .send({
        _id: user._id,
        firstName: user.firstName,
        LastName: user.lastName,
        email: user.email,
        role: { _id: user.role._id, roleName: user.role.roleName },
        token: generateToken(user._id),
      })
      .end()
  } else {
    res.status(400)
    throw new Error('Invalid credentials')
  }
})

module.exports = {
  authUser,
}
