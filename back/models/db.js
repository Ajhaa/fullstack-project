const Sequelize = require('sequelize')
const sequelize = new Sequelize('sqlite:database.db')
let User = sequelize.import('./user')
let Event = sequelize.import('./event')

let UserEvent = sequelize.define('userEvent', {
  confirmed: Sequelize.BOOLEAN
})



const init = () => {
  User.belongsToMany(Event, { through: UserEvent })
  Event.belongsToMany(User, { through: UserEvent })
  sequelize.sync()
}

module.exports = { init, User, Event, sequelize }
