const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const { User } = require('../models/db')

loginRouter.post('/', async (request, response) => {
    const body = request.body
    const user = await User.findOne({
        where: {username: body.username}}
    )

    const passwordCorrect = await bcrypt.compare(body.password, user.passwordHash)

    if (! (user && passwordCorrect)) {
        return response.status(401).send({ error: 'Invalid username or password'})
    }

    const auth_user = {
        username: user.username,
        id: user.id
    }

    const token = jwt.sign(auth_user, process.env.SECRET)

    response.status(200).send({
        token, username: user.username, realname: user.realname
    })
})

module.exports = loginRouter
