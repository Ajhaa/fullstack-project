const tokenExtractor = (request, response, next) => {
  const auth = request.get('authorization')
  console.log('AUTH', auth)
  if (auth && auth.toLowerCase().startsWith('bearer ')) {
    request.token = auth.substring(7)
    return next()
  }

  request.token = null
  next()
}

module.exports = {
  tokenExtractor
}
