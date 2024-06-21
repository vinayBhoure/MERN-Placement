import { nodeCache } from "../index.js";
import Product from "../models/product.js";
import { Order } from "../models/order.js";
import { InvalidateCacheProp } from "../types/types.js";

class ErrorHandler extends Error{
    constructor(public message:string, public statusCode:number){
        super(message)
        this.statusCode = statusCode
    }
}

export default ErrorHandler

export const invalidateCache = async ({ product, order, admin, userId, orderId } : InvalidateCacheProp) => {
    
    if(product){

        const productKeys: string[] = ["latest-products", "categories", "products-by-category"]

        const product = await Product.find({}).select("_id");
        product.forEach((p) => {
            productKeys.push(`product-${p._id}`);
        })

        nodeCache.del(productKeys)
    }

    if(order){
        const orderKeys: string[] = ["all-orders", `my-orders-${userId}`,`order-${orderId}`]
        nodeCache.del(orderKeys)
    }

    if(admin){
        const adminKeys: string[] = ["admin-line-charts", "admin-pie-charts", "admin-bar-charts", "admin-stats"]
        nodeCache.del(adminKeys)
    }
};