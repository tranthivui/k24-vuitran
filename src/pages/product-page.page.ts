import { expect, Locator, Page } from "@playwright/test";

export class ProductDetailPage {
    page: Page;
    productName: Locator;
    originPrice: Locator;
    salePrice: Locator;
    desProduct: Locator;
    reviewTab: Locator;
    reviewText: Locator;
    name: Locator;
    email: Locator;
    saveNameCkb: Locator
    submitBtn: Locator;
    rating: Locator;
    noReview: Locator;
    addProductBtn: Locator;
    img: Locator;
    reviewStatus: Locator;
    getRating: Locator;
    getReviewText: Locator;
    getReviewStatus: Locator;


    constructor(page: Page) {
        this.page = page;
        this.productName = this.page.getByRole("heading", { level: 1, name: "FullStack Automation QA với Playwright Typescript" });
        this.originPrice = this.page.locator("//p[@class='price']/child::span").nth(0);
        this.salePrice = this.page.locator("//p[@class='price']/child::span").nth(1);
        this.desProduct = this.page.locator("//div[@class='woocommerce-product-details__short-description']/p");
        this.reviewTab = this.page.locator("//li[@id='tab-title-reviews']");
        this.reviewText = this.page.locator("//textarea[@id='comment']");
        this.name = this.page.locator("//input[@id='author']");
        this.email = this.page.locator("//input[@id='email']");
        this.rating = this.page.locator("//p[@class='stars']//descendant::a");
        this.noReview = this.page.locator("//p[@class='woocommerce-noreviews']");
        this.saveNameCkb = this.page.locator("//input[@id='wp-comment-cookies-consent']");
        this.submitBtn = this.page.locator("//input[@id='submit']");
        this.addProductBtn = this.page.locator("//button[@name='add-to-cart']");
        this.img = this.page.locator("//div[@class='woocommerce-product-gallery__wrapper']//descendant::img[@class='zoomImg']");
        this.reviewStatus = this.page.locator("//div[@class='comment-text']//child::em");
        this.getRating = this.page.locator("//div[@class='star-rating']//descendant::strong");
        this.getReviewText = this.page.locator("//div[@class='description']/p");
        this.getReviewStatus = this.page.locator("//em[@class='woocommerce-review__awaiting-approval']")
    }

    async clickReviewTab() {
        await this.reviewTab.click();
    }

    async fillReviewText(reviewText: string) {
        await this.reviewText.fill(reviewText);
    }

    async fillname(name: string) {
        await this.name.fill(name);
    }

    async fillEmail(email: string) {
        await this.email.fill(email);
    }

    async clickSaveName() {
        if (!(await this.saveNameCkb.isChecked())) {
            await this.saveNameCkb.check();
        }
    }

    async clickRating(rate: number) {
        await this.rating.nth(rate - 1).click();
    }

    async addProduct() {
        await this.addProductBtn.click()
    }

    async writeReview(reviewText: string, name: string, email: string, rating: number) {
        await this.fillEmail(email);
        await this.fillname(name);
        await this.fillReviewText(reviewText);
        await this.clickRating(rating);
        await this.clickSaveName();
        await this.submitBtn.click();
    }
}