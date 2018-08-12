const Sequelize = require('sequelize')
const sequelize = new Sequelize('sqlite:database.db')
let User = sequelize.import('./user')
let Event = sequelize.import('./event')
let GivenPoints = sequelize.import('./givenPoints')

let UserEvent = sequelize.define('userEvent', {
  confirmed: Sequelize.BOOLEAN
})

let UserPoints = sequelize.define('userPoints', {
  points: Sequelize.INTEGER,
  message: Sequelize.STRING
})


const init = () => {
  User.belongsToMany(Event, { through: UserEvent })
  Event.belongsToMany(User, { through: UserEvent })
  User.belongsToMany(User, {as: 'giver', foreignKey: 'giverId', through: UserPoints})
  User.belongsToMany(User, {as: 'recipient', foreignKey: 'recipientId', through: UserPoints})
  sequelize.sync()
}

module.exports = { init, User, Event, GivenPoints, sequelize }
