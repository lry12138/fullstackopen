import { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog,user }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const addBlog = async (event) => {
    event.preventDefault()
    await createBlog({
      title: title,
      author: author,
      url: url,
      user: user
    })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return(
    <form onSubmit={addBlog}>
      <div>
        Title
        <input
          value = {title}
          onChange={({ target }) => setTitle(target.value)}
          placeholder='BlogTitle'/>
      </div>
      <div>
        Author
        <input
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
          placeholder='BlogAuthor'/>
      </div>
      <div>
        URL
        <input type="text"
          value = {url}
          name="url"
          onChange={({ target }) => setUrl(target.value)}
          placeholder ='BlogUrl'/>
      </div>
      <button type="Submit" >Submit</button>
    </form>
  )}

BlogForm.propType ={
  createBlog:PropTypes.func.isRequired,
  user:PropTypes.object.isRequired
}
export default BlogForm