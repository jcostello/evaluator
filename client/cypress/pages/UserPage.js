// import faker from "faker";
import Page from "./Page";

class UserPage extends Page {
  URL = "/users";

  userList = () => {
    return cy.get("#user-list");
  };

  // clickNewFormLink = () => {
  //   cy.get("#new-form").click();
  // };

  // fillFormInformation = ({ name }) => {
  //   if (name) {
  //     cy.get("input[name='name']")
  //       .clear()
  //       .type(name);
  //   }

  //   cy.get("input[name='questions.0.question']")
  //     .clear()
  //     .type(faker.lorem.sentence());

  //   cy.get(".ant-select-selection__rendered").click();
  //   cy.contains("Text Answer").click();
  // };

  // clickEditForm = name => {
  //   cy.contains(name)
  //     .parents(".ant-table-row")
  //     .find("#edit")
  //     .click();
  // };

  // clickDeleteForm = name => {
  //   cy.contains(name)
  //     .parents(".ant-table-row")
  //     .find("#delete")
  //     .click();
  // };

  // submitForm = () => {
  //   cy.get("#submit").click();
  // };
}

export default UserPage;
