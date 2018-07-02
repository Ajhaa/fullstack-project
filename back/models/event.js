
const Event = (sequelize, DataTypes) => {
  return sequelize.define('event', {
    type: DataTypes.STRING,
    title: DataTypes.STRING,
    points: DataTypes.INTEGER
  })
}

module.exports = Event
