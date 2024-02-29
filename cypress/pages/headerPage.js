const HEADER = 'header';

const headerPage = {
    itself() {
        return cy.get(HEADER);
    },

    headerLogo() {
        return this.itself().get('a img');
    },

    headerLogoLink() {
        return this.itself().get('a');
    },

    headerNavCourses() {
        return this.itself().get('nav').eq(0).find('li').eq(0);
    },

    headerNavDictionaries() {
        return this.itself().get('nav').eq(0).find('li').eq(1);
    },

    headerNavServices() {
        return this.itself().get('nav').eq(0).find('li').eq(2);
    },

    headerNavAboutUs() {
        return this.itself().get('nav').eq(0).find('li').eq(3);
    },

    headerNavRegistration() {
        return this.itself().get('nav').eq(1).find('li').eq(0);
    },

    headerNavLogin() {
        return this.itself().get('nav').eq(1).find('li').eq(1);
    },

}

export { headerPage };