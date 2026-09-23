import jwt from "jsonwebtoken";

export const verifyToken =
(req, res, next) => {

    try {

        const authHeader =
            req.headers.authorization;

        if (!authHeader) {

            return res.status(401).json({

                success: false,
                message:
                    "Access denied"

            });

        }

        const token =
            authHeader.split(" ")[1];

        const decoded =
            jwt.verify(

                token,

                "reds_secret_key"

            );

        req.user = decoded;

        next();

    } catch(error){

        return res.status(401).json({

            success: false,
            message:
                "Invalid token"

        });

    }

};




export const authorizeRoles =
(...roles) => {

    return (req, res, next) => {

        if (

            !roles.includes(
                req.user.role
            )

        ) {

            return res.status(403).json({

                success: false,
                message:
                    "Forbidden"

            });

        }

        next();

    };

};



