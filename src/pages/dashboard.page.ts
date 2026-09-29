import { Locator, Page } from "@playwright/test";

export class DashBoard {
    page: Page;
    blockGlance: Locator;
    blockActivity: Locator;
    blockEventAndNew: Locator;

    constructor(page: Page) {
        this.page = page;
        this.blockGlance = this.page.getByRole("heading", { level: 2, name: "At a Glance" });
        this.blockActivity = this.page.getByRole("heading", { level: 2, name: "Activity" });
        this.blockEventAndNew = this.page.getByRole("heading", { level: 2, name: "WordPress Events and News" });
    }
}