import { Locator, Page } from "@playwright/test";

export class AdminLoginPage {
    page: Page;
    username: Locator;
    password: Locator;
    rememberMeCb: Locator;
    loginBtn: Locator;
    registerLink: Locator;
    lostPassLink: Locator;
    goToSiteTitleLink: Locator;
    errorMess: Locator;

    constructor(page: Page) {
        this.page = page;
        this.username = this.page.locator("//input[@id='user_login']");
        this.password = this.page.locator("//input[@id='user_pass']");
        this.rememberMeCb = this.page.locator("//input[@id='rememberme']");
        this.loginBtn = this.page.locator("//input[@id='wp-submit']");
        this.registerLink = this.page.locator("//a[@class='wp-login-register']");
        this.lostPassLink = this.page.locator("//a[@class='wp-login-lost-password']");
        this.goToSiteTitleLink = this.page.locator("//p[@id='backtoblog']/a");
        this.errorMess=this.page.locator("//div[@id='login_error']")
    }

    async fillUsername(username: string) {
        await this.username.fill(username);
    }

    async fillPassWord(password: string) {
        await this.password.fill(password);
    }

    async checkRemember() {
            await this.rememberMeCb.check();
    }

    async clickLoginBtn() {
        await this.loginBtn.click();
    }

    async clickRegisterLink() {
        await this.registerLink.click();
    }

    async clickLostPasswordLink() {
        await this.lostPassLink.click();
    }

    async clickGotoSiteLink() {
        await this.goToSiteTitleLink.click();
    }

    async login(username: string, password: string){
        await this.fillUsername(username);
        await this.fillPassWord(password);
        await this.checkRemember();
        await this.clickLoginBtn();
    }
}
