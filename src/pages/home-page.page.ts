import { Locator, Page } from "@playwright/test";

export class HomePage{
    page: Page;
    title: Locator;
    placeHolder: Locator;
    menu: Locator;
    resultRow: Locator;
    searchBtn: Locator;
    listProduct: Locator;
    productName: Locator

    constructor(page: Page){
        this.page=page;
        this.title=this.page.getByRole("heading",{level:1,name:"E-commerce site testing"});
        //xpath: //h1[@class='site-title']
        this.placeHolder=this.page.getByPlaceholder("Search products...");
        //xpath: //input[@placeholder='Search products...']
        this.menu=this.page.locator("//ul[@id='menu-primary-menu']/li");
        this.resultRow=this.page.locator("//p[@class='woocommerce-result-count']");
        this.searchBtn=this.page.locator("//button[@class='header-search-button']");
        this.listProduct=this.page.locator("//ul[contains(@class,'products columns')]/li");
        this.productName=this.listProduct.locator("//h2")
    }

    async inputSearchKeyWord(keyWord: string){
       await this.placeHolder.fill(keyWord);
    }

    async clickSearchBtn(){
        await this.searchBtn.click();
    }

    async search(keyWord: string){
       await this.inputSearchKeyWord(keyWord);
       await this.clickSearchBtn()
    }
}