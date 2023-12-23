const Student = require("../models/student.model");

const getAllStudents = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        const startIndex = (page - 1) * limit;

        const totalDocuments = await Student.countDocuments({ userId: req.user._id });

        const students = await Student.find({ userId: req.user._id })
            .sort({ rollNo: 1 })
            .skip(startIndex)
            .limit(limit);

        const paginationInfo = {
            totalPages: Math.ceil(totalDocuments / limit),
            currentPage: page,
            totalDocuments: totalDocuments
        };

        res.status(200).json({ students, paginationInfo });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const createStudent = async (req, res) => {
    const {
        rollNo,
        firstName,
        lastName,
        address,
        gender,
        subjects,
    } = req.body;

    try {
        const student = await Student.create({
            rollNo,
            firstName,
            lastName,
            address,
            gender,
            subjects,
            userId: req.user._id
        });

        res.status(200).json({ message: "Student Created Successfully", student: student });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const getStudent = async (req, res) => {
    try {
        const { id } = req.params;

        const student = await Student.findById(id);

        if (!student) {
            throw new Error('Student not found');
        }

        return res.status(200).json({
            student
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const updateStudent = async (req, res) => {
    try {
        const { id } = req.params;

        const student = await Student.findById(id);

        if (!student) {
            throw new Error('Student not found');
        }

        const {
            rollNo,
            firstName,
            lastName,
            address,
            gender,
            subjects,
        } = req.body;

        const updateFields = {};
        if (rollNo) updateFields.rollNo = rollNo;
        if (firstName) updateFields.firstName = firstName;
        if (lastName) updateFields.lastName = lastName;
        if (address) updateFields.address = address;
        if (gender) updateFields.gender = gender;
        if (subjects) updateFields.subjects = subjects;

        await Student.updateOne({ _id: id }, { $set: updateFields });

        const updateStudent = await Student.findById(id);

        res.status(200).json({ message: 'Student updated successfully', student: updateStudent });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// Profile Update
const updateProfile = async (req, res) => {
    try {
        const { id } = req.params;

        const student = await Student.findById(id);

        if (!student) {
            throw new Error('Student not found');
        }

        if (!req.file) {
            throw new Error('Please upload a file');
        }

        Student.updateOne({ _id: id }, { $set: { photo: req.file.path } });

        res.status(200).json({
            message: 'Profile updated successfully',
            photo: req.file.path
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const deleteStudent = async (req, res) => {
    try {
        const { id } = req.params;

        const student = await Student.findById(id);

        if (!student) {
            throw new Error('Student not found');
        }

        await Student.deleteOne({ _id: id });

        res.status(200).json({ message: 'Student deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

module.exports = {
    getAllStudents,
    createStudent,
    getStudent,
    updateStudent,
    updateProfile,
    deleteStudent,
}