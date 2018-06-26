const usersRouter = require('express').Router()
const { User } = require('../models/db')

usersRouter.get('/', async (request, response) => {
    try {
        const users = await User.findAll()
        response.json(users)
    } catch (e) {
        console.log(e)
    }
})

usersRouter.post('/', async (request, response) => {
    try {
        const body = request.body
        await User.create({
            username: body.username,
            realname: body.realname,
            isAdmin: body.isAdmin
        })

        response.json(body)
    } catch (e) {
        console.log(e)
    }
})

usersRouter.delete('/:id', async (request, response) => {
    try {
        const id = Number(request.params.id)
        const user = await User.findById(id)
        await user.destroy()

        response.status(204).end()
    } catch (e) {
        console.log(e)
    }
})

usersRouter.get('/:id', async (request, response) => {
    try {
        const id = Number(request.params.id)
        const user = await User.findById(id)
        response.json(user)
    } catch (e) {
        console.log(e)
    }
})

module.exports = usersRouter
