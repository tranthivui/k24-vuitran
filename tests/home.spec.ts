import { expect } from "@playwright/test"
import { test } from "../src/fixtures/home-page.fixture"
import { HomePage } from "../src/pages/home-page.page"

test.describe("Verified Home Page", async () => {
  const testData = {
    url: "https://e-commerce-dev.betterbytesvn.com/",
    title: "E-commerce site testing",
    menu: ["Trang chủ", "Danh sách khoá học", "Blog"],
    searchKey: "ISTQB",
    totalProduct: 5
  }
  test.beforeEach("Go to home page", async ({ page }) => {
    console.log("home before each")
    await test.step("Go to home page", async () => {
      await page.goto(testData.url);
    })
  })

  test("Kiem tra home page hien thi thanh cong", async ({ homePage }) => {
    await expect(homePage.title).toHaveText(testData.title);
    await expect(homePage.placeHolder).toBeVisible();
    for (let i = 0; i < 3; i++) {
      await expect(homePage.menu.nth(i)).toHaveText(testData.menu[i]);
    }
  })

  test("Kiem tra tinh nang search hoat dong dung", async ({ homePage }) => {
    homePage.search(testData.searchKey);
    //Hien thi text showing X results
    await expect(homePage.resultRow).toBeVisible();

    //Tong ket qua=X
    await expect(homePage.listProduct).toHaveCount(testData.totalProduct);

    //Tat ca san pham deu chua ISTBQ
    for (let i = 0; i < testData.totalProduct; i++) {
      await expect(homePage.productName.nth(i)).toContainText(testData.searchKey)
    }
  })
})
