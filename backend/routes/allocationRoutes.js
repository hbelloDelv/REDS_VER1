import express from "express";

import {
    verifyToken,
    authorizeRoles
} from "../middlewares/authMiddleware.js";

import {
    allocatePlot,
    fetchAllocations,
    fetchAllocation,
    editAllocation,
    cancelAllocationController
} from "../controllers/allocationController.js";

const router = express.Router();



/* ==========================================
   GET ALL ALLOCATIONS
========================================== */

router.get(
    "/",
    verifyToken,
    authorizeRoles(
        "ADMIN",
        "SALES_REP",
        "FINANCE"
    ),
    fetchAllocations
);



/* ==========================================
   GET SINGLE ALLOCATION
========================================== */

router.get(
    "/:id",
    verifyToken,
    authorizeRoles(
        "ADMIN",
        "SALES_REP",
        "FINANCE"
    ),
    fetchAllocation
);



/* ==========================================
   CREATE ALLOCATION
========================================== */

router.post(
    "/",
    verifyToken,
    authorizeRoles(
        "ADMIN",
        "SALES_REP"
    ),
    allocatePlot
);



/* ==========================================
   UPDATE ALLOCATION
========================================== */

router.put(
    "/:id",
    verifyToken,
    authorizeRoles(
        "ADMIN",
        "SALES_REP"
    ),
    editAllocation
);



/* ==========================================
   CANCEL ALLOCATION
========================================== */

router.delete(
    "/:id",
    verifyToken,
    authorizeRoles(
        "ADMIN"
    ),
    cancelAllocationController
);

export default router;