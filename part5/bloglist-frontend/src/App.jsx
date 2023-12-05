import { useState, useEffect,useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService  from './services/login'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user,setUser] = useState(null)
  const [message,setMessage] = useState(null)
  const [errorMessage,setErrorMessage] = useState(null)

  //init
  useEffect(() =>{
    const loggedUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedUserJSON) {
      const currentuser = JSON.parse(loggedUserJSON)
      blogService.setToken(currentuser.token)
      setUser(currentuser)
  }
  }, [])

  useEffect(() =>{ async function fetchdata(){
    const initialBlogs = await blogService.getAll()
    initialBlogs.sort((a, b) => {return(b.likes - a.likes)})
    setBlogs(initialBlogs)
    }
    fetchdata()
  }, [blogs])

  //login + out
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
      setErrorMessage(`Wrong username or password. `)
      setTimeout(() => {setErrorMessage(null)}, 4500)}
  }
  
  const handleLogOut = async() =>{
    window.localStorage.clear()
    window.location.reload(false)
    setMessage(`Logged out successfully`)
    setTimeout(() => {setMessage(null)}, 4500)
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

  //action per blog
  const handleLike = async (blog) =>{
    const id = blog.id
    const returnedBlog = await blogService.likeBlog(blog)
    setBlogs(blogs.map(blog => blog.id !== id ?blog: returnedBlog))
  }

  const handleDelete = async (blog)=>{
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)){
    await blogService.deleteBlog(blog)
    }
  }

  const BlogsPage = () =>(
    <div>
    {blogs.map(blog =>
      <Blog key={blog.id} 
        blog={blog} 
        handleLike ={handleLike}
        handleDelete={handleDelete} 
        userid = {user.id}/>
    )}
    </div>
  )

  //add new blog
  const blogFormRef = useRef()
  const handleNewBlog = async(blogObject) =>{
    blogFormRef.current.toggleVisibility()
    try{
      const newBlog = await blogService.addBlog(blogObject)
      setBlogs( blogs=>[...blogs ,newBlog]) 
      setMessage(`${blogObject.title} by ${blogObject.author} is added`)
      setTimeout(() => {setMessage(null)}, 4500)
    }
    catch(error){
      setErrorMessage(`${error.response.data.error}`)
      setTimeout(() => {setErrorMessage(null)}, 4500)
    }
    
  }

  const blogForm = () => (
    <Togglable buttonLabel='new Blog' ref={blogFormRef}>
      <h1>Create New Blog</h1>
      <BlogForm createBlog = {handleNewBlog} user= {user}/>
    </Togglable>
  )

  //display
  const UserPage = () =>(
    <div>
    <p>{user.username} is logged in</p>
    <button type = "Submit" onClick={handleLogOut}>Log out</button>
    {blogForm()}
    {BlogsPage()}
    </div>
    
  )

  return (
    <div>
      <h1>Blogs</h1>
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