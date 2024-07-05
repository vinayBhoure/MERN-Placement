export interface User {
    name: string,
    email: string,
    photo: string,
    gender: string,
    role: string,
    dob: string,
    _id: string,
}

export interface Product {
    name: string,
    price: number,
    stock: number,
    _id: string,
    category: string,
    photo: string,
}

export type ShippingInfo = {
    city: string,
    country: string,
    state: string,
    address: string,
    pinCode: number,
}

export type CartItem = {
    productId: string,
    quantity: number,
    price: number,
    name: string,
    photo: string,
    stock: number,
}

export type OrderItemType = Omit<CartItem, 'stock'> & { _id: string };

export type OrderResponseType = {
    orderItems: OrderItemType[];
    shippingInfo: ShippingInfo;
    subtotal: number;
    tax: number;
    shippingCharges: number;
    discount: number;
    total: number;
    status: string;
    user: {
        name: string;
        _id: string;
    };
    _id: string;
};

export type PercentChange = {
    revenue: number,
    productPercentage: number,
    userPercentage: number,
    orderPercentage: number
}

export type Counts = {
    revenue: number,
    productCount: number,
    userCount: number,
    orderCount: number
}

export type Chart = {
    order: number[],
    revenue: number[]
}

export type TransactionStat = {
    _id: string,
    discount: number,
    amount: number,
    quantity: number,
    status: string
}

export type UserRatio = {
    male: number,
    female: number
}

export type DashboardStatsType = {

    percentChange: PercentChange,
    counts: Counts,
    chart: Chart,
    categories: [
        {
            watch: number | null
        }
    ],
    userRatio: UserRatio,
    transactions: TransactionStat[]

}

export type OrderFullfillmentType = {
    processing: number;
    shipped: number;
    delivered: number;
}

export type StockAvailabilityType = {
    inStock: number;
    outOfStock: number;
}

export type ProductInfoType = {
    categories: Record<string, number>[];
    productsCount: number;
}

export type RevenueType = {
    netMargin: number;
    discount: number;
    productionCost: number;
    burnt: number;
    marketingCost: number;
}

export type UserType = {
    teen: number;
    adult: number;
    old: number;
}

export type PieUser = {
    admin: number;
    customer: number;
}

export type PieChartType = {
    orderFullfillment: OrderFullfillmentType ,
    stockAvailability: StockAvailabilityType ,
    productInfo: ProductInfoType ,
    revenue: RevenueType,
    userAge: UserType,
    user: PieUser
}

export type LineChartType = {
    users: number[],
    products: number[]
    discount: number[],
    revenue: number[],
}

export type BarChartType = {
    users: number[],
    products: number[],
    orders: number[],
}

export type Coupon = {
    code: string,
    amount: number,
    _id: string
}