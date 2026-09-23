import bcrypt from "bcryptjs";
import {

    getAllUsers,
    createUser

}
from "../models/userModel.js";

export const fetchUsers =
async (req, res) => {

    try {

        const users =
            await getAllUsers();

        res.status(200).json({

            success: true,
            count: users.length,
            data: users

        });

    } catch(error){

        res.status(500).json({

            success: false,
            message: error.message

        });

    }

};


export const registerUser =
async (req, res) => {

    try {

        const {

            full_name,
            email,
            password,
            role

        } = req.body;

       const hashedPassword =
    await bcrypt.hash(
        password,
        10
    );

const user =
    await createUser(

        full_name,
        email,
        hashedPassword,
        role

    );

        res.status(201).json({

            success: true,
            message:
                "User created successfully",

            data: user

        });

    } catch(error){

        res.status(500).json({

            success: false,
            message: error.message

        });

    }

};