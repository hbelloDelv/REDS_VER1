import express from "express";
import {
    verifyToken,
    authorizeRoles
}
from "../middlewares/authMiddleware.js";

import {
    fetchDashboardKPIs,
    fetchRevenueSummary,
    fetchBuildingTypeDistribution,
    fetchPurposeDistribution,
    fetchBlockDistribution,
    fetchBlockSalesSummary
} from "../controllers/dashboardController.js";



const router = express.Router();



// DASHBOARD KPI ROUTE
router.get(
    "/kpis",
    verifyToken,
    authorizeRoles(
        "ADMIN",
        "SALES_REP",
        "FINANCE"
    ),
    fetchDashboardKPIs
);


router.get(
    "/building-types",
    verifyToken,
    authorizeRoles(
        "ADMIN",
        "SALES_REP",
        "FINANCE"
    ),
    fetchBuildingTypeDistribution
);


router.get(
    "/purpose-distribution",
    verifyToken,
    authorizeRoles(
        "ADMIN",
        "SALES_REP",
        "FINANCE"
    ),
    fetchPurposeDistribution
);



router.get(
    "/block-distribution",
    verifyToken,
    authorizeRoles(
        "ADMIN",
        "SALES_REP",
        "FINANCE"
    ),
    fetchBlockDistribution
);


router.get(
    "/block-sales-summary",
    verifyToken,
    authorizeRoles(
        "ADMIN",
        "SALES_REP",
        "FINANCE"
    ),
    fetchBlockSalesSummary
);


router.get(
    "/revenue-summary",
    verifyToken,
    authorizeRoles(
        "ADMIN",
        "FINANCE"
    ),
    fetchRevenueSummary
);


export default router;