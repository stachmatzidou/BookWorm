import User from "../models/User.js";
import bcryptjs from "bcryptjs";
import createError from "../utils/createError.js";

//Get current user information
export const getUserInfo = async (req, res, next) => {
    try {
        const data = await User.findById(req.user.id).select("username email");
        return res.status(200).json(data);
    } catch (error) {
        return next(error);
    }
};

export const updateUser = async (req, res, next) => {
    try {
        if (req.body.current) {
            const user = await User.findById(req.user.id)
            //check if password is correct
            const isPasswordCorrect = await bcryptjs.compare(
                req.body.current,
                user.password
            );
            //if password is incorrect
            if (!isPasswordCorrect) {
                return next(
                    createError({ status: 400, message: "Incorrect Password." })
                );
            }
            if (req.body.password) {
                //hashing the password
                const salt = await bcryptjs.genSalt(10);
                const hashedPassword = await bcryptjs.hash(
                    req.body.password,
                    salt
                );
                await User.findByIdAndUpdate(
                    req.user.id,
                    {
                        password: hashedPassword,
                    },
                    { new: true }
                );
            }
            return res.status(200).json("User Password Updated Successfully.");
        } else {
            await User.findByIdAndUpdate(
                req.user.id,
                {
                    username: req.body.username || req.user.username,
                    email: req.body.email || req.user.email,
                },
                { new: true }
            );
            return res.status(200).json("User Info Updated Successfully.");
        }
    } catch (error) {
        console.log(error);
    }
};