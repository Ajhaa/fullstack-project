const Sequelize = require('sequelize')
const sequelize = new Sequelize("sqlite:database.db")

const User = sequelize.define('user', {
    username: Sequelize.STRING,
    realname: Sequelize.STRING,
    isAdmin: Sequelize.BOOLEAN
})

module.exports = User
