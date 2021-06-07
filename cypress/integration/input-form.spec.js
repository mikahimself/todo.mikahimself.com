describe('Input form', () => {
    it('Opens the page', () => {
        cy.visit('http://localhost:3000');
    })

    it('Contains Add button', () => {
        cy.visit('http://localhost:3000')
        cy.get('[id=add-todo-button]')
        .should('exist');
    })

    it('Opens Add dialog when Add button is clicked', () => {
        cy.visit('http://localhost:3000')
        cy.get('[id=add-todo-button]')
        .click()
        cy.get('[aria-labelledby=add-dialog]')
        .should('exist')
    })
})