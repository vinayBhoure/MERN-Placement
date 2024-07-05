import { NextFunction, Response, Request } from "express";
import { TryCatch } from "../middlewares/error.js";
import { Coupon } from "../models/coupon.js";
import ErrorHandler from "../utils/class.js";
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { v4 as uuid } from 'uuid';
import { sha256 } from 'js-sha256';
import { PHONE_PE_URI, payloadEndpoints, MERCHANT_ID, SALT_INDEX, SALT_KEY } from "../index.js";

export const newCoupon = TryCatch(async (req: Request, res: Response, next: NextFunction) => {

    const { code, amount } = req.body;

    const couponExist = await Coupon.findOne({ code });
    if (couponExist) return next(new ErrorHandler("Coupon already exists", 400));

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

export const phonePeIntent = TryCatch(async (req, res, next) => {

    const id = "firebaseID";
    const { amount } = req.body;
    const { productInfo } = req.query;

    if (!amount) {
        return res.status(400).json({ success: false, message: "Amount is required" });
    }

    const uniqueID = uuid();
    const payload = {
        merchantId: `${MERCHANT_ID}`,
        merchantTransactionId: `${uniqueID}`,
        merchantUserId: `${id}`,
        amount: Number(amount),
        redirectUrl: `http://localhost:5173/payment/${productInfo}/${uniqueID}`,
        redirectMode: "REDIRECT",
        mobileNumber: "9343297622",
        paymentInstrument: {
            type: "PAY_PAGE",
        }
    };

    const bufferObj = Buffer.from(JSON.stringify(payload), 'utf8');
    const base64Encoded = bufferObj.toString('base64');

    const xVerify = sha256(base64Encoded + payloadEndpoints + SALT_KEY).toString() + "###" + SALT_INDEX;

    const options: AxiosRequestConfig = {
        method: 'post',
        url: `${PHONE_PE_URI}${payloadEndpoints}`,
        headers: {
            accept: 'application/json',
            'Content-Type': 'application/json',
            "X-VERIFY": xVerify
        },
        data: {
            request: base64Encoded
        },
        timeout: 10000 // 10 seconds timeout
    };

    // Exponential backoff
    const MAX_RETRIES = 5;
    let attempts = 0;
    let response: AxiosResponse | undefined = undefined;

    while (attempts < MAX_RETRIES) {
        try {
            response = await axios.request(options);
            break; // If the request is successful, break out of the loop
        } catch (err) {
            const axiosError = err as AxiosError;
            if (axiosError.response && axiosError.response.status === 429) {
                attempts++;
                const retryAfter = axiosError.response.headers['retry-after']
                    ? parseInt(axiosError.response.headers['retry-after'], 10) * 1000
                    : 2 ** attempts * 1000; // Exponential backoff
                if (attempts >= MAX_RETRIES) {
                    throw new Error("Too many requests, please try again later.");
                }
                await new Promise(resolve => setTimeout(resolve, retryAfter));
            } else {
                throw axiosError; // If it's not a 429 error, throw the error
            }
        }
    }

    return res.status(200).json({
        success: true,
        data: response ? response.data : "Data didn't fetch properly"
    });
});

export const checkStatus = TryCatch(async (req, res, next) => {

    const { transactionID } = req.params;

    if (transactionID) {

        const xVerify = sha256(`/pg/v1/status/${MERCHANT_ID}/${transactionID}` + SALT_KEY).toString() + "###" + SALT_INDEX;

        const options = {
            method: 'get',
            url: `https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/status/${MERCHANT_ID}/${transactionID}`,
            headers: {
                accept: 'application/json',
                'Content-Type': 'application/json',
                'X-MERCHANT-ID': `${MERCHANT_ID}`,
                'X-VERIFY': `${xVerify}`,
            },

        };
        axios
            .request(options)
            .then(function (response: AxiosResponse) {

                return res.status(200).json({
                    success: true,
                    data: response.data
                });
            })
            .catch(function (error: AxiosError) {
                console.error(error);
            });
    }
})

