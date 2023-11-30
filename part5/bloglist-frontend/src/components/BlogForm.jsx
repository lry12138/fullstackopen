import { useState } from "react"

const BlogForm = ({createBlog,user}) =>{
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
            onChange={({target})=>setTitle(target.value)}/>
        </div>
        <div>
        Author 
          <input 
          value={author} 
          onChange={({target})=>setAuthor(target.value)}/>
        </div>
        <div>
        URL 
          <input type="text" 
            value = {url}
            name="url" 
            onChange={({target})=>setUrl(target.value)}/>
        </div>
        <button type="Submit" >Submit</button>
      </form>
  )}

export default BlogForm