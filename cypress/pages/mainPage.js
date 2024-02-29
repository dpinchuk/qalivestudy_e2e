import { homePageURL } from "../config/endpoints.config";

const SECTION = 'section';

const mainPage = {
    visit() {
        return cy.visit(homePageURL);
    },

    itself() {
        return cy.get(SECTION);
    },
};

export{ mainPage };