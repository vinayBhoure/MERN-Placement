
import { CartItem, ShippingInfo } from "@/types/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface CartState {
    loading: boolean;
    cartItems: CartItem[];
    subtotal: number;
    shippingCharges: number;
    tax: number;
    discount: number;
    total: number;
    shippingInfo: ShippingInfo
}


const initialState: CartState = {
    loading: false,
    cartItems: [],
    subtotal: 0,
    shippingCharges: 0,
    tax: 0,
    discount: 0,
    total: 0,
    shippingInfo: {
        address: '',
        city: '',
        country: '',
        state: '',
        pinCode: 0,
    }
}

export const cartReducer = createSlice({
    name: 'cartReducer',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<CartItem>) => {
            state.loading = true;
            const item = action.payload;
            const existingItem = state.cartItems.find(i => i.productId === item.productId);
            if (existingItem) {
                existingItem.quantity += 1;
                state.cartItems = state.cartItems.map(i => i.productId === item.productId ? existingItem : i);
                state.loading = false;

            } else {
                state.cartItems.push(item);
                state.loading = false;
            }
        },
        deleteItem: (state, action: PayloadAction<string>) => {
            state.loading = true;
            const item = state.cartItems.find(i => i.productId === action.payload);
            if (item) {
                item.quantity -= 1;
                state.cartItems = state.cartItems.map(i => i.productId === action.payload ? item : i);
            };

            state.loading = false;
        },
        removeFromCart: (state, action: PayloadAction<string>) => {
            state.loading = true;
            state.cartItems = state.cartItems.filter(i => i.productId !== action.payload);
            state.loading = false;
        },
        calculatePrice: (state) => {
            state.subtotal = state.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
            state.tax = state.subtotal * 0.18;
            if (state.cartItems.length > 0) state.shippingCharges = state.subtotal > 1000 ? 0 : 100;
            state.total = state.subtotal + state.tax + state.shippingCharges - state.discount;
        },
        discountApplied: (state, action: PayloadAction<number>) => {
            if (state.cartItems.length === 0) return;
            if (state.total <= action.payload) return;
            state.discount = action.payload;
        },
        saveShippingInfo: (state, action: PayloadAction<ShippingInfo>) => {
            state.shippingInfo = action.payload;
        },
        resetCart: () => initialState,
    }
})

export const { addToCart, removeFromCart, deleteItem, calculatePrice, discountApplied, saveShippingInfo, resetCart } = cartReducer.actions;