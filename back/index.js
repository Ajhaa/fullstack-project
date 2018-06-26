const http = require('http')
const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
require('dotenv').config()

const eventsRouter = require('./controllers/events')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const db = require('./models/db')

app.use(cors())
app.use(bodyParser.json())
app.use('/api/events', eventsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

db.init()

const PORT = 3001
app.listen(PORT, () => {
    console.log('server running on port', PORT)
})
