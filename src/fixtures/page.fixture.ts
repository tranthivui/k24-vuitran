import {test as base} from "@playwright/test";
import { ProductDetailPage } from "../pages/product-page.page";
import { ProductAdmin } from "../pages/product-admin.page";
import { DashBoard } from "../pages/dashboard.page";
import { HomePage } from "../pages/home-page.page";
import { AdminLoginPage } from "../pages/admin-login.page";

type PageFixture={
    productDetail: ProductDetailPage,
    productAdmin: ProductAdmin,
    dashBoard: DashBoard,
    homePage: HomePage,
    adminLoginPage: AdminLoginPage
};

export const test=base.extend<PageFixture>({
    productDetail: async({page},use)=>{
        const productDetail=new ProductDetailPage(page);
        await use(productDetail);
    },
    productAdmin: async({page},use)=>{
        const productAdmin=new ProductAdmin(page);
        await use(productAdmin);
    },
    dashBoard: async({page},use)=>{
        const dashBoard=new DashBoard(page);
        await use(dashBoard);
    },
    homePage: async({page},use)=>{
        const homePage=new HomePage(page);
        await use(homePage);
    },
    adminLoginPage: async({page},use)=>{
        const adminLoginPage=new AdminLoginPage(page);
        await use(adminLoginPage);
    }
})