/// <reference types="cypress" />

export {};

describe('sign in user', () => {
  it('successfuly sign in user', () => {
    cy.login('cypress@cypress.com', 'Cypress123');
  });

  it('error that user not exist', () => {
    cy.visit('localhost:3000/sign-in');

    cy.get('input[type=email]').type('askjdajksdjansj@asdasdasd.com');
    cy.get('input[type=password]').type('Aha123');
    cy.get('button[type=submit]').click();

    cy.get('p').should('contain', 'User not found!');
  });

  it('invalid email error', () => {
    cy.visit('localhost:3000/sign-in');

    cy.get('input[type=email]').type('askjdajksdjansj');
    cy.get('input[type=password]').type('Aha123');
    cy.get('button[type=submit]').click();

    cy.get('p').should('contain', 'Invalid e-mail!');
  });

  it('Invalid password', () => {
    cy.visit('localhost:3000/sign-in');

    cy.get('input[type=email]').type('cypress@cypress.com');
    cy.get('input[type=password]').type('aha');
    cy.get('button[type=submit]').click();

    cy.get('p').should('contain', 'Wrong password!');
  });
});
