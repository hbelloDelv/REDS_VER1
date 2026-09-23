import express from "express";
import {
    verifyToken,
    authorizeRoles
}
from "../middlewares/authMiddleware.js";

import {
    fetchPlots,
    fetchSinglePlot,
    editPlotStatus,
    fetchPlotOwner,
    fetchPlotDetails,
    fetchAvailablePlots

} from "../controllers/plotController.js";



const router = express.Router();

router.get(
    "/available",
    verifyToken,
    authorizeRoles(
        "ADMIN",
        "SALES_REP",
        "FINANCE"
    ),
    fetchAvailablePlots
);

router.get(
    "/:plotId/details",
    verifyToken,
    authorizeRoles(
        "ADMIN",
        "SALES_REP",
        "FINANCE"
    ),
    fetchPlotDetails
);

// GET ALL PLOTS
router.get(
    "/",
    verifyToken,
    authorizeRoles(
        "ADMIN",
        "SALES_REP",
        "FINANCE"
    ),
    fetchPlots
);

// GET SINGLE PLOT
router.get(
    "/:id",
    verifyToken,
    authorizeRoles(
        "ADMIN",
        "SALES_REP",
        "FINANCE"
    ),
    fetchSinglePlot
);

// UPDATE PLOT STATUS
router.put(
    "/:id",
    verifyToken,
    authorizeRoles(
        "ADMIN"
    ),
    editPlotStatus
);


// PLOT OWNER
router.get(
    "/:id/owner",
    verifyToken,
    authorizeRoles(
        "ADMIN",
        "SALES_REP",
        "FINANCE"
    ),
    fetchPlotOwner
);




export default router;