import '../../support/commands';
import { headerPage } from "../../pages/headerPage";

import '../../support/commands';
import { mainPage } from "../../pages/mainPage";

context('Header component', () => {
    beforeEach(() => {
        mainPage.visit();
    })

    it('Checking the display of page elements', () => {
        cy.findAllByText('QA.live.study').should('have.length', 1);
        cy.get('img').should('be.visible');
    });
});