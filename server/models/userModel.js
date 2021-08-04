const mongoose = require('../config/dbConfig');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        tokens: [
            {
                token: {
                    type: String,
                    required: true
                }
            }
        ]
    },
    {
        timestamps: true
    }
);

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hashSync(this.password, salt);
    next();
});

userSchema.methods.comparePassword = function (inputPwd, callback) {
    return callback(null, bcrypt.compareSync(inputPwd, this.password));
};

userSchema.methods.generateAuthToken = async function () {
    try {
        let token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: '5m' });
        this.tokens = this.tokens.concat({ token: token });
        await this.save();
        return token;
    } catch (err) {
        console.log(err);
    }
};

userSchema.methods.removeAuthToken = async function (tokenToRemove) {
    try {
        this.tokens = this.tokens.filter(token => token.token !== tokenToRemove);
        await this.save();
        return true;
    } catch (err) {
        console.log(err);
    }
};

module.exports = mongoose.model('user', userSchema);