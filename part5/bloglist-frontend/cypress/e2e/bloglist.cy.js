/* eslint-disable no-undef */
describe('template spec', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user1 = {
      name: 'user1',
      username: 'user1',
      password: 'password'
    }
    const user2 = {
      name: 'user2',
      username: 'user2',
      password: 'password'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user1)
    cy.request('POST', 'http://localhost:3003/api/users/', user2)
    cy.visit('http://localhost:5173')
  })

  it('Page can be opened', () => {
    cy.contains('Blogs')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('user1')
      cy.get('#password').type('password')
      cy.get('#login-button').click()

      cy.contains('user1 is logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('user1')
      cy.get('#password').type('wrong password')
      cy.get('#login-button').click()

      cy.get('.msg').should('contain', 'Wrong username or password.')
      cy.get('.msg').should('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({
        username:'user1',password:'password'
      })
    })

    it('A blog can be created', function() {
      cy.contains('new Blog').click()

      cy.get('#title').type('Test Blog')
      cy.get('#author').type('Test User')
      cy.get('#url').type('example.com')

      cy.contains('Submit').click()
      cy.contains('Test Blog by Test User is added')
    })
    describe('and a blog exists', function () {
      beforeEach(function () {
        cy.createBlog({
          title:'default',
          author:'default',
          url:'example.com',
          likes:'1'
        })
      })

      it('A blog can be liked', function() {
        cy.contains('view').click()
        cy.contains('like').click()
        cy.contains('Likes : 2')
      })

      it('A blog can be deleted by its creator', function() {
        cy.contains('view').click()
        cy.contains('Created by: user1')
        cy.contains('delete').click()
        cy.get('default by default').should('not.exist')
      })

      it('Cannot delete blog from other user', function() {
        cy.login({ username: 'user2', password: 'password' })
        cy.contains('user2 is logged in')
        cy.contains('view').click()
        cy.contains('Created by: user1')
        cy.get('delete').should('not.exist')
      })
    })
    describe('and several blog exists', function () {
      beforeEach(function () {
        cy.createBlog({
          title:'Blog1',
          author:'default',
          url:'example.com',
          likes:'3'
        })
        cy.createBlog({
          title:'Blog2',
          author:'default',
          url:'example.com',
          likes:'2'
        })
        cy.createBlog({
          title:'Blog3',
          author:'default',
          url:'example.com',
          likes:'4'
        })
      })

      it('Blogs are ranked by number of likes', function() {
        cy.get('.blog').eq(0).should('contain', 'Blog3')
        cy.get('.blog').eq(1).should('contain', 'Blog1')
        cy.get('.blog').eq(2).should('contain', 'Blog2')
      })
    })
  })
})