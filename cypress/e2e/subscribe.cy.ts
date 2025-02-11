describe('Newsletter Subscribe Form', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  })

  it('Allows user to subscribe to the email list', () => {
    const validEmail = 'tom@aol.com'
    cy.getByData('email-input').type(validEmail);
    cy.getByData('submit-button').click();
    cy.getByData('success-message').should('exist').contains(validEmail);
  })

  it('Does not allow an invalid email address', () => {
    cy.getByData('email-input').type('wrong@');
    cy.getByData('submit-button').click();
    cy.getByData('success-message').should('not.exist');
  })

  it('Users cannot sing up for our newsletter twice', () => {
    const email = 'john@example.com';
    cy.getByData('email-input').type(email);
    cy.getByData('submit-button').click();
    cy.getByData('email-input').type(email);
    cy.getByData('submit-button').click();
    cy.getByData('server-error-message').should('exist').and('have.css', 'color', 'rgb(198, 43, 52)').contains(email);
  });

  it.skip('What happens if the input field is blank and they click the subscribe button?', () => {});
})