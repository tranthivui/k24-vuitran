import {test as base} from "../fixtures/dashboard.fixture";
import { ProductAdmin } from "../pages/product-admin.page";

export const test=base.extend<{productAdmin:ProductAdmin}>({
    productAdmin: async({page},use)=>{
        const productAdmin=new ProductAdmin(page);
        await use(productAdmin);
    }
})