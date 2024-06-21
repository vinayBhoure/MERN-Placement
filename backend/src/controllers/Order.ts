import { NextFunction, Response, Request } from "express";
import { TryCatch } from "../middlewares/error.js";
import { NewOrderRequestBody } from "../types/types.js";
import { Order } from "../models/order.js";
import  Product from "../models/product.js";
import ErrorHandler, { invalidateCache } from "../utils/class.js";
import { nodeCache } from "../index.js";

export const newOrder = TryCatch(async (
    req: Request<{}, {}, NewOrderRequestBody>,
    res: Response,
    next: NextFunction) => {

    const {
        shippingInfo,
        user,
        subtotal,
        tax,
        shippingCharges,
        discount,
        total,
        orderItems
    } = req.body;

    if (
        !shippingInfo ||
        !user ||
        !subtotal ||
        !tax ||
        !total ||
        !orderItems
    ) {
        throw new ErrorHandler("All fields are required", 400);
    }


    const order = Order.create({
        shippingInfo,
        user,
        subtotal,
        tax,
        shippingCharges,
        discount,
        total,
        orderItems
    });

    for (let i = 0; i < orderItems.length; i++) {
        const item = orderItems[i];
        const product = await Product.findById(item.productId);
        if (!product) throw new Error("Product not found");
        product.stock = product.stock - item.quantity;
        await product.save();
    }

    await invalidateCache({ order: true, product: true, admin: true, userId: user});

    res.status(201).json({
        success: true,
        message: "Order placed successfully",
    })

});

export const myOrders = TryCatch(async (req, res, next) => {

    const { id } = req.query;
    const key = `my-orders-${id}`;

    let orders

    if (nodeCache.has(key)) {
        orders = JSON.parse(nodeCache.get(key)!);
    } else {
        orders = await Order.find({ user: id })
        nodeCache.set(key, JSON.stringify(orders));
    }

    return res.status(200).json({
        success: true,
        orders,
    })
})

export const allOrders = TryCatch(async (req, res, next) => {

    let orders

    if (nodeCache.has("all-orders")) {
        orders = JSON.parse(nodeCache.get("all-orders")!);
    } else {
        orders = await Order.find().populate("user", "name"); // populate -> replace the specific path in the document with the actual document
        nodeCache.set("all-orders", JSON.stringify(orders));
    }

    return res.status(200).json({
        success: true,
        orders,
    })
})

export const getSingleOrder = TryCatch(async (req, res, next) => {

    const { id } = req.params;
    if (!id) throw new ErrorHandler("Please provide an order id", 400);
    
    let order

    if (nodeCache.has(`order-${id}`)) {
        order = JSON.parse(nodeCache.get(`order-${id}`)!);
    } else {
        order = await Order.findById(id).populate("user", "name");
        if(!order) throw new ErrorHandler("Order not found", 404);
        nodeCache.set(`order-${id}`, JSON.stringify(order));
    }

    res.status(200).json({
        success: true,
        order,
    })
})

export const processOrder = TryCatch(async (req, res, next) => {

    const {id} = req.params;

    const order = await Order.findById(id);
    if (!order) throw new ErrorHandler("Order not found", 404);

    switch(order.status){
        case "Processing":
            order.status = "Shipped";
            break;
        
        case "Shipped":
            order.status = "Delivered";
            break;
        
        default:
            "Delivered"
            break;
    }

    await order.save();

    await invalidateCache({ order: true, product: false, admin: true, userId: order.user, orderId: id});

    return res.status(200).json({
        success: true,
        message: "Order updated successfully",
    })
})

export const deleteOrder = TryCatch(async (req, res, next) => {
    
        const {id} = req.params;
    
        const order = await Order.findById(id);
        if (!order) throw new ErrorHandler("Order not found", 404);

        await order.deleteOne();
        await invalidateCache({ order: true, product: false, admin: true, userId: order.user, orderId: id});

        return res.status(200).json({
            success: true,
            message: "Order deleted successfully",
        })
})