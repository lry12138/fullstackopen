/* eslint-disable no-undef */
import React from 'react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

describe('Test Blog Display',() => {

  let container
  let mockLikes
  let mockDel
  beforeEach (() => {
    const user ={
      username: 'test user',
      id:'124'
    }
    const blog = {
      title: 'Component testing',
      author: 'test author',
      url :'1231.co',
      likes:0,
      user: user
    }
    mockDel = jest.fn()
    mockLikes = jest.fn()
    container = render(<Blog blog={blog}
      userid ='12345'
      handleDelete={mockDel}
      handleLike={mockLikes}/>).container
  })

  test('renders content', () => {
    const div = container.querySelector('.blog')
    expect(div).toHaveTextContent(
      'Component testing by test author'
    )
    expect(div.querySelector('.togglable')).toHaveStyle('display: none')
  })

  test('Expand Togglable',async() => {
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const div = container.querySelector('.blog')
    const togglable = div.querySelector('.togglable')
    expect(togglable).not.toHaveStyle('display: none')
    expect(togglable).toHaveTextContent(
      'Link : 1231.co'
    )
    expect(togglable).toHaveTextContent(
      'Likes : 0'
    )
  })

  test ('Like a blog',async() => {
    const user = userEvent.setup()
    const button = screen.getByText('like')
    await user.click(button)
    await user.click(button)

    expect(mockLikes.mock.calls).toHaveLength(2)
  })
})