const Sequelize = require('sequelize')
const sequelize = new Sequelize("sqlite:database.db")

const Event = sequelize.define('event', {
    type: Sequelize.STRING,
    title: Sequelize.STRING,
    points: Sequelize.INTEGER
})

module.exports = Event
