import { BasePage } from "./BasePage";

const HEADER = 'header';

export class HeaderPage extends BasePage {
    constructor(url) {
        super(url);
    };

    itself() {
        return cy.get(HEADER);
    };

    headerLogo() {
        return this.itself().find('a img');
    };

    headerLogoLink() {
        return this.itself().find('a');
    };

    headerNavCourses() {
        return this.itself().get('nav').children('ul').eq(0).find('li').eq(0);
    };

    headerNavDictionaries() {
        return this.itself().get('nav').children('ul').eq(0).find('li').eq(1);
    };

    headerNavServices() {
        return this.itself().get('nav').children('ul').eq(0).find('li').eq(2);
    };

    headerNavAboutUs() {
        return this.itself().get('nav').children('ul').eq(0).find('li').eq(3);
    };

    headerNavRegistration() {
        return this.itself().get('nav').children('ul').eq(1).find('li').eq(0);
    };

    headerNavLogin() {
        return this.itself().get('nav').children('ul').eq(1).find('li').eq(1);
    };

}