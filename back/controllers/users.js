const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const { User, Event, sequelize } = require('../models/db')

usersRouter.get('/', async (request, response) => {
  try {
    const users = await User.findAll({
      attributes: { include: [[sequelize.fn('SUM', sequelize.col('points')), 'score']] },
      include: [{ model: Event }]
    })
    console.log(users)
    response.json(users)
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
      isAdmin: body.isAdmin
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
