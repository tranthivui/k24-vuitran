import { ProductDetailPage } from "../src/pages/product-page.page";
import { test } from "../src/fixtures/product-detail.fixture"
import { expect } from "@playwright/test";
import { HomePage } from "../src/pages/home-page.page";

test.describe("Verify product detail page", async () => {
    const testData = {
        url: "https://e-commerce-dev.betterbytesvn.com/",
        productName: "FullStack Automation QA với Playwright Typescript",
        salePrice: "Current price is: 1.749.000 $.",
        originPrice: "Original price was: 2.499.000 $.",
        descProduct: "Khoá học automation test từ chưa biết gì, với Playwright TypeScript",
        review: {
            reviewText: "Khoa hoc chat luong",
            rating: 5,
            name: "vuitest0929",
            email: "vuitest09279@test.com",
            status: "Your review is awaiting approval"
        }
    }
    test.beforeEach("Go to detail page", async ({ homePage, productDetail }) => {
        await test.step("Go to home page", async () => {
            await productDetail.page.goto(testData.url);
        })
        await test.step("Go to detail page", async () => {
            await homePage.search(testData.productName)
        })
    })

    test("Verify product page hien thi dung voi thong tin san pham", async ({ productDetail }) => {
        //Verify tan san pham
        await expect(productDetail.productName).toHaveText(testData.productName);
        //Verify gia doc
        await expect(productDetail.originPrice).toHaveText(testData.originPrice);
        //Verify gia khuyen mai
        await expect(productDetail.salePrice).toHaveText(testData.salePrice);
        //Verfy mo ta
        await expect(productDetail.desProduct).toHaveText(testData.descProduct);
        //Verify con hang
        await expect(productDetail.addProductBtn).toBeVisible();
        //Verify image loadd success
        const naturalWitdth = await productDetail.img.evaluate(
            (img: HTMLImageElement) => img.naturalWidth
        )
        expect(naturalWitdth).toBeGreaterThan(0);
        //Verify co the them san pham vao gio hang
        productDetail.addProduct();

        //Verify chau co review nao
        await productDetail.clickReviewTab();
        await expect(productDetail.noReview).toBeVisible();
    })

    test("Verify tinh nang product review hoat dong dung", async ({ productDetail, browser }) => {

        await productDetail.clickReviewTab();
        await test.step("Write write review", async () => {
            await productDetail.writeReview(testData.review.reviewText, testData.review.name, testData.review.email, testData.review.rating);
        })

        await test.step("Verify show review info", async () => {
            await expect(productDetail.getReviewText).toHaveText(testData.review.reviewText);
            await expect(productDetail.name).toHaveValue(testData.review.name);
            await expect(productDetail.email).toHaveValue(testData.review.email);
            await expect(productDetail.getReviewStatus).toHaveText(testData.review.status);
            await expect(productDetail.getRating).toHaveText(testData.review.rating.toString());
        })

        await test.step("Refresh browser still show review", async () => {
            await productDetail.page.waitForTimeout(3_000);
            await productDetail.page.reload();
            await expect(productDetail.getReviewStatus).toHaveText(testData.review.status);
        })

        await test.step("Open new browser-not show review", async () => {
            const newContext = await browser.newContext();
            const newPage = await newContext.newPage();
            const homePage2 = new HomePage(newPage);
            await homePage2.page.goto(testData.url);
            await homePage2.search(testData.productName);
            const productDetail2 = new ProductDetailPage(newPage);
            await expect(productDetail2.noReview).toBeVisible();
            await newPage.waitForTimeout(5_000)
        })
    })
})