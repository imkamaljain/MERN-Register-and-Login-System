const User = require('../models/userModel');

class controller {
    registerUser = async (req, res) => {
        try {
            await User.findOne({ email: req.body.email }, (err, user) => {
                if (user) {
                    res.json({ message: 'User already exists with entered details.' });
                }
            });
            const user = new User(req.body);
            await user.save();
            res.status(201).json({
                user: {
                    name: user.name,
                    email: user.email
                },
                message: 'Success! User has been registered with entered details.'
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };
    loginUser = async (req, res) => {
        try {
            const { email, password } = req.body;
            await User.findOne({ email: email }, (err, user) => {
                if (user) {
                    user.comparePassword(password, async (err, match) => {
                        if (!match) {
                            res.json({ message: 'Incorrect email or password.' });
                        } else {
                            let token = await user.generateAuthToken();
                            res.status(202).json({
                                message: 'Login successful.',
                                token: token
                            });
                        }
                    });
                } else {
                    res.json({ message: 'No user exists with entered details. Please check and retry.' });
                }
            });
        } catch (err) {
            res.status(500).json({ message: error.message });
        }
    };
    getUser = async (req, res) => {
        res.json({
            name: req.user.name,
            email: req.user.email
        });
    };
    logoutUser = async (req, res) => {
        try {
            const { token } = req.body
            await User.findOne({ "tokens.token": token }, async (err, user) => {
                let deleteSuccess = await user.removeAuthToken(token);
                if (deleteSuccess) res.status(204).json({});
            });
        } catch (err) {
            res.status(500).json({ message: error.message });
        }
    };
}

module.exports = controller;