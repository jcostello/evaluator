import UserPage from "./../../pages/UserPage";
import userFactory from "./../../../../test/factories/userFactory";

describe("List Users", () => {
  let currentUser, users, page;

  beforeEach(() => {
    currentUser = userFactory.build();
    users = userFactory.buildList(3).concat(currentUser);

    cy.task("seed", {
      collection: "users",
      documents: users
    });

    page = new UserPage(currentUser);

    page.visit();
  });

  it("Lists all the forms in the system", () => {
    users.forEach(user => {
      page.userList().should("contain", user.fullName);
    });
  });
});
