import {test as base} from "../fixtures/product-detail.fixture";
import { AdminLoginPage } from "../pages/admin-login.page";

export const test=base.extend<{adminLoginPage:AdminLoginPage}>({
    adminLoginPage: async({page},use)=>{
        const adminLoginPage=new AdminLoginPage(page);
        await use(adminLoginPage);
    }
})