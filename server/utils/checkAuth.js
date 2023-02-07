import jwt from "jsonwebtoken";
import createError from "./createError.js";

export default (req, res, next) => {
    //get the token
    const token = req.cookies.access_token;
    if (!token) {
        return next(createError({status: 401, message: "Unauthorized"}));
    };
    //check if token is valid
    return jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
        if (error) {
            return next(createError({status: 401, message: "Invalid token"}));
        } else {
            req.user = decoded;
            //if token is valid, move to the next middleware
            return next();
        };
    });
};