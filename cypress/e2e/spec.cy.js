describe('Pizza App', () => {
  it('types name in box', () => {
    cy.visit('http://localhost:3000/pizza')
    cy.get('#name-input')
      .type('Art Vardanyan')
    cy.get('#name-input')
      .should('have.value', 'Art Vardanyan')
  })

  it('checks boxes', () => {
    cy.visit('http://localhost:3000/pizza')
    cy.get('input[type="checkbox"]').each( (checkbox) => {
      cy.wrap(checkbox).check()
    })
    cy.get('input[type="checkbox"]').each( (checkbox) => {
      cy.wrap(checkbox).should('be.checked')
    })
  })

  it('submits the form', () => {
    cy.visit('http://localhost:3000/pizza')

    cy.get('#name-input')
      .type('Art Vardanyan')
    cy.get('#name-input')
      .should('have.value', 'Art Vardanyan')

    cy.get('input[type="checkbox"]').each( (checkbox) => {
      cy.wrap(checkbox).check()
    })
    cy.get('input[type="checkbox"]').each( (checkbox) => {
      cy.wrap(checkbox).should('be.checked')
    })

    cy.get('#size-dropdown')
      .select('medium')

    cy.get('#special-text')
      .click()
      .type('well done')
      
    cy.get('#order-button')
      .should('be.enabled')
      .click()
  })

})