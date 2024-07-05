import { BarChartType, CartItem, Coupon, DashboardStatsType, LineChartType, OrderItemType, OrderResponseType, PieChartType, Product, ShippingInfo, User } from "./types"

export type MessageTypes = {
    success: boolean,
    message: string,
}

export type UserResponse = {
    success: boolean,
    user: User
}

export type AllProductResponse = {
    success: boolean,
    products: Product[]
}

export type CustomError = {
    status: number,
    data: {
        success: boolean,
        message: string
    }
}

export type AllCategoriesResponse = {
    success: boolean,
    categories: string[]
}

export type SearchProductResponse = {
    success: boolean,
    products: Product[]
}

export type SearchProductsResponse = AllProductResponse & {
    totalPage: number;
};
export type SearchProductsRequest = {
    price: number;
    page: number;
    category: string;
    search: string;
    sort: string;
};

export type GetSingleProductResponse = {
    success: boolean;
    product: Product;
}


export type NewProductRequest = {
    id: string,
    formData: FormData
}
export type UpdateProductRequest = {
    id: string,
    user_id: string,
    formData: FormData
}

export type ProductResponse = {
    success: boolean,
    product: Product
}

export type DeleteProductRequest = {
    user_id: string,
    id: string
}

export type NewOrderRequest = {
    shippingInfo: ShippingInfo;
    user: string;
    subtotal: number;
    tax: number;
    shippingCharges: number;
    discount: number;
    total: number;
    orderItems: CartItem[];
}

export type UpdateOrderRequest = {
    user_id: string,
    order_id: string,
}

export type AllOrderResponse = {
    success: boolean,
    orders: OrderResponseType[]
}

export type MyOrderResponse = {
    success: boolean,
    orders: OrderResponseType[]
}

export type OrderDetailsResponse = {
    success: boolean,
    order: OrderResponseType
}

export type AllUserResponse = {
    success: boolean,
    users: User[]
}

export type DeleteUserRequest = {
    userId: string,
    id: string
}

export type DashboardStatsResponse = {

    success: boolean,
    message: string,
    data: DashboardStatsType
}

export type PieChartResponse = {
    success: boolean,
    message: string,
    data: PieChartType
}

export type BarChartResponse = {
    success: boolean,
    message: string,
    data: BarChartType
}

export type LineChartResponse = {
    success: boolean,
    message: string,
    data: LineChartType
}

export type NewCouponResponse = {
    success: boolean,
    message: string,
    coupon: Coupon
}

export type CouponRequest = {
    user_id: string;
    code: string;
    amount: number;
}