import pool from "../database/connectDB.js";

export const getUserByEmail =
async (email) => {

    const result =
        await pool.query(

            `
            SELECT *

            FROM postgres.users

            WHERE email = $1
            `,
            [email]

        );

    return result.rows[0];

};