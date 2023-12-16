/* eslint-disable no-undef */
import React from 'react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import { render, screen } from '@testing-library/react'
import BlogForm from './BlogForm'

test('<BlogForm /> updates parent state and calls onSubmit', async () => {
  const createBlog = jest.fn()
  const user = userEvent.setup()
  const currentUser = {
    username: 'test user',
    id:'124'
  }

  render(<BlogForm createBlog={createBlog} user={currentUser}/>)

  const title = screen.getByPlaceholderText('BlogTitle')
  const author = screen.getByPlaceholderText('BlogAuthor')
  const url = screen.getByPlaceholderText('BlogUrl')
  const sendButton = screen.getByText('Submit')

  await user.type(title, 'testing a form...')
  await user.type(author, 'test user')
  await user.type(url,'test.com')
  await user.click(sendButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  console.log(createBlog.mock.calls)
  expect(createBlog.mock.calls[0][0]).toEqual(
    { title: 'testing a form...',
      author: 'test user',
      url: 'test.com',
      user: currentUser })
})

