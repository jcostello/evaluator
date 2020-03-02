import TeamPage from "./../../pages/teamPage";
import userFactory from "./../../../../test/factories/userFactory";
import teamFactory from "./../../../../test/factories/teamFactory";

describe("List Teams", () => {
  let currentUser, teams, users, page;

  beforeEach(() => {
    currentUser = userFactory.build();
    users = userFactory.buildList(3);
    teams = teamFactory.buildList(3, { members: users.map(user => user._id) });

    cy.task("seed", {
      collection: "teams",
      documents: teams
    });

    cy.task("seed", {
      collection: "users",
      documents: users.concat(currentUser)
    });

    page = new TeamPage(currentUser);

    page.visit();
  });

  it("Lists all the forms in the system", () => {
    teams.forEach(team => {
      page.teamList().should("contain", team.name);
    });
  });
});
