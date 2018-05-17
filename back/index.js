const http = require('http')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const eventsRouter = require('./controllers/events')


app.use(bodyParser.json())
app.use('/api/events', eventsRouter)

const PORT = 3001
app.listen(PORT, () => {
    console.log('server running on port', PORT)
})
