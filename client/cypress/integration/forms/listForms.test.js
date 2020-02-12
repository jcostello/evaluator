import FormPage from "./../../pages/FormPage";
import userFactory from "./../../../../test/factories/userFactory";
import formFactory from "./../../../../test/factories/formFactory";

describe("List Forms", () => {
  let user, page, forms;

  beforeEach(() => {
    user = userFactory.build();
    forms = formFactory.buildList(3);

    cy.task("seed", { collection: "users", documents: user });
    cy.task("seed", { collection: "forms", documents: forms });

    page = new FormPage(user);

    page.visit();
  });

  it("Lists all the forms in the system", () => {
    forms.forEach(form => {
      page.formList().should("contain", form.name);
    });
  });
});
