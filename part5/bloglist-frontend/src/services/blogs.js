import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}


const getAll = async () => {
  const config = {
    headers: { Authorization: token }
  }
  const request = await axios.get(baseUrl,config)
  return request.data
}

const addBlog = async newObject  => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, newObject, config)
  console.log(response.data)
  return response.data
}

const likeBlog = async blogToUpdate =>{
    const config = {
      headers: { Authorization: token }
    }
    const blogId = blogToUpdate.id
    const updatedBlog = ({
      title: blogToUpdate.title,
      author: blogToUpdate.author,
      url: blogToUpdate.url,
      likes: blogToUpdate.likes+1
  })
  const response = await axios.put(baseUrl + '/' + blogId,updatedBlog,config)
  return response.data
}

const deleteBlog = async blog =>{
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.delete(baseUrl + '/' + blog.id,config)
  return response.data
}

export default { getAll,setToken,addBlog,likeBlog,deleteBlog}