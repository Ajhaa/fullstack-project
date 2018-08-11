const jwt = require('jsonwebtoken')

const tokenExtractor = (request, response, next) => {
  const auth = request.get('authorization')
  console.log('Auth', auth)
  if (auth && auth.toLowerCase().startsWith('bearer ')) {
    request.token = auth.substring(7)
    console.log('TOKEN:', request.token)
    return next()
  }

  request.token = null
  next()
}

const authorize = (request, response, next) => {
  try {
    const token = request.token

    const decodedToken = jwt.decode(token, process.env.SECRET)

    if (!token || !decodedToken.id) {
      request.userId = null
      return next()
    }

    request.userId = decodedToken.id
    next()
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      response.status(401).json({ error: error.message })
    } else {
      console.log(error)
      response.status(500)
    }
  }
}



module.exports = {
  tokenExtractor,
  authorize
}
