const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const { Event, User, sequelize } = require('../models/db')

loginRouter.post('/', async (request, response) => {
  const body = request.body

  //find the one user, uses findAll, because findOne doesn't work
  const users = await User.findAll({
    attributes: { include: [[sequelize.fn('SUM', sequelize.col('points')), 'score']] },
    include: [{ model: Event }],
    where: { username: body.username }
  })

  const user = users[0]

  console.log('USER', user)
  const passwordCorrect = user === null ?
    false :
    await bcrypt.compare(body.password, user.passwordHash)

  if (!(user && passwordCorrect)) {
    return response.status(401).send({ error: 'Invalid username or password' })
  }

  const auth_user = {
    username: user.username,
    id: user.id
  }

  const token = jwt.sign(auth_user, process.env.SECRET)
  console.log('LOGIN SUCCESFUL')
  response.status(200).send({
    token, user
  })
})

module.exports = loginRouter
