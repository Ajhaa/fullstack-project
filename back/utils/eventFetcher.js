const axios = require('axios')
const { Event } = require('../models/db')

const fetchEvents = async () => {
  const headers = {
    'X-Token': process.env.EVENT_TOKEN
  }

  const response = await axios.get('https://members.tko-aly.fi/api/events', { headers })
  const events = response.data.filter(e => e.starts > '2018-06-01')

  const formattedEvents = events.map(event => (
    {
      title: event.name,
      description: event.description,
      date: event.starts,
      type: 'event',
      points: null
    }
  ))
  // probably have to figure out a better way to do this
  const oldEventTitles = await Event.findAll().map(e => e.title)
  const noDuplicates = formattedEvents.filter(e => !oldEventTitles.includes(e.title))

  await Event.bulkCreate(noDuplicates)
}



module.exports = fetchEvents
