class Page {
  constructor(user) {
    if (user) {
      localStorage.setItem("jwt", user.token);
    }

    cy.server();
  }

  visit = () => {
    cy.visit(this.URL);
  };

  should = (...attrs) => {
    cy.get("html").should(...attrs);
  };
}

export default Page;
