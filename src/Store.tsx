import { configureStore } from "@reduxjs/toolkit";
import QuantitySlice from "./AllStoreSlice/AddQuantitySlice";
import PriceAndQuantitySlice from "./AllStoreSlice/PriceAndQuantitySlice";
import PrintSlice from "./AllStoreSlice/PrintSlice";
import ItemViewSlice from "./AllStoreSlice/ItemViewSlice";
import LoginCanteenUserSlice from "./AllStoreSlice/LoginCanteenUserSlice";
import AddProductCanteenSlice from "./AllStoreSlice/AddProductCanteenSlice";
import AllMenuItemsSlice from "./AllStoreSlice/AllMenuItemsSlice";
import canteenDataSlice from "./AllStoreSlice/CanteenIdSlice";
import UserSaveSlice from "./AllStoreSlice/UserSaveSlice";
import UserOrderListSlice from "./AllStoreSlice/UserOrderListSlice";
import LoginSlice from "./AllStoreSlice/LoginSlice";
import StocksItemViewSlice from "./AllStoreSlice/StocksItemViewSlice";
import ZoomImageSlice from "./AllStoreSlice/ZoomImageSlice";


export const store = configureStore({
    reducer: {
        Quantity: QuantitySlice,
        PriceAndQuantity: PriceAndQuantitySlice,
        PrintData: PrintSlice,
        ItemView: ItemViewSlice,
        LoginCanteenUser: LoginCanteenUserSlice,
        AddProductCanteen: AddProductCanteenSlice,
        allMenuItems: AllMenuItemsSlice,
        canteenData: canteenDataSlice,
        user: UserSaveSlice,
        OrderViewList: UserOrderListSlice,
        LoginSlice: LoginSlice,
        stocksItemView: StocksItemViewSlice,
        ZoomImage: ZoomImageSlice,

    }
})

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
