import { NextFunction, Response, Request } from "express";
import { TryCatch } from "../middlewares/error.js";
import { Coupon } from "../models/coupon.js";
import ErrorHandler from "../utils/class.js";
import { stripe } from "../index.js";

export const newCoupon = TryCatch(async (req: Request, res: Response, next: NextFunction) => {

    const { code, amount } = req.body;

    if (!code || !amount) {
        return next(new ErrorHandler("Please enter all fields", 400));
    }

    const coupon = await Coupon.create({
        code,
        amount
    })

    res.status(200).json({
        success: true,
        message: "Coupon created successfully",
        coupon
    })
})

export const getDiscount = TryCatch(async (req: Request, res: Response, next: NextFunction) => {

    const { code } = req.query;

    if (!code) {
        return next(new ErrorHandler("Please enter coupon code", 400));
    }

    const coupon = await Coupon.findOne({ code });

    if (!coupon) {
        return next(new ErrorHandler("Invalid coupon code", 400));
    }

    res.status(200).json({
        success: true,
        discount: coupon.amount
    })
})

export const allCoupons = TryCatch(async (req, res, next) => {
    const coupons = await Coupon.find({});

    return res.status(200).json({
        success: true,
        coupons,
    });
});

export const deleteCoupon = TryCatch(async (req, res, next) => {
    const { id } = req.params;

    const coupon = await Coupon.findByIdAndDelete(id);

    if (!coupon) return next(new ErrorHandler("Invalid Coupon ID", 400));

    return res.status(200).json({
        success: true,
        message: `Coupon ${coupon.code} Deleted Successfully`,
    });
});

