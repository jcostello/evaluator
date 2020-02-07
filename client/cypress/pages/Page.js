class Page {
  constructor() {
    cy.server()
  }

  visit = () => {
    cy.visit(this.URL)
  }

  should = (...attrs) => {
    cy.get('html').should(...attrs)
  }
}

export default Page
