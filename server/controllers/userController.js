const User = require('../models/userModel');

class controller {
    registerUser = async (req, res) => {
        await User.findOne({ email: req.body.email }, (err, user) => {
            if (user) {
                res.json({ message: 'User already exists with entered details.' });
            }
        });
        const user = new User(req.body);
        try {
            await user.save();
            res.status(201).json({ user, message: 'Success! User has been registered with entered details.' });
        } catch (error) {
            res.status(409).json({ message: error.message });
        }
    };
    loginUser = async (req, res) => {
        const { email, password } = req.body;
        await User.findOne({ email: email }, (err, user) => {
            if (user) {
                if (user.password === password) {
                    res.json({ user, message: 'Login successful.' });
                } else {
                    res.json({ message: 'Incorrect email or password.' });
                }
            }
            else {
                res.json({ message: 'No user exists with entered details. Please check and retry.' });
            }
        });
    };
}

module.exports = controller;