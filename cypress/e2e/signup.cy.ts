import { Chance } from 'chance';

const chance = new Chance();
const email = chance.email();
const password = 'Cypress123';

describe('Sign up user', () => {
  beforeEach(() => {
    cy.visit('localhost:3000');
  });

  it('successfuly sign up user', () => {
    cy.get('a').contains('Sign In').click();
    cy.get('a').contains('Sign Up').click();

    cy.url().should('include', 'sign-up');

    cy.get('input[type=email]').type(email);
    cy.get('#password').type(password);
    cy.get('#confirm').type(password);

    cy.get('button[type=submit]').click();

    cy.wait(1000);

    cy.url().should('eq', 'http://localhost:3000/');
    cy.getCookie('uid').should('exist');
  });

  it('shows error that user already exist', () => {
    const email = 'test@test.com';

    cy.get('a').contains('Sign In').click();
    cy.get('a').contains('Sign Up').click();

    cy.url().should('include', 'sign-up');
    cy.get('input[type=email]').type(email);
    cy.get('#password').type(password);
    cy.get('#confirm').type(password);

    cy.get('button[type=submit]').click();

    cy.get('p').should('contain', 'E-mail already in use!');
  });

  it('password do not match', () => {
    cy.get('a').contains('Sign In').click();
    cy.get('a').contains('Sign Up').click();

    cy.url().should('include', 'sign-up');
    cy.get('input[type=email]').type(email);
    cy.get('#password').type(password);
    cy.get('#confirm').type('Aha123');

    cy.get('button[type=submit]').click();

    cy.get('p').should('contain', 'Passwords do not match!');
  });
});
