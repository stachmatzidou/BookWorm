import jwt from "jsonwebtoken";

export default (req, res, next) => {
    //get the token
    const token = req.cookies.access_token;
    if (!token) {
        return res.json("No token available.");
    };
    //check if token is valid
    return jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
        if (error) {
            return res.json("Invalid token.");
        } else {
            req.user = decoded;
            //if token is valid, move to the next middleware
            return next();
        };
    });
};