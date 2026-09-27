import { Locator, Page } from "@playwright/test";

export class AdminLoginPage {
    page: Page;
    username: Locator;
    password: Locator;
    rememberMeCb: Locator;
    loginBtn: Locator;
    registerLink: Locator;
    lostPassLink: Locator;
    goToSiteTile: Locator

    constructor(page: Page) {
        this.page = page;
        this.username = this.page.locator("//input[@id='user_login']");
        this.password = this.page.locator("//input[@id='user_pass']");
        this.rememberMeCb = this.page.locator("//input[@id='rememberme']");
        this.loginBtn = this.page.locator("//input[@id='wp-submit']");
        this.registerLink = this.page.locator("//a[@class='wp-login-register']");
        this.lostPassLink = this.page.locator("//a[@class='wp-login-lost-password']");
        this.goToSiteTile = this.page.locator("//p[@id='backtoblog']/a");
    }

    async fillUsername(username: string) {
        await this.username.fill(username);
    }

    async fillPassWord(password: string) {
        await this.password.fill(password);
    }

    async checkRemember() {
        if (!(await this.rememberMeCb.isChecked())) {
            this.rememberMeCb.check();
        }
    }

    async clickLogin() {
        await this.loginBtn.click();
    }

    async clickRegisterLink() {
        await this.registerLink.click();
    }

    async clickLostPasswordLink() {
        await this.lostPassLink.click();
    }

    async clickGotoSiteLink() {
        await this.goToSiteTile.click();
    }



}
