const http = require('http')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const Sequelize = require('sequelize')
const sequelize = new Sequelize('sqlite:database.db')

const Event = sequelize.define('event', {
    type: Sequelize.STRING,
    title: Sequelize.STRING,
    points: Sequelize.INTEGER
})

app.use(bodyParser.json())


app.get('/events', async (request, response) => {
    const events = await Event.findAll()
    response.json(events)
})

app.get('/events/:id', async (request, response) => {
    const id = Number(request.params.id)
    const event = await Event.findById(id)
    response.json(event)
})

app.delete('/events/:id', async (request, response) => {
    try {
        const id = Number(request.params.id)
        const event = await Event.findById(id)
        await event.destroy()

        response.status(204).end()
    } catch (e) {
        console.log(e)
    }
})

app.post('/events', (request, response) => {
    const body = request.body

    if (body.title === undefined) {
        return response.status(400).json({error: "title missing"})
    }

    const event = {
        type: body.type || "event",
        title: body.title,
        points: body.points || 5,
    }

    sequelize.sync()
        .then(() => Event.create({
            type: event.type,
            title: event.title,
            points: event.points
        }))

    response.json(event)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log('server running on port', PORT)
})
