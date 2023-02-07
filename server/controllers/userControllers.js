import User from "../models/User.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

//Get current user information
export const getUserInfo = async (req, res, next) => {
    console.log(req.user.id);
    try {
        const data = await User.findById(req.user.id).select("username email");
        return res.status(200).json(data);
    } catch (error) {
        return next(error);
    }
};

//Update current user information
export const updateUserInfo = async (req, res, next) => {
    try {
        //hashing the password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(req.body.password, salt);
        //find user by id and update their info
        const updatedUser = await User.findByIdAndUpdate(
            req.user.id,
            {
                username: req.body.username,
                email: req.body.email,
                // password: req.body.password,
                password: hashedPassword
            },
            { new: true }
        ).select("name email");
        return res.status(200).json(updatedUser);
    } catch (error) {
        return next(error);
    };
};
