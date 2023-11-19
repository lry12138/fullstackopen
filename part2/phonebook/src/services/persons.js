import axios from 'axios'
const base_url = '/api/persons'

const getAll =() =>{
    const request = axios.get(base_url)
    return request.then(response => response.data)
}

const create = newObj =>{
    const request = axios.post(base_url,newObj)
    return request.then(response => response.data)
}

const deleteObj = objID =>{
    const request = axios.delete(`${base_url}/${objID}`)
    return request.then(response => response.data)
}

const update = (id, newObject) => {
    const request = axios.put(`${base_url}/${id}`, newObject)
    return request.then(response => response.data)
  }

export default {getAll,create,deleteObj,update}