import User from "../models/User.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

//Get current user information
export const getUserInfo = async (req, res, next) => {
    // console.log(req);

    try {
        const data = await User.findById(req.user.id).select("username email");
        return res.status(200).json(data);
    } catch (error) {
        return next(error);
    }
};

//Update current user information
export const updateUserInfo = async (req, res, next) => {
    let hashedPassword;
    try {
        if (req.body.password) {
            //hashing the password
            const salt = await bcryptjs.genSalt(10);
            hashedPassword = await bcryptjs.hash(req.body.password, salt);
        };

        //find user by id and update their info
        await User.findByIdAndUpdate(
            req.user.id,
            {
                username: req.body.username || req.user.username,
                email: req.body.email || req.user.email,
                password: hashedPassword || req.user.password,
            },
            { new: true }
        );
        return res.status(200).json("User Updated Successfully.");
    } catch (error) {
        return next(error);
    };
};
