import { User } from "../models/user.js";
import { TryCatch } from "./error.js";
import ErrorHandler from "../utils/class.js";

export const adminOnly = TryCatch(async (req, res, next) => {
    const { id } = req.query;

    if (!id) return next(new ErrorHandler("Please Login First", 401));
  
    const user = await User.findById(id);
    if (!user) return next(new ErrorHandler("Invalid user ID", 401));
    if (user.role !== "admin")
      return next(new ErrorHandler("You are not allowed to access protected routes", 403));
  
    next();
})