const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    surname: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    birthDate: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    profileImage:{
        type: String,
        require: true
    },
    publicId:{
        type: String,
        require: true
    },
});

module.exports = mongoose.model("Users", userSchema);