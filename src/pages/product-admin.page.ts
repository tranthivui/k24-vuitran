import { expect, Locator, Page } from "@playwright/test";

export class ProductAdmin {
    page: Page;
    productLink: Locator;
    addProductbtn: Locator;
    productName: Locator;
    productDesc: Locator;
    productData: Locator;
    productSortDes: Locator;
    productDataArea: Locator;
    productSortDescArea: Locator;
    productImgArea: Locator;
    productGalleryArea: Locator;
    productCategoryArea: Locator;
    productTagsArea: Locator;
    productBrandscArea: Locator;
    productPublishArea: Locator;
    publishBtn: Locator;
    //Menu Product data
    vitual: Locator;
    downloadAble: Locator;
    generalLink: Locator;
    shippingLink: Locator;
    inventoryLink: Locator;
    linkedLink: Locator;
    attributesLink: Locator;
    advancedLink: Locator;
    //Menu Product data - General
    regularPrice: Locator;
    salePrice: Locator;
    taxStatus: Locator;
    taxClass: Locator;
    optionProductData: Locator;
    //Menu Product data - Inventory
    SKU: Locator;
    productIdentifier: Locator;
    stockManager: Locator;
    inStock: Locator;
    outStock: Locator;
    onBackorder: Locator;
    soldIndividually: Locator;
    //Menu Product data - Shipping data
    weight: Locator;
    length: Locator;
    width: Locator;
    height: Locator;
    shippingClass: Locator;
    //Menu Product data - Linked product
    upSells: Locator;
    crossSells: Locator;
    //Menu Product data - Advanced
    purchaseNote: Locator;
    menuOrder: Locator;
    enableReview: Locator;
    avaibaleForPOS: Locator;
    //Menu Product data - Attributes
    attributeName: Locator;
    attributeValue: Locator;
    visibleOnPage: Locator;
    //Add product success
    messageSuccess: Locator;
    viewProduct: Locator;
    //Delete product
    listProductName: Locator;
    titleProduct: Locator;

    constructor(page: Page) {
        this.page = page;
        this.productLink = this.page.locator(".wp-menu-name").filter({ hasText: "Products" });
        this.addProductbtn = this.page.locator(".wrap").getByRole("link", { name: "Add new product" });
        //Prouct data totalrial 
        this.productName = this.page.getByRole("textbox", { name: "Product name" });
        this.productDesc = this.page.frameLocator("#content_ifr").locator("#tinymce");
        this.productData = this.page.locator("#product-type");
        this.productSortDes = this.page.frameLocator("#excerpt_ifr").locator("#tinymce");
        this.publishBtn = this.page.getByRole("button", { name: "Publish" });
        //Some product Area
        this.productDataArea = this.page.locator("#woocommerce-product-data");
        this.productSortDescArea = this.page.locator("#postexcerpt");
        this.productPublishArea = this.page.locator("#submitdiv");
        this.productImgArea = this.page.locator("#postimagediv");
        this.productGalleryArea = this.page.locator("#woocommerce-product-images");
        this.productCategoryArea = this.page.locator("#product_catdiv");
        this.productTagsArea = this.page.locator("#tagsdiv-product_tag");
        this.productBrandscArea = this.page.locator("#product_branddiv");
        //Menu Product data
        this.vitual = this.page.getByRole("checkbox", { name: "Virtual" });
        this.downloadAble = this.page.getByRole("checkbox", { name: "Downloadable" });
        this.optionProductData = this.productData.locator("option");
        //Menu Product data - General
        this.generalLink = this.page.getByRole("link", { name: "General" });
        this.regularPrice = this.page.getByLabel("Regular price ($) (ex. tax)");
        this.salePrice = this.page.getByLabel("Sale price ($) (ex. tax)");
        this.taxStatus = this.page.locator("#_tax_status");
        this.taxClass = this.page.locator("#_tax_class");
        //Menu Product data - Inventory
        this.inventoryLink = this.page.getByRole("link", { name: "Inventory" });
        this.SKU = this.page.getByRole("textbox", { name: "SKU" });
        this.productIdentifier = this.page.getByRole("textbox", { name: "GTIN, UPC, EAN, or ISBN" });
        this.stockManager = this.page.getByRole("checkbox", { name: "Stock management" });
        this.inStock = this.page.getByRole("radio", { name: "In stock" });
        this.outStock = this.page.getByRole("radio", { name: "Out of stock" });
        this.onBackorder = this.page.getByRole("radio", { name: "On backorder" });
        this.soldIndividually = this.page.getByRole("checkbox", { name: "Sold individually" });
        //Menu Product data - Shipping
        this.shippingLink = this.page.getByRole("link", { name: "Shipping" });
        this.weight = this.page.getByRole("textbox", { name: "Weight (kg)" });
        this.length = this.page.getByPlaceholder("Length");
        this.width = this.page.getByPlaceholder("Width");
        this.height = this.page.getByPlaceholder("Height");
        this.shippingClass = this.page.getByRole("combobox", { name: "Shipping class" });
        //Menu Product data - Linked Products
        this.linkedLink = this.page.getByRole("link", { name: "Linked Products" });
        this.upSells = this.page.locator("p").filter({ has: this.page.getByLabel("Upsells") });
        this.crossSells = this.page.locator("p").filter({ has: this.page.getByLabel("Cross-sells") });
        //Menu Product data - Attibutes
        this.attributesLink = this.page.locator(".attribute_options.attribute_tab").locator("a");
        this.attributeName = this.page.getByPlaceholder("e.g. length or weight");
        this.attributeValue = this.page.getByPlaceholder("Enter some descriptive text. Use “|” to separate different values.");
        this.visibleOnPage = this.page.getByRole("checkbox", { name: "Visible on the product page" });
        //Menu Product data - Advanced
        this.advancedLink = this.page.getByRole("link", { name: "Advanced" });
        this.purchaseNote = this.page.getByRole("textbox", { name: "Purchase note" });
        this.menuOrder = this.page.locator("#menu_order");
        this.enableReview = this.page.getByRole("checkbox", { name: "Enable reviews" });
        this.avaibaleForPOS = this.page.getByRole("checkbox", { name: "Available for POS" });
        //Add product success
        this.messageSuccess = this.page.locator(".notice.notice-success.is-dismissible.updated").locator("p");
        this.viewProduct = this.page.locator(".notice.notice-success.is-dismissible.updated").locator("a");
        //List product
        this.listProductName = this.page.locator(".name.column-name.has-row-actions.column-primary");
        this.titleProduct = this.page.locator(".product_title.entry-title");
    }

    async gotoAddProductMenu() {
        await this.productLink.click();
    }

    async clickAddnewProduct() {
        await this.addProductbtn.click();
    }

    async closeArea(area: Locator, x: number, y: number) {
        const showData = await area.getAttribute("class");
        if (showData != "postbox closed") {
            await area.click({ position: { x: x, y: y } });
        }
    }
    async expandArea(area: Locator, x: number, y: number) {
        const showData = await area.getAttribute("class");
        if (showData == "postbox closed") {
            await area.click({ position: { x: x, y: y } });
        }
    }

    async clickDataMenu(link: Locator) {
        await link.click();
    }

    async fillProductName(productName: string) {
        await this.productName.fill(productName);
    }

    async chooseProductType(productType: string) {
        await this.productData.selectOption(productType);
    }

    async clickVirtual() {
        if (!(await this.vitual.isChecked())) {
            await this.vitual.click();
        }
    }

    async setRegularPrice(regularPrice: number) {
        await this.regularPrice.fill(regularPrice.toString());
    }

    async setSalePrice(salePrice: number) {
        await this.salePrice.fill(salePrice.toString());
    }

    async fillDescription(desc: string) {
        await this.productDesc.fill(desc);
    }

    async clickPublish() {
        await this.publishBtn.click();
    }

    async fillProductInfo(productName: string, productType: string, desc: string, regularPrice: number, salePrice: number) {
        await this.fillProductName(productName);
        await this.chooseProductType(productType);
        await this.fillDescription(desc);
        await this.clickVirtual();
        await this.setRegularPrice(regularPrice);
        await this.setSalePrice(salePrice);
        await this.clickPublish();
    }

    async clickViewProduct() {
        await this.viewProduct.click();
    }

    getProduct(name: string): Locator {
        return this.listProductName.filter({ hasText: `${name}` });
    }

    async deleteProduct(product: Locator) {
        await product.hover();
        const deleteProductBtn = product.getByRole("link", { name: /Trash/ });
        await deleteProductBtn.click();
    }
}