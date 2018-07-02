import axios from 'axios'
const baseurl = 'http://localhost:3001/api/users/'

const getUser = async (id) => {
    const response = await axios.get(baseurl+id)
    return response.data
}
