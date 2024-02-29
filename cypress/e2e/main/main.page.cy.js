import { MainPage } from "../../pages/MainPage";
import { homePageURL } from "../../config/endpoints.config";

context('Main page', () => {

    const mainPage = new MainPage(homePageURL);
    const titleText = 'QA.live.study';

    beforeEach(() => {
        mainPage.open();
    })

    it('Checking the display of page elements', () => {
        mainPage.getByText(titleText).should('have.length', 1);
    });
});