import { expect } from "@playwright/test";
import { test } from "../src/fixtures/admin-login.fixture";

test.describe("Verify UI trang authentication", async () => {
    const testData = {
        url: "https://e-commerce-dev.betterbytesvn.com/wp-admin",
        registerLink: "https://e-commerce-dev.betterbytesvn.com/wp-login.php?action=register",
        lostPassLink: "https://e-commerce-dev.betterbytesvn.com/wp-login.php?action=lostpassword",
        goToSiteLink: "https://e-commerce-dev.betterbytesvn.com/"
    }
    test("Verify UI trang authentication", async ({ adminLoginPage }) => {
        await test.step("Go to admin login page", async () => {
            await adminLoginPage.page.goto(testData.url);
        })
        await test.step("Verify UI", async () => {
            //Verify UI
            await expect(adminLoginPage.username).toBeEnabled();
            await expect(adminLoginPage.password).toBeEnabled();
            await expect(adminLoginPage.rememberMeCb).toBeEnabled();
            await expect(adminLoginPage.loginBtn).toBeEnabled();
            await expect(adminLoginPage.registerLink).toBeVisible();
            await expect(adminLoginPage.lostPassLink).toBeVisible();
            await expect(adminLoginPage.goToSiteTile).toBeVisible();
            //Verify click registerlink
            await adminLoginPage.clickRegisterLink();
            await expect(adminLoginPage.page).toHaveURL(testData.registerLink);
            //Verify click lostpass
            await adminLoginPage.page.goto(testData.url);
            await adminLoginPage.clickLostPasswordLink();
            await expect(adminLoginPage.page).toHaveURL(testData.lostPassLink);
            //Verify click lostpass
            await adminLoginPage.page.goto(testData.url);
            await adminLoginPage.clickGotoSiteLink();
            await expect(adminLoginPage.page).toHaveURL(testData.goToSiteLink)
        })
    })
})