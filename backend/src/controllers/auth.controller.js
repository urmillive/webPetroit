const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const getProfile = async (req, res) => {
    try {
        res.status(200).json({
            name: req.user.name,
            email: req.user.email
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });

        const payload = {
            id: user._id
        };

        const token = jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.status(200).json({ message: "Signup Successfully", user: user, token: token });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email: email });
        if (!user) {
            throw new Error("Invalid email or password!");
        }

        const isEqual = await bcrypt.compare(password, user.password);
        if (!isEqual) {
            throw new Error("Invalid email or password!");
        }

        const payload = {
            id: user._id
        };

        const token = jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.status(200).json({ token: token, user: user, message: "Login Successfully" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

module.exports = { getProfile, signup, login };