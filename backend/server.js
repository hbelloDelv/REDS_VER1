import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import pool from "./database/connectDB.js";

const PORT = process.env.PORT || 5000;

pool.query("SELECT NOW()", (err, res) => {
    if(err){
        console.log("Database connection failed");
        console.log(err.message);
    } else {
        console.log("Database connected successfully");
        console.log(res.rows);
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});