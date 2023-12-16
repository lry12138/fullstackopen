import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, handleLike,handleDelete,userid }) => {
  const [visible, setVisible] = useState(false)
  const showWhenVisible ={ display: visible ?'':'none' }
  const toggleVisibility = () => {
    setVisible(!visible)
  }
  const user = blog.user.username? blog.user.username:''
  const addlike = async(event) => {
    event.preventDefault()
    await handleLike(blog)
  }
  const deleteblog = async(event) => {
    event.preventDefault()
    await handleDelete(blog)
  }
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 2,
    marginBottom: 10
  }
  return (
    <div style = {blogStyle} className ='blog' >
      <p >{blog.title} by {blog.author}</p> <button onClick={toggleVisibility}>{visible?'close':'view'}</button>
      <div style = {showWhenVisible} className = 'togglable'>
        <label htmlFor ='url' className ='url'>Link :</label> <a id='url' href={blog.url.toString()}> {blog.url.toString()}</a>
        <br/><br/>
        <label htmlFor ='likes' className ='likes'>Likes : {blog.likes.toString()}</label>
        <button onClick={addlike}>like</button>
        <p>Created by: {user}</p>
        {userid===blog.user.id
          ?<button onClick={deleteblog}>delete</button>
          : ''}
      </div>
    </div>

  )
}
Blog.propTypes = {
  handleLike: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  blog: PropTypes.object.isRequired,
  userid: PropTypes.string.isRequired
}

export default Blog