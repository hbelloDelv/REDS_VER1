import express from "express";

import {
    verifyToken,
    authorizeRoles
} from "../middlewares/authMiddleware.js";

import {
    createNewCustomer,
    fetchCustomers,
    fetchCustomerProfile
}
from "../controllers/customerController.js";

const router = express.Router();

router.get(
    "/:id/profile",
    verifyToken,
    authorizeRoles(
        "ADMIN",
        "SALES_REP",
        "FINANCE"
    ),
    fetchCustomerProfile
);

router.post(
    "/",
    verifyToken,
    authorizeRoles(
        "ADMIN",
        "SALES_REP"
    ),
    createNewCustomer
);

router.get(
    "/",
    verifyToken,
    authorizeRoles(
        "ADMIN",
        "SALES_REP",
        "FINANCE"
    ),
    fetchCustomers
);

export default router;