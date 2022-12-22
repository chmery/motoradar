export {};

Cypress.Commands.add('login', (email: string, password: string) => {
  cy.visit('localhost:3000/sign-in');

  cy.get('input[type=email]').type(email);
  cy.get('input[type=password]').type(password);
  cy.get('button[type=submit]').click();

  cy.url().should('eq', 'http://localhost:3000/');
  cy.getCookie('uid').should('exist');
});
