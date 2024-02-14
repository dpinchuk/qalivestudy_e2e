import { homePageURL } from "../config/endpoints.config";

const mainPage = {
    visit() {
        return cy.visit(homePageURL);
    }
};

export{ mainPage };