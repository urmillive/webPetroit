const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const authMiddleware = async (req, res, next) => {

    try {
        const authHeader = req.get("Authorization");
        if (!authHeader) {
            const error = new Error("Not Authenticated!");
            error.statusCode = 401;
            throw error;
        }

        const token = authHeader.split(" ")[1];

        let payload;

        try {
            payload = jwt.verify(token, process.env.JWT_SECRET);
        } catch (e) {
            const error = new Error("Not Authenticated!");
            error.statusCode = 401;
            throw error;
        }

        if (!payload) {
            const error = new Error("Not Authenticated!");
            error.statusCode = 401;
            throw error;
        }
        const userId = payload.id;

        const user = await User.findById(userId);
        if (user) {
            req.user = user;
            next();
        } else {
            console.log(`User with id ${userId} not found`);
        }
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
};


module.exports = authMiddleware;