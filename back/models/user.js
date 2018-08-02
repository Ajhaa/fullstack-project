const User = (sequelize, DataTypes) => {
  return sequelize.define('user', {
    username: DataTypes.STRING,
    realname: DataTypes.STRING,
    passwordHash: DataTypes.STRING,
    role: DataTypes.STRING
  })
}

module.exports = User
