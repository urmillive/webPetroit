const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Provide Name"],
        unique: false,
    },
    email: {
        type: String,
        required: [true, "Please Provide an Email"],
        unique: [true, "Email Exist"],
    },
    password: {
        type: String,
        required: [true, "Please Provide a Password"],
        unique: false,
    },
    // students: [
    //     {
    //         type: Schema.Types.ObjectId,
    //         ref: "Student",
    //         required: true,
    //     }
    // ],
});

const User = mongoose.model('User', userSchema, 'users');

module.exports = User;