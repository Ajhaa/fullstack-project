import axios from 'axios'
const baseurl = 'http://localhost:3001/api/users/'

const getUser = async (id) => {
    const response = await axios.get(baseurl+id)
    return response.data
}

const createUser = async (user) => {
  const data = {
    username: user.username,
    realname: user.realname,
    password: user.password,
    isAdmin: false
  }
  const response = await axios.post(baseurl, data)
  return response.data
}

export default { getUser, createUser }
