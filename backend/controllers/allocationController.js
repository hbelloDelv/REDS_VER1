import {
    createAllocation,
    getAllAllocations,
    getAllocationById,
    updateAllocation,
    cancelAllocation,
    markPlotSold,
    markPlotAvailable
} from "../models/allocationModel.js";



/* ======================================================
   CREATE ALLOCATION
====================================================== */

export const allocatePlot = async (req, res) => {

    try {

        const {
            plot_id,
            customer_id,
            purchase_amount,
            payment_plan
        } = req.body;

        const allocation =
            await createAllocation(
                plot_id,
                customer_id,
                purchase_amount,
                payment_plan,
                req.user.user_id
            );

        await markPlotSold(plot_id);

        res.status(201).json({

            success: true,
            message: "Plot allocated successfully",
            data: allocation

        });

    } catch (error) {

        res.status(500).json({

            success: false,
            message: error.message

        });

    }

};



/* ======================================================
   GET ALL ALLOCATIONS
====================================================== */

export const fetchAllocations = async (req, res) => {

    try {

        const allocations =
            await getAllAllocations();

        res.status(200).json({

            success: true,
            count: allocations.length,
            data: allocations

        });

    } catch (error) {

        res.status(500).json({

            success: false,
            message: error.message

        });

    }

};



/* ======================================================
   GET SINGLE ALLOCATION
====================================================== */

export const fetchAllocation = async (req, res) => {

    try {

        const { id } = req.params;

        const allocation =
            await getAllocationById(id);

        if (!allocation) {

            return res.status(404).json({

                success: false,
                message: "Allocation not found"

            });

        }

        res.status(200).json({

            success: true,
            data: allocation

        });

    }catch (error) {

    console.error("GET ALLOCATION ERROR:");
    console.error(error);

    res.status(500).json({

        success: false,
        message: error.message

    });



    }

};




export const cancelAllocationController = async (req, res) => {

    try {

        const { id } = req.params;

        console.log("Controller started");

        await cancelAllocation(id);

        console.log("Model finished");

        console.log("Sending response");

        return res.status(200).json({

            success: true,
            message: "Allocation cancelled successfully."

        });

    }  catch (error) {

    console.error("CONTROLLER ERROR");
    console.error(error);

    return res.status(500).json({

        success: false,
        message: error.message,
        stack: error.stack

    });

}

};