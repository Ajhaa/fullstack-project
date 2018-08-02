
const Event = (sequelize, DataTypes) => {
  return sequelize.define('event', {
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    date: DataTypes.DATE,
    type: DataTypes.STRING,
    points: DataTypes.INTEGER
  })
}

module.exports = Event
