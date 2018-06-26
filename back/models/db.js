const Sequelize = require('sequelize')
const sequelize = new Sequelize('sqlite:database.db')
User = sequelize.import('./user')
Event = sequelize.import('./event')


const init = () => {
    User.belongsToMany(Event, {through: 'UserEvent'})
    Event.belongsToMany(User, {through: 'UserEvent'})
    sequelize.sync()
}

module.exports = { init, User, Event}
