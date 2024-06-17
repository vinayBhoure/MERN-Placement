import { NextFunction, Request, Response } from "express";
import { NewUserRequestBody } from "../types/types.js";
import { User } from "../models/user.js";

export const newUser = async (
  req: Request<{}, {}, NewUserRequestBody>,
  res: Response,
  next: NextFunction) => {

  try {
    const { name, email, photo, gender, role, _id, dob } = req.body;

    const user = await User.create({
      name,
      email,
      photo,
      gender,
      _id,
      dob: new Date(dob), 
    });

    return res.status(201).json({
      success: true,
      data: user,
      message: `Welcome, ${user.name}`
    })

  } catch (err) {
    next(err);
  }
};