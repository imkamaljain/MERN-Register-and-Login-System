const mongoose = require('../config/dbConfig');

const userSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String
});

module.exports = mongoose.model('user', userSchema);