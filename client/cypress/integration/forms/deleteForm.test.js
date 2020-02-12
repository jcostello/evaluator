import FormPage from "./../../pages/FormPage";
import formFactory from "./../../../../test/factories/formFactory";
import userFactory from "./../../../../test/factories/userFactory";

describe("Delete Form", () => {
  let user, page, form;

  beforeEach(() => {
    user = userFactory.build();
    form = formFactory.build();

    const forms = formFactory.buildList(3).concat(form);

    cy.task("seed", { collection: "users", documents: user });
    cy.task("seed", { collection: "forms", documents: forms });

    page = new FormPage(user);

    page.visit();
  });

  describe("When confirm delete", () => {
    it("Shows remove the form from the list", () => {
      page.clickDeleteForm(form.name);
      cy.get(".ant-popover")
        .contains("Yes")
        .click();

      page.formList().should("not.contain", form.name);

      page.should("contain", "Form deleted successfully");
    });
  });

  describe("When cancel the deletion", () => {
    it("Shows leave the form in the list", () => {
      page.clickDeleteForm(form.name);
      cy.get(".ant-popover")
        .contains("Cancel")
        .click();

      page.formList().should("contain", form.name);

      page.should("not.contain", "Form deleted successfully");
    });
  });
});
