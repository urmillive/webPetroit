const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    rollNo: {
        type: Number,
        required: [true, "Please Provide Roll No"],
    },
    firstName: {
        type: String,
        required: [true, "Please Provide First Name"],
        unique: false,
        trim: true,
    },
    lastName: {
        type: String,
        required: [true, "Please Provide Last Name"],
        unique: false,
        trim: true,
    },
    subjects: {
        type: [String],
        default: [],
    },
    address: {
        type: String,
        unique: false,
        trim: true,
    },
    gender: {
        type: String,
        trim: true,
    },
    photo: {
        type: String,
        required: false,
        default: ""
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }
});

studentSchema.index({ rollNo: 1, userId: 1 }, { unique: true });

const Student = mongoose.model('Student', studentSchema, 'students');

module.exports = Student;