// https://docs.cypress.io/api/introduction/api.html

describe("Loading Page", () => {
  it("should render cubes", () => {
    cy.visit("/loading");
    cy.get("[data-cy=cubes]").should("have.class", "inner");
  });
});

describe("Messages Page", () => {
  it("should render the title", () => {
    cy.visit("/messages");
    cy.contains("div", "Scheduled Messages");
  });
});

describe("New Message Page", () => {
  it("should render the title", () => {
    cy.visit("/messages/new");
    cy.contains("div", "New Message");
  });

  it("should render Select Contacts text", () => {
    cy.visit("/messages/new");
    cy.contains("h1", "Select Contacts");
  });

  it("should render Schedule text", () => {
    cy.visit("/messages/new");
    cy.contains("h1", "Schedule");
  });

  it("should render Content text", () => {
    cy.visit("/messages/new");
    cy.contains("h1", "Content");
  });

  it("should render send now button", () => {
    cy.visit("/messages/new");
    cy.contains("span", "Send Now!");
  });
});
