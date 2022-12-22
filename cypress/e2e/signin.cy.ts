/// <reference types="cypress" />

export {};

describe('sign in user', () => {
  beforeEach(() => {
    cy.visit('localhost:3000/');
  });

  it('successfuly sign in user', () => {
    cy.login('cypress@cypress.com', 'Cypress123');
  });
});
