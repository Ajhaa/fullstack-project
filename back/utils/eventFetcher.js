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
      type: 'event',
      points: null
    }
  ))

  await Event.bulkCreate(formattedEvents)
}



module.exports = fetchEvents
