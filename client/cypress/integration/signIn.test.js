import SignInPage from '../pages/SignInPage'
import userFactory from '../../../tests/factories/usersFactory'

describe('Sign In', () => {
  let page
  let user

  beforeEach(() => {
    page = new SignInPage()
    user = userFactory.build()

    page.givenIHaveAnUser(user)
    page.visit()
  })

  describe('When the email and password match', () => {
    it('redirects to the home page', () => {
      page.fillCredentials(user.email, user.password)

      cy.location('pathname').should('eq', '/')
    })
  })

  describe('When invalid email or password', () => {
    it('shows an error message', () => {
      page.fillCredentials(user.email, 'invalid')

      cy.location('pathname').should('eq', '/sign_in')
      cy.contains('Invalid Email or Password').should('be.visible')
    })
  })
})
