const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

require('dotenv').config();

const getConnection = require('./utils/db.connect');
const app = express();
const port = process.env.PORT || 3000;

const authRoutes = require('./routes/auth.route');
const studentRoutes = require('./routes/student.route');

getConnection();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/auth', authRoutes);
app.use('/students', studentRoutes);

app.get('/', (req, res) => {
    res.send("Hello ");
})

app.listen(3000, () => {
    console.log(`Server is running on port ${port}`);
})