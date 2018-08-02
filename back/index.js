const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
require('dotenv').config()
const { tokenExtractor } = require('./utils/middleware')
const fetchEvents = require('./utils/eventFetcher')

const eventsRouter = require('./controllers/events')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const db = require('./models/db')

app.use(cors())
app.use(bodyParser.json())
app.use(tokenExtractor)
app.use('/api/events', eventsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

fetchEvents().then(console.log('fetched'))

db.init()
const PORT = 3001
app.listen(PORT, () => {
  console.log('server running on port', PORT)
})
