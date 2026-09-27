import {test as base} from "./home-page.fixture";
import { ProductDetailPage } from "../pages/product-page.page";

export const test=base.extend<{productDetail:ProductDetailPage}>({
    productDetail: async({page},use)=>{
        const productDetail=new ProductDetailPage(page);
        await use(productDetail)
    }
})