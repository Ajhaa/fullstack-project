import axios from 'axios'
const baseurl = 'http://localhost:3001/api/events/'

const buildBearer = (token) => ( 'bearer ' + token)

const getAll = async () => {
    const response = await axios.get(baseurl)
    return response.data
}

const connectToEvent = async (id, token) => {
    console.log("URL:", baseurl+id)
    console.log("TOKEN:", buildBearer(token))
    token = buildBearer(token)
    const config = {
        headers: {'Authorization': token}
    }
    console.log("CONFIG", config)
    let url = baseurl + id
    const response = await axios.post(url, null, config)
    return response
}

export default { getAll, connectToEvent }
