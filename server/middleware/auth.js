const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const auth = async (req, res, next) => {
    try {
        const token = req.header("x-auth-token");
        if (!token) return res.status(401).json({ message: "No authentication token, access denied" });
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        if (!verified) return res.status(401).json({ message: "Token verification failed, authorization denied" });
        const user = await User.findOne({ _id: verified._id, "tokens.token": token });
        if (!user) return res.status(401).json({ message: 'User not found!' });
        req.token = token;
        req.user = user;
        next();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = auth;