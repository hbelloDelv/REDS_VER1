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
    removePayment,
    fetchPaymentSummary

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



/* ==========================================
   PAYMENT SUMMARY
========================================== */

router.get(
    "/summary",
    verifyToken,
    authorizeRoles(
        "ADMIN",
        "FINANCE",
        "SALES_REP"
    ),
    fetchPaymentSummary
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