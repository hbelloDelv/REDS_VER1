import pool
from "../database/connectDB.js";

export const getAllUsers = async () => {

    const result = await pool.query(
        `
        SELECT

            user_id,
            full_name,
            email,
            role,
            is_active,
            created_at

        FROM postgres.users

        ORDER BY user_id
        `
    );

    return result.rows;

};



export const createUser = async (

    full_name,
    email,
    password_hash,
    role

) => {

    const result = await pool.query(

        `
        INSERT INTO postgres.users (

            full_name,
            email,
            password_hash,
            role

        )

        VALUES (

            $1,
            $2,
            $3,
            $4

        )

        RETURNING
        user_id,
        full_name,
        email,
        role,
        is_active,
        created_at
        `,
        [
            full_name,
            email,
            password_hash,
            role
        ]

    );

    return result.rows[0];

};