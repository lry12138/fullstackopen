import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService  from './services/login'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user,setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [message,setMessage] = useState(null)
  const [errorMessage,setErrorMessage] = useState(null)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])


  const handleLogin = async (event) =>{
    event.preventDefault()
    try{
      const user = await loginService.login({username,password})
      window.localStorage.setItem(
        'loggedInUser', JSON.stringify(user)
      ) 
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      window.location.reload(false)
      setMessage(`Welcome ${user.username}`)
      setTimeout(() => {setMessage(null)}, 4500)
    }catch(exception){
        // this is the way to access the error message
      setErrorMessage(`Wrong username or password. `)
      setTimeout(() => {setErrorMessage(null)}, 4500)}
  }
  
  const handleLogOut = async() =>{
    window.localStorage.clear()
    window.location.reload(false)
    setMessage(`Logged out successfully`)
    setTimeout(() => {setMessage(null)}, 4500)
  }

  const handleNewBlog = async (event) =>{
    event.preventDefault()
    const blogObject = {
      title: title,
      author: author,
      url: url,
      user: user
    }
    try{
      const newBlog = await blogService.addBlog(blogObject)
      setBlogs(blogs.concat(newBlog))
      setMessage(`${title} by ${author} is added`)
      setTimeout(() => {setMessage(null)}, 4500)
      setTitle('')
      setAuthor('')
      setUrl('')
    }
    catch(error){
      setErrorMessage(`${error.response.data.error}`)
      setTimeout(() => {setErrorMessage(null)}, 4500)
    }
    
  }

  const LoginForm = () =>(
      <form onSubmit={handleLogin}>
        <div>
        Username 
          <input type="text" 
            value = {username}
            name="username" 
            onChange={({target}) => setUsername (target.value)}/>
        </div>
        <div>
        Password 
          <input type="password" 
          value={password} 
          name="password"
          onChange={({target}) => setPassword (target.value)}/>
        </div>
        <button type="Submit">Login</button>
      </form>
  )

  const BlogForm = () =>(
    <form onSubmit={handleNewBlog}>
        <div>
        Title 
          <input type="text" 
            value = {title}
            name="title" 
            onChange={({target}) => setTitle (target.value)}/>
        </div>
        <div>
        Author 
          <input type="text" 
          value={author} 
          name="author"
          onChange={({target}) => setAuthor (target.value)}/>
        </div>
        <div>
        URL 
          <input type="text" 
            value = {url}
            name="url" 
            onChange={({target}) => setUrl (target.value)}/>
        </div>
        <button type="Submit">Submit</button>
      </form>
  )
  const BlogsPage = () =>(
    <div>
    {blogs.map(blog =>
      <Blog key={blog.id} blog={blog} />
    )}
    </div>
  )

  const UserPage = () =>(
    <div>
    {BlogForm()}
    <p>{user.username} is logged in</p>
    <button type = "Submit" onClick={handleLogOut}>Log out</button>
    {BlogsPage()}
    </div>
    
  )

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={errorMessage} colour = 'red'/>
      <Notification message={message} colour = 'green'/>
      {user === null
      ?LoginForm()
      : UserPage()
      } 
    </div>
  )
}

export default App