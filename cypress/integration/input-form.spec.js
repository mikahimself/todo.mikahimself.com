describe('Input form', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000');
    });

    it('Opens the page', () => {});

    it('Contains Add button', () => {
        cy.get('[id=add-todo-button]')
        .should('exist');
    })

    it('Opens Add dialog when Add button is clicked', () => {
        cy.get('[id=add-todo-button]')
        .click();
        cy.get('[aria-labelledby=add-dialog]')
        .should('exist');
    });
})