import axios from 'axios'
const baseurl = 'http://localhost:3001/api/login'

let authenticated = false

const login = async (credentials) => {
    const response = await axios.post(baseurl, credentials)
    return response.data
}

const setAuth = () => {
  authenticated = true
}

const isAuth = () => authenticated


export default { login, setAuth, isAuth }
