import express from "express";

import {

    verifyToken,
    authorizeRoles

} from "../middlewares/authMiddleware.js";

import {

    fetchPayments,
    fetchPayment,
    fetchActiveAllocations,
    recordPayment,
    editPayment,
    removePayment

} from "../controllers/paymentController.js";

const router = express.Router();



/* ======================================================
   ACTIVE ALLOCATIONS
====================================================== */

router.get(

    "/allocations",

    verifyToken,

    authorizeRoles(

        "ADMIN",
        "SALES_REP",
        "FINANCE"

    ),

    fetchActiveAllocations

);



/* ======================================================
   GET ALL PAYMENTS
====================================================== */

router.get(

    "/",

    verifyToken,

    authorizeRoles(

        "ADMIN",
        "SALES_REP",
        "FINANCE"

    ),

    fetchPayments

);



/* ======================================================
   GET SINGLE PAYMENT
====================================================== */

router.get(

    "/:id",

    verifyToken,

    authorizeRoles(

        "ADMIN",
        "SALES_REP",
        "FINANCE"

    ),

    fetchPayment

);



/* ======================================================
   CREATE PAYMENT
====================================================== */

router.post(

    "/",

    verifyToken,

    authorizeRoles(

        "ADMIN",
        "SALES_REP",
        "FINANCE"

    ),

    recordPayment

);



/* ======================================================
   UPDATE PAYMENT
====================================================== */

router.put(

    "/:id",

    verifyToken,

    authorizeRoles(

        "ADMIN",
        "SALES_REP",
        "FINANCE"

    ),

    editPayment

);



/* ======================================================
   DELETE PAYMENT
====================================================== */

router.delete(

    "/:id",

    verifyToken,

    authorizeRoles(

        "ADMIN"

    ),

    removePayment

);

export default router;