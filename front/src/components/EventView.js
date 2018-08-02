import React from 'react'

const EventView = ({ event, completed, onClick }) =>  {
  return event === undefined ?
    <div></div> :
    <div>
      <h4>{event.title}</h4>
      <div>Points: {event.points}</div>
      <div>Completed: {completed}</div>
      <button onClick={onClick}>Claim points</button>
    </div>
}

export default EventView
