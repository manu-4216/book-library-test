describe('Main use cases', () => {
    it('Successfully loads', () => {
        cy.visit('/');
    });

    it('Has a list of 7 books', () => {
        cy.visit('/');
        cy
            .get('.List-Books')
            .find('.Book')
            .should('have.length', 7);
    });

    it('Adds 2 books to  the cart', () => {
        cy.get('.Book-Action > button').each(function($el, index, $list) {
            if (index < 2) {
                $el.click();
            }
        });

        cy
            .get('.Book-Action > .Books-Filtered-Confirmation')
            .should('have.length', 2);
        cy.get('.Header-Cart-Count').should('have.text', '2');
    });

    it('Has 2 books on the "Cart" page', () => {
        cy.get('.Book-Action:first > a').click();

        cy.location('pathname').should('include', '/cart');

        cy
            .get('.Cart-Body')
            .find('.Book')
            .should('have.length', 2);
    });

    it('Has a total price', () => {
        cy.get('.Price-Row-Final > .Price-Row-Value').contains('€');
    });

    it('Removes an item from the cart', () => {
        cy.get('.Book-Action:last > .button').click();

        cy
            .get('.Cart-Body')
            .find('.Book')
            .should('have.length', 1);
    });

    it('Displays empty list in cart when no item', () => {
        cy.get('.Book-Action:last > .button').click();

        cy.get('.Header-Cart-Count').should('have.text', '0');

        cy.get('.Cart-Body').contains('Your cart is empty');
    });

    it('Goes back to the main page', () => {
        cy.get('.Header-Title').click();

        cy.location('pathname').should('equal', '/');

        cy.get('.List-Books').should('not.contain', 'Added to cart');
    });

    it('Searches books', () => {
        cy.get('.Search-Input > input').type('so');

        cy
            .get('.List-Books')
            .find('.Book')
            .should('have.length', 2);
    });
});
