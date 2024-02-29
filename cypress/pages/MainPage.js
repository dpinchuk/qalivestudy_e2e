import { BasePage } from "./BasePage";

const SECTION = 'section';

export class MainPage extends BasePage {
    constructor(url) {
        super(url);
    };

    itself() {
        return cy.get(SECTION);
    };

}