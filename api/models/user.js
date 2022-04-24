const mongoose = require("mongoose");
const {isEmail} = require('validator');

// user model, containing all properties of a user
const schema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        maxlength: 50
    },
    email: {
        type: String,
        require: true,
        unique: true,
        lowercase: true,
        validate: isEmail
    },
    password: {
        type: String,
        require: true,
        minlength: 3
    },
    status: {type: String, require: false},
    address: {type: String, require: false},
    joined: {type: Date, require: false, default: Date.now()},
});

const User = mongoose.model("User", schema);

module.exports = User;
