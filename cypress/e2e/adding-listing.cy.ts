import { getNumberWithSpaces } from '../../src/utils/getNumberWithSpaces';

describe('Adding new listing', () => {
  beforeEach(() => {
    cy.login('cypress@cypress.com', 'Cypress123');
  });

  it('add new listing', () => {
    const location = 'Pabianice';
    const model = 'P1';
    const price = '430000';

    cy.get('a').contains('New Listing').click();
    cy.url().should('include', '/new-listing');

    cy.get('input[type=file]').selectFile(
      'cypress/fixtures/images/mclaren.jpg',
      { force: true }
    );

    cy.get('[data-select="Brand"]')
      .should('have.attr', 'data-select', 'Brand')
      .click();
    cy.get('div').contains('McLaren').click();

    cy.get('[data-input="model"]')
      .should('have.attr', 'data-input', 'model')
      .type(model);

    cy.get('[data-select="Production Year"]')
      .should('have.attr', 'data-select', 'Production Year')
      .click();
    cy.get('div').contains('2022').click();

    cy.get('[data-input="mileage"]')
      .should('have.attr', 'data-input', 'mileage')
      .type('4300');

    cy.get('[data-input="power"]')
      .should('have.attr', 'data-input', 'power')
      .type('1000');

    cy.get('[data-select="Gearbox"]')
      .should('have.attr', 'data-select', 'Gearbox')
      .click();
    cy.get('div').contains('Automatic').click();

    cy.get('[data-select="Drivetrain"]')
      .should('have.attr', 'data-select', 'Drivetrain')
      .click();
    cy.get('div').contains('All-wheel drive').click();

    cy.get('[data-select="Fuel Type"]')
      .should('have.attr', 'data-select', 'Fuel Type')
      .click();
    cy.get('div').contains('Hybrid').click();

    cy.get('[data-input="location"]')
      .should('have.attr', 'data-input', 'location')
      .type(location);

    cy.get('[data-input="description"]')
      .should('have.attr', 'data-input', 'description')
      .type(
        'Mega super furka, dość szybka. Czarna strzała, nie da sie dogonić.'
      );

    cy.get('[data-input="price"]')
      .should('have.attr', 'data-input', 'price')
      .type(price);

    cy.get('input[aria-label="Accident-free"]').check();

    cy.get('button[type=submit]').contains('Publish').click();

    // check if listing added
    cy.url().should('include', '/dashboard');

    cy.get('p').contains(location).should('be.visible');
    cy.get('p').contains(model).should('be.visible');
    cy.get('p')
      .contains(`$${getNumberWithSpaces(price)}`)
      .should('be.visible');
  });
});
