const http = require('http')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.json())

let events = [
    {id: 0, type: 'event',title: 'lukuvuoden varaslähtö', points: 5},
    {id: 1, type: 'challenge' ,title: 'kättele rehtoria', points: 3},
    {id: 2, type: 'event', title: 'fuksiaiset', points: 5},
    {id: 3, type: 'event', title: 'siivous', points: 1}
]

app.get('/events', (request, response) => {
    response.json(events)
})

app.get('/events/:id', (request, response) => {
    const id = Number(request.params.id)
    const event = events.find(event => event.id === id)
    response.json(event)
})

app.delete('/events/:id', (request, response) => {
    const id = Number(request.params.id)
    events = events.filter(event => event.id !== id)

    response.status(204).end()
})

const generateId = () => {
    const ids = events.map(event => event.id)
    const maxId = Math.max(...ids)
    return maxId + 1
}

app.post('/events', (request, response) => {
    const body = request.body

    if (body.title === undefined) {
        return response.status(400).json({error: "title missing"})
    }

    const event = {
        id: generateId(),
        type: body.type || "event",
        title: body.title,
        points: body.points || 5,
    }

    events = events.concat(event)

    response.json(event)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log('server running on port', PORT)
})
