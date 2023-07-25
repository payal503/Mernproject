import { configureStore } from "@reduxjs/toolkit";
import CategorySlice from "./CategorySlice";

import CustomerSlice from "./CustomerSlice";
import featuresProductSlice from "./FeaturesProductSlice";
import SellerSlice from "./sellerSignInSlice";
import CartSlice from "./CartSlice";
import wishlistSlice from "./wishlistSlice";

import DeliveryDetailSlice from "./DeliveryDetailSlice";
const store = configureStore({
    reducer: {
        category: CategorySlice,
        customer: CustomerSlice,
        featuresproduct: featuresProductSlice,
        cart: CartSlice,
        seller: SellerSlice,
        featuresproduct:featuresProductSlice,
        wishlist : wishlistSlice,
        deliveryDetail:DeliveryDetailSlice
    }
})
export default store