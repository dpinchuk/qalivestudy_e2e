import { mainPage } from "../../pages/mainPage";
import '@testing-library/cypress/add-commands';

context('Main page', () => {
    beforeEach(() => {
        mainPage.visit();
    })

    it('should ', () => {
        cy.findAllByText('QA.live.study').should('have.length', 1);
        cy.get('img').should('be.visible');
    });
});