import { expect } from "@playwright/test";
import { test } from "../src/fixtures/page.fixture";


test.describe("Verify UI trang authentication", async () => {
    const testData = {
        url: "https://e-commerce-dev.betterbytesvn.com/wp-admin",
        registerLink: "https://e-commerce-dev.betterbytesvn.com/wp-login.php?action=register",
        lostPassLink: "https://e-commerce-dev.betterbytesvn.com/wp-login.php?action=lostpassword",
        goToSiteLink: "https://e-commerce-dev.betterbytesvn.com/"
    }
    test("Verify UI trang authentication", async ({ dashBoard, adminLoginPage }) => {
        await test.step("Go to admin login page", async () => {
            await dashBoard.page.goto(testData.url);
        })
        await test.step("Verify UI", async () => {
            //Verify UI
            await expect((adminLoginPage).username).toBeEnabled();
            await expect(adminLoginPage.password).toBeEnabled();
            await expect(adminLoginPage.rememberMeCb).toBeEnabled();
            await expect(adminLoginPage.loginBtn).toBeEnabled();
            await expect(adminLoginPage.registerLink).toBeVisible();
            await expect(adminLoginPage.lostPassLink).toBeVisible();
            await expect(adminLoginPage.goToSiteTitleLink).toBeVisible();
            //Verify click registerlink
            await expect(adminLoginPage.registerLink).toHaveAttribute("href", "https://e-commerce-dev.betterbytesvn.com/wp-login.php?action=register")
            //Verify click lostpass
            await expect(adminLoginPage.lostPassLink).toHaveAttribute("href", "https://e-commerce-dev.betterbytesvn.com/wp-login.php?action=lostpassword")
            //Verify click lostpass
            await expect(adminLoginPage.goToSiteTitleLink).toHaveAttribute("href", "https://e-commerce-dev.betterbytesvn.com/")
        })
    })
})

test.describe("Verify login function", async () => {
    const testData = {
        urlLogin: "https://e-commerce-dev.betterbytesvn.com/wp-login.php",
        urlAdminPage: "https://e-commerce-dev.betterbytesvn.com/wp-admin/",
        user: [
            {
                username: "tranthivui274-k24",
                password: "Vuitrank24@"
            },
            {
                username: "tranthivui274-k241",
                password: "Vuitrank24@1"
            },
            {
                username: "tranthivui274-k24",
                password: "Vuitrank24@1"
            }
        ],
        block: ["At a Glance", "Activity", "WordPress Events and News"],
        errorMess: {
            uerNotExsist:(username:string):string=> `Error: The username ${username} is not registered on this site. If you are unsure of your username, try your email address instead.`,
            inccorectPass: "Error: The password you entered for the username tranthivui274-k24 is incorrect. Lost your password?"
        }
    };

    test.beforeEach("Go to login page", async ({ adminLoginPage }) => {
        await test.step("Go to login page", async () => {
            await adminLoginPage.page.goto(testData.urlLogin);

        })
    });

    test("Login successfull with correct user and pass", async ({ adminLoginPage, dashBoard }) => {
        await test.step("Fill username and pass", async () => {
            await adminLoginPage.login(testData.user[0].username, testData.user[0].password);
        })
        await test.step("Verify login success", async () => {
            //Verify URL: 
            await expect(adminLoginPage.page).toHaveURL(testData.urlAdminPage);
            //Verify hien thi block ["At a Glance", "Activity", "WordPress Events and News"]
            await expect(dashBoard.blockGlance).toBeVisible();
            await expect(dashBoard.blockActivity).toBeVisible();
            await expect(dashBoard.blockEventAndNew).toBeVisible();
        })

    })

    test("Login with user not exsits", async ({ adminLoginPage, dashBoard }) => {

        await test.step("Fill username and pass", async () => {
            await adminLoginPage.login(testData.user[1].username, testData.user[1].password);
        })
        await test.step("Verify error message", async () => {
            //Verify URL: 
            await expect(adminLoginPage.page).toHaveURL(testData.urlLogin);
            //Verify error message
            console.log(testData.errorMess.uerNotExsist);
            await expect(adminLoginPage.errorMess).toHaveText(testData.errorMess.uerNotExsist(testData.user[1].username));
        })
    })

        test("Login with incorrect pass", async ({ adminLoginPage, dashBoard }) => {

        await test.step("Fill username and pass", async () => {
            await adminLoginPage.login(testData.user[2].username, testData.user[2].password);
        })
        await test.step("Verify error message", async () => {
            //Verify URL: 
            await expect(adminLoginPage.page).toHaveURL(testData.urlLogin);
            //Verify error message
            await expect(adminLoginPage.errorMess).toHaveText(testData.errorMess.inccorectPass);
            //Verify click lostpass
            await expect(adminLoginPage.goToSiteTitleLink).toHaveAttribute("href", "https://e-commerce-dev.betterbytesvn.com/")
        })
    })
})