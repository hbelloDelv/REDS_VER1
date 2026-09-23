import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import {
    getUserByEmail
}
from "../models/authModel.js";

export const login =
async (req, res) => {

    try {

        const {
            email,
            password
        } = req.body;

        const user =
            await getUserByEmail(
                email
            );

        if (!user) {

            return res.status(401).json({

                success: false,
                message:
                    "Invalid credentials"

            });

        }

        const validPassword =
            await bcrypt.compare(
                password,
                user.password_hash
            );

        if (!validPassword) {

            return res.status(401).json({

                success: false,
                message:
                    "Invalid credentials"

            });

        }

        const token =
            jwt.sign(

                {

                    user_id:
                        user.user_id,

                    role:
                        user.role

                },

                "reds_secret_key",

                {

                    expiresIn:
                        "1d"

                }

            );

        res.status(200).json({

            success: true,

            token,

            user: {

                user_id:
                    user.user_id,

                full_name:
                    user.full_name,

                email:
                    user.email,

                role:
                    user.role

            }

        });

    } catch(error){

        res.status(500).json({

            success: false,
            message:
                error.message

        });

    }

};