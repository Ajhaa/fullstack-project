const jwt = require('jsonwebtoken')
const eventsRouter = require('express').Router()
const { User, Event } = require('../models/db')

eventsRouter.get('/', async (request, response) => {
  const show = request.query.show

  const userId = request.userId

  if (userId == null) {
    return response.status(401).json({ error: 'invalid token' })
  }
  const user = await User.findById(userId)

  const events = await Event.findAll({ include: [{ model: User }] })

  if (!show) {
    response.json(events.filter(e => e.points !== null))
  } else if (show === 'all') {
    if (user.role !== 'ADMIN') {
      response.status(401).json({ error: 'must be admin to access this' })
    }
    response.json(events)
  } else if (show === 'only') {
    response.status(401).json({ error: 'must be admin to access this' })
    response.json(events.filter(e => e.points === null))
  }

})

eventsRouter.get('/:id', async (request, response) => {
  if (request.userId === null) {
    return response.status(401).end()
  }

  const id = Number(request.params.id)
  let event = await Event.findById(id, { include: [{ model: User }] })
  response.json(event)
})

eventsRouter.delete('/:id', async (request, response) => {
  if (request.userId === null) {
    return response.status(401).end()
  }
  try {
    const id = Number(request.params.id)
    const event = await Event.findById(id)
    await event.destroy()

    response.status(204).end()
  } catch (e) {
    console.log(e)
  }
})

eventsRouter.post('/', async (request, response) => {
  const body = request.body
  console.log('BODY', body)
  if (body.title === undefined) {
    return response.status(400).json({ error: 'title missing' })
  }

  if (body.date === undefined) {
    return response.status(400).json({ error: 'date missing' })
  }

  const event = {
    type: body.type || 'event',
    decription: body.description || '',
    date: body.date,
    title: body.title,
    points: body.points || null,
  }

  await Event.create({
    type: event.type,
    description: event.decription,
    date: event.date,
    title: event.title,
    points: event.points
  })

  response.json(event)
})

eventsRouter.post('/:eventId/', async (request, response) => {
  let eventId = request.params.eventId
  try {
    const token = request.token
    console.log('TOKEN:', token)
    const decodedToken = jwt.verify(token, process.env.SECRET)

    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: 'token invalid or missing' })
    }

    let user = await User.findById(decodedToken.id)
    let event = await Event.findById(eventId)

    await event.addUser(user)

    console.log('User ' + user.username + ' added to ' + event.title)
    response.status(204).end()
  } catch (exception) {
    if (exception.name === 'JsonWebTokenError') {
      response.status(401).json({ error: exception.message })
    } else {
      console.log(exception)
      response.status(500)
    }
  }
})

eventsRouter.put('/:eventId/', async (request, response) => {
  const id = Number(request.params.eventId)
  console.log('ID', id)
  const body = request.body

  try {
    const eventToUpdate = await Event.findById(id)
    eventToUpdate.points = body.points
    console.log('BEFORE AWAIT')
    await eventToUpdate.save({ fields: ['points'] })
    console.log('HANGING')
    response.status(200).end()
  } catch (error) {
    response.status(400).json({ error })
  }
})

module.exports = eventsRouter
