import { expect } from "@playwright/test";
import { test } from "../src/fixtures/product-admin.fixture";
import { ProductAdmin } from "../src/pages/product-admin.page";

test.describe("Verify product admin page", async () => {
    const testData = {
        url: {
            login: "https://e-commerce-dev.betterbytesvn.com/wp-login.php",
            //   dashboard: "https://e-commerce-dev.betterbytesvn.com/wp-admin/",
            product: "https://e-commerce-dev.betterbytesvn.com/wp-admin/post-new.php?post_type=product",
            allProduct: "https://e-commerce-dev.betterbytesvn.com/wp-admin/edit.php?post_type=product"
        },
        user: {
            username: "tranthivui274-k24",
            password: "Vuitrank24@"
        },
        productData: ["Simple product", "Grouped product", "External/Affiliate product", "Variable product"],
        product: {
            name: "Tran Thi Vui-K24-Full stack Automation QA voi Playwright TypeScript",
            desc: "San pham tao tu code automation cua hoc vien",
            type: "Simple product",
            regularPrice: 1000,
            salePrice: 850
        },
        addProductSuccessMess: "Product published. View Product",
        clickPosition: [50, 15]
    };
    test.beforeEach("Login admin", async ({ adminLoginPage, productAdmin }) => {
        await test.step("Go to login page", async () => {
            await adminLoginPage.page.goto(testData.url.login);
        });
        await test.step("Login", async () => {
            await adminLoginPage.login(testData.user.username, testData.user.password)
        });
        await test.step("Go to add product menu", async () => {
            await productAdmin.gotoAddProductMenu();
            await productAdmin.clickAddnewProduct();
        })
    })

    test("Verify UI", async ({ productAdmin }) => {
        await test.step("Verify hien thi co day du 9 khoi UI", async () => {
            //Verify Url
            await expect(productAdmin.page).toHaveURL(testData.url.product);
            //Verify product name
            await expect(productAdmin.productName).toBeVisible();
            //Verify product desc
            await expect(productAdmin.productDesc).toBeVisible();
            //Verify product Data
            await expect(productAdmin.productDataArea).toBeVisible();
            //Veriry product sort desc
            await expect(productAdmin.productSortDescArea).toBeVisible();
            //Verify publis
            await expect(productAdmin.productPublishArea).toBeVisible();
            //Verify product img
            await expect(productAdmin.productImgArea).toBeVisible();
            //Verify product gallery
            await expect(productAdmin.productGalleryArea).toBeVisible();
            //Verify product category
            await expect(productAdmin.productCategoryArea).toBeVisible();
            //Verify product tags
            await expect(productAdmin.productTagsArea).toBeVisible();
            //Verify brands
            await expect(productAdmin.productBrandscArea).toBeVisible();
        });

        await test.step("Verify collapsible cua cac khoi", async () => {
            await productAdmin.closeArea(productAdmin.productDataArea, testData.clickPosition[0], testData.clickPosition[1]);
            await expect(productAdmin.productDataArea).toHaveAttribute("class", "postbox closed");

            await productAdmin.closeArea(productAdmin.productSortDescArea, testData.clickPosition[0], testData.clickPosition[1]);
            await expect(productAdmin.productSortDescArea).toHaveAttribute("class", "postbox closed");

            await productAdmin.closeArea(productAdmin.productPublishArea, testData.clickPosition[0], testData.clickPosition[1]);
            await expect(productAdmin.productPublishArea).toHaveAttribute("class", "postbox closed");

            await productAdmin.closeArea(productAdmin.productImgArea, testData.clickPosition[0], testData.clickPosition[1]);
            await expect(productAdmin.productImgArea).toHaveAttribute("class", "postbox closed");

            await productAdmin.closeArea(productAdmin.productGalleryArea, testData.clickPosition[0], testData.clickPosition[1]);
            await expect(productAdmin.productGalleryArea).toHaveAttribute("class", "postbox closed");

            await productAdmin.closeArea(productAdmin.productCategoryArea, testData.clickPosition[0], testData.clickPosition[1]);
            await expect(productAdmin.productCategoryArea).toHaveAttribute("class", "postbox closed");

            await productAdmin.closeArea(productAdmin.productBrandscArea, testData.clickPosition[0], testData.clickPosition[1]);
            await expect(productAdmin.productBrandscArea).toHaveAttribute("class", "postbox closed");

            await productAdmin.closeArea(productAdmin.productTagsArea, testData.clickPosition[0], testData.clickPosition[1]);
            await expect(productAdmin.productTagsArea).toHaveAttribute("class", "postbox closed");
        });

        await test.step("Verify visibillity cua cac field quan trong", async () => {
            //Cac field visible va enable
            await expect(productAdmin.productName).toBeVisible();
            await expect(productAdmin.productName).toBeEnabled();
            await expect(productAdmin.productDesc).toBeVisible();
            await expect(productAdmin.productDesc).toBeEnabled();
            await expect(productAdmin.productData).toBeVisible();
            await expect(productAdmin.productData).toBeEnabled();
            //Verify product data co du 4 options
            await expect(productAdmin.optionProductData).toHaveCount(4);
            for (let i = 0; i < 4; i++) {
                await expect(productAdmin.optionProductData.nth(i)).toHaveText(testData.productData[i]);
            };
            //Verify product data co 2 checkbox Virual and Downloadable
            await expect(productAdmin.vitual).toBeVisible();
            await expect(productAdmin.downloadAble).toBeVisible();
            //Product data: Click tabs and show fiedls detail
            //Click expand product data
            await productAdmin.expandArea(productAdmin.productDataArea, testData.clickPosition[0], testData.clickPosition[1]);
            //Click tab General
            await productAdmin.clickDataMenu(productAdmin.generalLink);
            //  await productAdmin.clickGenralData();
            await expect(productAdmin.regularPrice).toBeVisible();
            await expect(productAdmin.salePrice).toBeVisible();
            await expect(productAdmin.taxStatus).toBeVisible();
            await expect(productAdmin.taxClass).toBeVisible();
            //Click tab Inventory
            // await productAdmin.clickInventoryData();
            await productAdmin.clickDataMenu(productAdmin.inventoryLink);
            // await expect(productAdmin.SKU).toBeVisible();
            await expect(productAdmin.productIdentifier).toBeVisible();
            await expect(productAdmin.stockManager).toBeVisible();
            await expect(productAdmin.inStock).toBeVisible();
            await expect(productAdmin.outStock).toBeVisible();
            await expect(productAdmin.onBackorder).toBeVisible();
            await expect(productAdmin.soldIndividually).toBeVisible();
            //Click Shipping
            //  await productAdmin.clickShippingData();
            await productAdmin.clickDataMenu(productAdmin.shippingLink);
            await expect(productAdmin.weight).toBeVisible();
            await expect(productAdmin.length).toBeVisible();
            await expect(productAdmin.width).toBeVisible();
            await expect(productAdmin.height).toBeVisible();
            await expect(productAdmin.shippingClass).toBeVisible();
            //Click linked
            //    await productAdmin.clickLinkedData();
            await productAdmin.clickDataMenu(productAdmin.linkedLink);
            await expect(productAdmin.upSells).toBeVisible();
            await expect(productAdmin.crossSells).toBeVisible();
            //Click Attributes
            //   await productAdmin.clickAttributesData();
            await productAdmin.clickDataMenu(productAdmin.attributesLink);
            await expect(productAdmin.attributeName).toBeVisible();
            await expect(productAdmin.attributeValue).toBeVisible();
            //Click Advanced
            //   await productAdmin.clickAdvancedData();
            await productAdmin.clickDataMenu(productAdmin.advancedLink);
            await expect(productAdmin.purchaseNote).toBeVisible();
            await expect(productAdmin.menuOrder).toBeVisible();
            await expect(productAdmin.enableReview).toBeVisible();
            await expect(productAdmin.avaibaleForPOS).toBeVisible();
        })
    });

    test("Verify tao va hien thi thanh cong san pham", async ({ productAdmin }) => {
        //Click expand Product data area
        await productAdmin.expandArea(productAdmin.productDataArea, testData.clickPosition[0], testData.clickPosition[1]);
        await productAdmin.expandArea(productAdmin.productPublishArea, testData.clickPosition[0], testData.clickPosition[1]);
        //Fill product info
        await productAdmin.fillProductInfo(testData.product.name, testData.product.type, testData.product.desc, testData.product.regularPrice, testData.product.salePrice);
        //Verify add product success
        await expect(productAdmin.messageSuccess).toHaveText(testData.addProductSuccessMess);
        //Click view product
        await productAdmin.clickViewProduct();
        await expect(productAdmin.titleProduct).toHaveText(testData.product.name);
        //Back to all product
        await productAdmin.page.goto(testData.url.allProduct);
        //Verify show product
        const product = productAdmin.getProduct(testData.product.name);
        await expect(product).toBeVisible();
        //Delete product
        await productAdmin.deleteProduct(product);
    });
})