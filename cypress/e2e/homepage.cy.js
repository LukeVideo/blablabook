describe('Homepage E2E Test', () => {
    it('should have the first h2 element with text "Les 5 derniers livres ajoutés :"', () => {
      // Visit the index page
      cy.visit('/index');
  
      // Check that the first h2 element exists and has the exact text
      cy.get('h2')
        .first()
        .should('exist')
        .and('have.text', 'Les 5 derniers livres ajoutés :');
    });
  });

  describe('Homepage E2E Test', () => {
    it('should have the first h2 with specific text and 5 article elements with class book_thumbnail', () => {
      // Visit the index page
      cy.visit('/index');
  
      // Check that the first h2 element exists and has the exact text
      cy.get('h2')
        .first()
        .should('exist')
        .and('have.text', 'Les 5 derniers livres ajoutés :');
  
      // Check that there are exactly 5 article elements with class book_thumbnail
      cy.get('article.book_thumbnail')
        .should('have.length', 5);
    });
  });