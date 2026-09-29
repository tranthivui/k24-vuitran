import {test as base} from "../fixtures/admin-login.fixture";
import { DashBoard } from "../pages/dashboard.page";

export const test=base.extend<{dashBoard:DashBoard}>({
    dashBoard: async({page},use)=>{
        const dashBoard=new DashBoard(page);
        await use(dashBoard);
    }
})