import FormPage from "./../../pages/FormPage";
import userFactory from "./../../../../test/factories/userFactory";

describe("Create Form", () => {
  let user, page;

  beforeEach(() => {
    user = userFactory.build();

    cy.task("seed", { collection: "users", documents: user });

    page = new FormPage(user);

    page.visit();
  });

  describe("When all fields are filled", () => {
    it("Shows the created form in the form list", () => {
      page.clickNewFormLink();

      page.fillFormInformation({ name: "Test" });
      page.submitForm();

      page.formList().should("contain", "Test");
      page.should("contain", "Form created successfully");
    });
  });

  describe("When a field is missing", () => {
    it("Shows a validation error", () => {
      page.clickNewFormLink();

      page.fillFormInformation({});
      page.submitForm();

      page.should("contain", "Name is required");
    });
  });
});
