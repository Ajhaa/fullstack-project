const eventsRouter = require('express').Router()
const {User, Event } = require('../models/db')


eventsRouter.get('/', async (request, response) => {
    const events = await Event.findAll()
    response.json(events)
})

eventsRouter.get('/:id', async (request, response) => {
    const id = Number(request.params.id)
    const event = await Event.findById(id)
    response.json(event)
})

eventsRouter.delete('/:id', async (request, response) => {
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
        return response.status(400).json({error: "title missing"})
    }

    const event = {
        type: body.type || "event",
        title: body.title,
        points: body.points || 5,
    }

    await Event.create({
            type: event.type,
            title: event.title,
            points: event.points
    })

    response.json(event)
})

eventsRouter.post('/:eventId/users/:userId', async (request, response) => {
    let userId = request.params.userId
    let eventId = request.params.eventId

    let user = await User.findById(userId)
    let event = await Event.findById(eventId)
    await event.addUser(user)
    console.log('User ' + user.username + ' added to ' + event.title)
    response.status(200).end()
})


module.exports = eventsRouter
