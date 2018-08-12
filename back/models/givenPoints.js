const GivenPoints = (sequelize, DataTypes) => {
  return sequelize.define('givenPoints', {
    points: DataTypes.INTEGER,
    message: DataTypes.STRING,
    giverId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    recieverId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'users',
        key: 'id'
      }
    }
  })
}

module.exports = GivenPoints
