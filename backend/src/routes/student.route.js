const express = require("express");
const multer = require('multer');
const router = express.Router();
const studentController = require('../controllers/student.controller');

const path = require('path');
const authMiddleware = require("../middlewares/auth.middleware");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Specify the destination folder where uploaded files will be stored
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

router.use(authMiddleware);

router.get('/', studentController.getAllStudents);
router.post('/', studentController.createStudent);
router.get('/:id', studentController.getStudent);
router.put('/:id', studentController.updateStudent);
router.delete('/:id', studentController.deleteStudent);
router.put('/:id/profile',
    upload.single('profile'),
    studentController.updateProfile
);
module.exports = router;