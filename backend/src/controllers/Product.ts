import { NextFunction, Request, Response } from "express";
import { TryCatch } from "../middlewares/error.js";
import ErrorHandler, { invalidateCache } from "../utils/class.js";
import { BaseQueryForSearch, NewProductRequestBody } from "../types/types.js";
import { rm } from "fs";
import Product from "../models/product.js";
import { nodeCache } from "../index.js";

export const newProduct = TryCatch(async (
    req: Request<{}, {}, NewProductRequestBody>,
    res: Response,
    next: NextFunction) => {

    const { name, price, stock, category } = req.body;
    const photo = req.file;

    if (!photo) return next(new ErrorHandler("Please add Photo", 400));

    if (!name || !price || !stock || !category) {
        rm(photo.path, () => {
            console.log("Deleted");
        });

        return next(new ErrorHandler("Please enter All Fields", 400));
    }

    const product = await Product.create({
        name,
        price,
        stock,
        category: category.toLowerCase(),
        photo: photo.path,
    });

    await invalidateCache({ product: true, admin: true });

    return res.status(201).json({
        success: true,
        message: "Product Created Successfully",
    });

})

//caching the latest products
export const getLatestProducts = TryCatch(async (req, res, next) => {

    let products

    if (nodeCache.has("latest-products")) {
        products = JSON.parse(nodeCache.get("latest-products") as string);
    }
    else {
        products = await Product.find().sort({ createdAt: -1 }).limit(5);
        nodeCache.set("latest-products", JSON.stringify(products));
    }

    res.status(200).json({
        success: true,
        products,
    });
})

//caching the categories
export const getAllCategories = TryCatch(async (req, res, next) => {

    let categories
    if (nodeCache.has("categories")) {
        categories = JSON.parse(nodeCache.get("categories") as string);
    } else {
        categories = await Product.distinct("category");
        nodeCache.set("categories", JSON.stringify(categories));
    }

    res.status(200).json({
        success: true,
        categories,
    });
});

//caching the products by category
export const getProductsByCategory = TryCatch(async (req, res, next) => {

    let products
    if (nodeCache.has("products-by-category")) {
        products = JSON.parse(nodeCache.get("products-by-category") as string);
    } else {
        const category = req.params.category;
        if (!category) return next(new ErrorHandler("Please enter a category", 400));
        products = await Product.find({ category: category });

        nodeCache.set("products-by-category", JSON.stringify(products));
    }

    res.status(200).json({
        success: true,
        products,
    });
})

//to get all products - adminonly
export const getAdminProducts = TryCatch(async (req, res, next) => {

    let products
    if (nodeCache.has("all-products")) {
        products = JSON.parse(nodeCache.get("all-products") as string);
    } else {
        products = await Product.find({});
        nodeCache.set("all-products", JSON.stringify(products));
    }

    res.status(200).json({
        success: true,
        products,
    });
});

export const getSingleProduct = TryCatch(async (req, res, next) => {

    let product
    if (nodeCache.has(`product-${req.params.id}`)) {
        product = JSON.parse(nodeCache.get(`product-${req.params.id}`) as string);
    } else {
        product = await Product.findById(req.params.id);
        if (!product) return next(new ErrorHandler("Product not found", 404));
        nodeCache.set(`product-${req.params.id}`, JSON.stringify(product));
    }

    res.status(200).json({
        success: true,
        product,
    });
});

export const updateProduct = TryCatch(async (req, res, next) => {

    const product = await Product.findById(req.params.id);

    if (!product) return next(new ErrorHandler("Product not found", 404));

    const { name, price, stock, category } = req.body;

    if (name) product.name = name;
    if (price) product.price = price;
    if (stock) product.stock = stock;
    if (category) product.category = category.toLowerCase();

    if (req.file) {
        const photo = req.file;
        if (photo) {
            rm(product.photo!, () => {
                console.log("Deleted");

            })
        }
        product.photo = photo.path;
    }

    await product.save();

    invalidateCache({
        product: true,
        productId: String(product._id),
        admin: true,
    });

    res.status(200).json({
        success: true,
        product,
    });
});

export const deleteProduct = TryCatch(async (req, res, next) => {
    const product = await Product.findById(req.params.id);

    if (!product) return next(new ErrorHandler("Product not found", 404));

    rm(product.photo!, () => {
        console.log("Deleted");
    });

    await product.deleteOne();

    await invalidateCache({
        product: true,
        productId: String(product._id),
        admin: true,
    });

    res.status(200).json({
        success: true,
        message: "Product Deleted Successfully",
    });
})

//to get all products with filter
export const getAllProduct = TryCatch(async (req, res, next) => {

    const { category, price, sort, search } = req.query;
    const page = Number(req.query.page) || 1;

    const limit = 8;
    const skip = (page - 1) * limit;

    const baseQuery: BaseQueryForSearch = {}

    if (search)
        baseQuery.name = {
            $regex: search as string,
            $options: "i",
        };


    if (category === "All") {
        delete baseQuery.category;
    } else if (category) {
        baseQuery.category = category as string;
    }
    if (price) baseQuery.price = {
        $lte: Number(price),
    };

    const [products, allproducts] = await Promise.all([
        Product.find(baseQuery).sort(sort && { price: sort === "asc" ? 1 : -1 }).limit(limit).skip(skip),
        Product.find(baseQuery),
    ]);

    const totalPages = Math.ceil(allproducts.length / limit);

    res.status(200).json({
        success: true,
        products,
        totalPages
    });
})