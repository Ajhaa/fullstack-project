const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const { User, Event, sequelize } = require('../models/db')

const formatUser = (user) => {
  console.log(user)
  return {
    id: user.id,
    username: user.username,
    realname: user.realname,
    //score has to be accessed like this, otherwise it is not found
    //TODO: fix this?
    score: user.dataValues.score,
    events: user.events
  }
}

usersRouter.get('/', async (request, response) => {
  try {
    const users = await User.findAll({
      attributes: { include: [[sequelize.fn('SUM', sequelize.col('points')), 'score']] },
      include: [{ model: Event }]
    })

    const formattedUsers = users.map(user => formatUser(user))
    response.json(formattedUsers)
  } catch (e) {
    console.log(e)
  }
})

usersRouter.post('/', async (request, response) => {
  try {
    const body = request.body

    const passwordHash = await bcrypt.hash(body.password, 10)

    await User.create({
      username: body.username,
      realname: body.realname,
      passwordHash,
      role: body.role || 'NORMAL'
    })

    response.json(body)
  } catch (e) {
    console.log(e)
    response.status(500)
  }
})

usersRouter.delete('/:id', async (request, response) => {
  try {
    const id = Number(request.params.id)
    const user = await User.findById(id)
    await user.destroy()

    response.status(204).end()
  } catch (e) {
    console.log(e)
  }
})

usersRouter.get('/:id', async (request, response) => {
  try {
    const id = Number(request.params.id)
    const user = await User.findById(id)
    response.json(user)
  } catch (e) {
    console.log(e)
  }
})

module.exports = usersRouter
