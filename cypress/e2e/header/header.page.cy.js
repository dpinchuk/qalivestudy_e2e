import { HeaderPage } from "../../pages/HeaderPage";
import { homePageURL } from "../../config/endpoints.config";

context('Main page', () => {

    const headerPage = new HeaderPage(homePageURL);

    beforeEach(() => {
        headerPage.open();
    })

    it('Checking the display of page elements', () => {
        headerPage.headerLogo().should('be.visible');
        headerPage.headerLogoLink().then(page => {
            cy.request(page.prop('href'));
        })

        headerPage.headerNavCourses().should('be.visible');
        headerPage.headerNavDictionaries().should('be.visible');
        headerPage.headerNavServices().should('be.visible');
        headerPage.headerNavAboutUs().should('be.visible');

        headerPage.headerNavRegistration().should('be.visible');
        headerPage.headerNavLogin().should('be.visible');
    });
});