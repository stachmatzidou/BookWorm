import bcryptjs from "bcryptjs";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

export const signUp = async (req, res) => {
    //checking if all required information is available
    if (!(req.body.username && req.body.email && req.body.password)) {
        return res.json("Fields username, email and password are required!");
    }
    //if all info is there
    try {
        //hashing the password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(req.body.password, salt);
        //creating new user
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
        });
        //saving the created user to the database
        await newUser.save();
        return res.status(201).json("New User Created.");
    } catch (error) {
        console.log(error);
        return res.json("Server error.");
    }
};

export const signIn = async (req, res) => {
    //check if email and password are available
    if (!(req.body.email && req.body.password)) {
        return res.json("Fields email and password are required!");
    }
    //if they are available
    try {
        //find the user using email and get username, email and password
        const user = await User.findOne({ email: req.body.email }).select("username email password");
        //if no user is found
        if (!user) {
            return res.status(404).json("No user found.");
        }
        //if user exists check if password is correct
        const isPasswordCorrect = await bcryptjs.compare(
            req.body.password,
            user.password
        );
        //if password is incorrect
        if (!isPasswordCorrect) {
            return res.json("Password incorrect!");
        }
        //if password is correct we create the payload
        const payload = {
            id: user._id,
            username: user.username,
        };
        //then we create the token
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "1d",
        });
        //store the token in a cookie
        return res.cookie("access_token", token, { httpOnly: true }).status(200).json({message: "Signed in Successfully"});
    } catch (error) {
        console.log(error);
        return res.json("Server error.");
    };
};

export const signOut = (req, res) => {
    //Clearing the cookie when user signs out
    res.clearCookie("access_token");
    return res.status(200).json({message: "Signed out Successfully."});
};

export const status = (req, res) => {
    // Check if the user is logged in or not
    const token = req.cookies.access_token;
    //if there is no token set status to false
    if (!token) {
        return res.json(false);
    };
    return jwt.verify(token, process.env.JWT_SECRET, (error) => {
        if (error) {
            return res.json(false);
        };
        return res.json(true);
    });
};
