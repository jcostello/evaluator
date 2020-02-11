import Page from './Page'

class SignInPage extends Page {
  URL = '/sign_in'

  users = []

  givenIHaveAnUser = (user) => {
    this.users.push(user)
  }

  fillCredentials = (email, password) => {
    cy.get('#email')
      .type(email)

    cy.get('#password')
      .type(password)

    const user = this.users.find((u) => u.email == email && u.password == password)

    if (user) {
      cy.route({ url: `/api/users/sign_in`, method: 'POST', status: 200, response: { ...user, token: 'token' } })
    } else {
      cy.route({ url: `/api/users/sign_in`, method: 'POST', status: 405, response: {} })
    }

    cy.get('#submit').click()
  }
}

export default SignInPage
