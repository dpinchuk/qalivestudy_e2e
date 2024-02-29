import '@testing-library/cypress/add-commands';

export class BasePage {

    constructor(url) {
        this.url = url;
    };

    open() {
        return cy.visit(this.url);
    };

    getByText(text) {
        return cy.findByText(text);
    };

    getItemByText(text, index) {
        return cy.findAllByAltText(text).eq(index);
    };

}