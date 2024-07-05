import { create } from "domain";
import { nodeCache } from "../index.js";
import { TryCatch } from "../middlewares/error.js";
import Product from "../models/product.js";
import { User } from "../models/user.js";
import { Order } from "../models/order.js";
import { networkInterfaces } from "os";

const calculatePercentage = (curr: number, prev: number) => {
    if (prev === 0) return curr * 100;
    return Number((((curr - prev) / prev) * 100).toFixed(0));
}


export const getDashboardInfo = TryCatch(async (req, res, next) => {

    let stats = {}

    if (nodeCache.has("admin-stats")) {
        stats = JSON.parse(nodeCache.get("admin-stats") as string);
    } else {

        const today = new Date();

        const thisMonth = {
            start: new Date(today.getFullYear(), today.getMonth(), 1),
            end: new Date(today.getFullYear(), today.getMonth() + 1, 0)
        }

        const lastMonth = {
            start: new Date(today.getFullYear(), today.getMonth() - 1, 1),
            end: new Date(today.getFullYear(), today.getMonth(), 0)
        }

        const lastSixMonths = {
            start: new Date(today.getFullYear(), today.getMonth() - 6, 1),
            end: new Date(today.getFullYear(), today.getMonth(), 0)
        }

        const thisMonthProductPromise = Product.find({
            createdAt: {
                $gte: thisMonth.start,
                $lte: today
            }
        });

        const lastMonthProductPromise = Product.find({
            createdAt: {
                $gte: lastMonth.start,
                $lte: lastMonth.end
            }
        });

        const thisMonthUserPromise = User.find({
            createdAt: {
                $gte: thisMonth.start,
                $lte: thisMonth.end
            }
        });

        const lastMonthUserPromise = User.find({
            createdAt: {
                $gte: lastMonth.start,
                $lte: lastMonth.end
            }
        });

        const thisMonthOrderPromise = Order.find({
            createdAt: {
                $gte: thisMonth.start,
                $lte: thisMonth.end
            }
        });

        const lastMonthOrderPromise = Order.find({
            createdAt: {
                $gte: lastMonth.start,
                $lte: lastMonth.end
            }
        });

        const lastSixMonthOrderPromise = Order.find({
            createdAt: {
                $gte: lastSixMonths.start,
                $lte: today
            }
        });

        // const thisMonthRevenuePromise = Order.aggregate([
        //     {
        //         $match: {
        //             createdAt: {
        //                 $gte: thisMonth.start,
        //                 $lte: thisMonth.end
        //             }
        //         }
        //     },
        //     {
        //         $group: {
        //             _id: null,
        //             total: { $sum: "$total" }
        //         }
        //     }
        // ]);

        const topTransactionPromise = Order.find({}).select(["orderItems", "discount", "total", "status"]).limit(5)

        const [
            thisMonthProduct,
            lastMonthProduct,
            thisMonthUser,
            lastMonthUser,
            thisMonthOrder,
            lastMonthOrder,
            // thisMonthRevenue,
            productCount,
            userCount,
            allOrders,
            lastSixMonthOrder,
            categories,
            femaleUserCount,
            topTransaction
        ] = await Promise.all([
            thisMonthProductPromise,
            lastMonthProductPromise,
            thisMonthUserPromise,
            lastMonthUserPromise,
            thisMonthOrderPromise,
            lastMonthOrderPromise,
            // thisMonthRevenuePromise,
            Product.countDocuments(),
            User.countDocuments(),
            Order.find({}).select("total"),
            lastSixMonthOrderPromise,
            Product.distinct("category"),
            User.countDocuments({ gender: "female" }),
            topTransactionPromise
        ]);

        const productPercentage = calculatePercentage(thisMonthProduct.length, lastMonthProduct.length);
        const userPercentage = calculatePercentage(thisMonthUser.length, lastMonthUser.length);
        const orderPercentage = calculatePercentage(thisMonthOrder.length, lastMonthOrder.length);

        const orderMonthCounts = new Array(6).fill(0);
        const orderMonthlyRevenue = new Array(6).fill(0);

        lastSixMonthOrder.forEach((order) => {
            const creationDate = order.createdAt;
            const monthDiff = (today.getMonth() - creationDate.getMonth() + 12) % 12;

            if (monthDiff < 6) {
                orderMonthCounts[6 - monthDiff - 1] += 1;
                orderMonthlyRevenue[6 - monthDiff - 1] += order.total;
            }
        });

        const thisMonthRevenue = thisMonthOrder.reduce((acc, order) => acc + (order.total || 0), 0);

        const categoryCountPromise: any[] = categories.map((category) => {
            Product.countDocuments({ category })
        })
        
        const categoryCount = await Promise.all(categoryCountPromise);
        
        const categoryData: Record<string, number>[] = [];
        
        categories.map((category, index) => {
            categoryData.push({
                [category]: Math.round((categoryCount[index] / productCount))
            })
        })

        const transactions = topTransaction.map((order) => {
            return {
                _id: order._id,
                discount: order.discount,
                amount: order.total,
                quantity: order.orderItems.length,
                status: order.status,
            }
        })

        stats = {
            percentChange: {
                revenue: thisMonthRevenue,
                productPercentage,
                userPercentage,
                orderPercentage,
            },
            counts: {
                revenue: allOrders.reduce((acc, order) => acc + (order.total || 0), 0),
                productCount,
                userCount,
                orderCount: allOrders.length
            },
            chart: {
                order: orderMonthCounts,
                revenue: orderMonthlyRevenue
            },
            categories: categoryData,
            userRatio: {
                male: userCount - femaleUserCount,
                female: femaleUserCount
            },
            transactions: transactions

        }

        nodeCache.set("admin-stats", JSON.stringify(stats));
    }

    return res.status(200).json({
        success: true,
        message: "Dashboard stats",
        data: stats
    });

});

export const getBarInfo = TryCatch(async (req, res, next) => {
    let charts
    if (nodeCache.has("admin-bar-charts")) {
        charts = JSON.parse(nodeCache.get("admin-bar-charts") as string);
    } else {

        const today = new Date();
        const SixMonths = new Date(today.getFullYear(), today.getMonth() - 6);
        const twelveMonths = new Date(today.getFullYear(), today.getMonth() - 12);

        const sixMonthProductPromise = Product.find({
            createdAt: {
                $gte: SixMonths,
                $lte: today
            }
        }).select("createdAt");

        const sixMonthUserPromise = User.find({
            createdAt: {
                $gte: SixMonths,
                $lte: today
            }
        }).select("createdAt");

        const twelveMonthsOrderPromise = Order.find({
            createdAt: {
                $gte: twelveMonths,
                $lte: today
            }
        }).select("createdAt");

        const [products, users, orders] = await Promise.all([
            sixMonthProductPromise,
            sixMonthUserPromise,
            twelveMonthsOrderPromise,
        ]);
 
        const productCounts = new Array(6).fill(0);
        products.forEach((product) => {
            const creationDate = product.createdAt;
            const monthDiff = (today.getMonth() - creationDate.getMonth() + 12) % 12;
            
            if (monthDiff < 6) {
                productCounts[6 - monthDiff - 1] += 1;
            }
        });

        const userCounts = new Array(6).fill(0);
        users.forEach((user) => {
            const creationDate = user.createdAt;
            const monthDiff = (today.getMonth() - creationDate.getMonth() + 12) % 12;

            if (monthDiff < 6) {
                userCounts[6 - monthDiff - 1] += 1;
            }
        });

        const ordersCounts = new Array(12).fill(0);
        orders.forEach((order) => {
            const creationDate = order.createdAt;
            const monthDiff = (today.getMonth() - creationDate.getMonth() + 12) % 12;

            if (monthDiff < 12) {
                ordersCounts[12 - monthDiff - 1] += 1;
            }
        });

        charts = {
            users: userCounts,
            products: productCounts,
            orders: ordersCounts,
        }

        nodeCache.set("admin-bar-charts", JSON.stringify(charts));
    }

    return res.status(200).json({
        success: true,
        message: "Bar charts data",
        data: charts
    });
});

export const getLineInfo = TryCatch(async (req, res, next) => {

    let charts
    if (nodeCache.has("admin-line-charts")) {
        charts = JSON.parse(nodeCache.get("admin-line-charts") as string);
    } else {

        const today = new Date();
        const twelveMonths = new Date(today.getFullYear(), today.getMonth() - 12);

        const baseQuery = {
            createdAt: {
                $gte: twelveMonths,
                $lte: today
            }
        }

        const [products, users, orders] = await Promise.all([
            Product.find(baseQuery).select("createdAt"),
            User.find(baseQuery).select("createdAt"),
            Order.find(baseQuery).select(["createdAt", "discount", "total"]),
        ])

        const productCounts = new Array(12).fill(0);
        products.forEach((product) => {
            const creationDate = product.createdAt;
            const monthDiff = (today.getMonth() - creationDate.getMonth() + 12) % 12;

            if (monthDiff < 12) {
                productCounts[12 - monthDiff - 1] += 1;
            }
        });

        const userCounts = new Array(12).fill(0);
        users.forEach((user) => {
            const creationDate = user.createdAt;
            const monthDiff = (today.getMonth() - creationDate.getMonth() + 12) % 12;

            if (monthDiff < 12) {
                userCounts[12 - monthDiff - 1] += 1;
            }
        });

        const discount = new Array(12).fill(0);
        const revenue = new Array(12).fill(0);
        orders.forEach((order) => {
            const creationDate = order.createdAt;
            const monthDiff = (today.getMonth() - creationDate.getMonth() + 12) % 12;

            if (monthDiff < 12) {
                discount[12 - monthDiff - 1] += order.discount;
                revenue[12 - monthDiff - 1] += order.total;
            }
        });

        charts = {
            users: userCounts,
            products: productCounts,
            discount,
            revenue,
        }

        nodeCache.set("admin-line-charts", JSON.stringify(charts));
    }

    return res.status(200).json({
        success: true,
        message: "Line charts data",
        data: charts
    });
});

export const getPieInfo = TryCatch(async (req, res, next) => {

    let charts
    if (nodeCache.has("admin-pie-charts")) {
        charts = JSON.parse(nodeCache.get("admin-pie-charts") as string);
    } else {
        const allOrderPromise = Order.find({}).select([
            "total",
            "discount",
            "subtotal",
            "tax",
            "shippingCharges",
        ]);

        const [
            processingOrder,
            shippedOrder,
            deliveredOrder,
            categories,
            productsCount,
            outOfStock,
            allOrders,
            allUsers,
            adminUsers,
            customerUsers,
        ] = await Promise.all([
            Order.countDocuments({ status: "Processing" }),
            Order.countDocuments({ status: "Shipped" }),
            Order.countDocuments({ status: "Delivered" }),
            Product.distinct("category"),
            Product.countDocuments(),
            Product.countDocuments({ stock: 0 }),
            allOrderPromise,
            User.find({}).select(["dob"]),
            User.countDocuments({ role: "admin" }),
            User.countDocuments({ role: "user" }),
        ])

        const finance = {
            grossIncome: allOrders.reduce((acc, order) => acc + (order.total || 0), 0),
            discount: allOrders.reduce((acc, order) => acc + (order.discount || 0), 0),
            cost: allOrders.reduce((acc, order) => acc + (order.shippingCharges || 0), 0),
            burnt: allOrders.reduce((acc, order) => acc + (order.tax || 0), 0),
            marketing: (allOrders.reduce((acc, order) => acc + (order.total || 0), 0)) * 0.2,
        }

        const netMargin = finance.grossIncome - finance.discount - finance.cost - finance.burnt - finance.marketing;

        const categoryCountPromise: any[] = categories.map((category) => {
            Product.countDocuments({ category })
        })

        const categoryCount = await Promise.all(categoryCountPromise);
        const categoryData: Record<string, number>[] = [];
        categories.map((category, index) => {
            categoryData.push({
                [category]: Math.round((categoryCount[index] / productsCount) * 100)
            })
        })

        charts = {
            orderFullfillment: {
                processing: processingOrder,
                shipped: shippedOrder,
                delivered: deliveredOrder,
            },
            stockAvailability: {
                inStock: productsCount - outOfStock,
                outOfStock,
            },
            productInfo: {
                categories: categoryData,
                productsCount
            },
            revenue: {
                netMargin,
                discount: finance.discount,
                productionCost: finance.cost,
                burnt: finance.burnt,
                marketingCost: finance.marketing,
            },
            userAge: {
                teen: allUsers.filter((user) => user.dob.getFullYear() > 2004).length,
                adult: allUsers.filter((user) => user.dob.getFullYear() <= 2004 && user.dob.getFullYear() > 1992).length,
                old: allUsers.filter((user) => user.dob.getFullYear() <= 1992).length,
            },
            user: {
                admin: adminUsers,
                customer: customerUsers
            },
        }

        nodeCache.set("admin-pie-charts", JSON.stringify(charts));
    }

    return res.status(200).json({
        success: true,
        message: "Pie charts data",
        data: charts
    })
});