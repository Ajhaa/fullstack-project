const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
require('dotenv').config()
const { tokenExtractor, authorize } = require('./utils/middleware')
const fetchEvents = require('./utils/eventFetcher')

const eventsRouter = require('./controllers/events')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const db = require('./models/db')

app.use(cors())
app.use(bodyParser.json())
app.use(tokenExtractor)
app.use(authorize)
app.use('/api/events', eventsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)


db.init()

fetchEvents().then(console.log('fetched'))

setInterval(() => {
  fetchEvents()
  console.log('fetched')
}, 1000*60*5)

const PORT = 3001
app.listen(PORT, () => {
  console.log('server running on port', PORT)
})
