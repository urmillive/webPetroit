const mongoose = require("mongoose");
const getConnection = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);

        if (conn) {
            console.log(`MongoDB Connected on ${conn.connection.host}`);
        } else {
            console.log("Failed to connect DB");
        }
    } catch (error) {
        console.log(`Failed with error: ${error.message}`);
    }
};

module.exports = getConnection;