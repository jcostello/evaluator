import FormPage from "./../../pages/FormPage";
import formFactory from "./../../../../test/factories/formFactory";
import userFactory from "./../../../../test/factories/userFactory";

describe("Edit Form", () => {
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

  describe("When all fields are filled", () => {
    it("Shows the created form in the form list", () => {
      page.clickEditForm(form.name);

      page.fillFormInformation({ name: "Updated Name" });
      page.submitForm();

      page.formList().should("not.contain", form.name);
      page.formList().should("contain", "Updated Name");
      page.should("contain", "Form updated successfully");
    });
  });
});
