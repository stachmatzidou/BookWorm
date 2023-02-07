import bcryptjs from "bcryptjs";
import User from "../models/User.js";


export const signUp = async (req, res) => {
    //checking if all required information is available
    if (!(req.body.username && req.body.email && req.body.password)) {
        return res.json("Fields username, email and password are required!");
    };
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
    };
};

export const signIn = () => {

};

export const signOut = () => {

};

export const status = () => {

};