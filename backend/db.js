const mongoose = require("mongoose");
require('dotenv').config();
const URL = process.env.DB_URL;

mongoose.connect(URL);

const User = mongoose.model('users', {
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3,
        maxlength: 30,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    firstname: {
        type: String,
        required: true,
        trim: true,
        maxlength: 30
    },
    lastname: {
        type: String,
        required: true,
        trim: true,
        maxlength: 30
    }
});

const Account  = mongoose.model('accounts', {
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    balance:{
        type: Number,
        required: true,
    }
    
});

module.exports = { User, Account }