const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const { User, Event, GivenPoints, sequelize } = require('../models/db')

const formatUser = (user, given) => {
  let givenPoints = given.map(g => g.points)
  let givenScore = givenPoints.reduce((a, b) => a + b)
  let formatted = {
    id: user.id,
    username: user.username,
    realname: user.realname,
    //score has to be accessed like this, otherwise it is not found
    //TODO: fix this?
    score: user.dataValues.score + givenScore,
    events: user.events,
    givenPoints: given
  }
  console.log('FORMATTED', formatted)
  return formatted
}

usersRouter.get('/', async (request, response) => {
  try {
    const users = await User.findAll({
      attributes: { include: [[sequelize.fn('SUM', sequelize.col('points')), 'score']] },
      include: [{ model: Event }]
    })
    const givenPoints = await GivenPoints.findAll()
    console.log('POINTS', givenPoints)
    const formattedUsers = users.map(user => {
      let given = givenPoints.filter(g => g.recieverId === user.id)
      console.log('GIVEN', given)
      return formatUser(user, given)
    })
    console.log('FROMAGE', formattedUsers)
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

usersRouter.post('/:id', async (request, response) => {
  if (request.userId === null) {
    return response.status(401).end()
  }

  const giver = await User.findById(request.userId)
  if (giver.role !== 'ADMIN') {
    return response.status(403).end()
  }

  const recipent = await User.findById(Number(request.params.id))

  const message = request.body.message
  const points = request.body.points
  await GivenPoints.create({
    points,
    message,
    giverId: giver.id,
    recieverId: recipent.id
  })
  response.status(200).end()
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
