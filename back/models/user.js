
const User = (sequelize, DataTypes) => {
    return sequelize.define('user', {
        username: DataTypes.STRING,
        realname: DataTypes.STRING,
        isAdmin: DataTypes.BOOLEAN
    })
}


module.exports = User
