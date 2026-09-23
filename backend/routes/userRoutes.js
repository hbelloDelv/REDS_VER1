import express
from "express";

import {
    verifyToken,
    authorizeRoles
}
from "../middlewares/authMiddleware.js";

import {

    fetchUsers,
    registerUser

}
from "../controllers/userController.js";

const router =
    express.Router();

router.get(
     "/",
    verifyToken,
    authorizeRoles("ADMIN"),
    fetchUsers
);

router.post(
         "/",
    verifyToken,
    authorizeRoles("ADMIN"),
    registerUser
);


export default router;