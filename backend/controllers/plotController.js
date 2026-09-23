import {
    getAllPlots,
    getPlotById,
    updatePlotStatus,
    getPlotOwner,
    getPlotDetails,
    getAvailablePlots

} from "../models/plotModel.js";


export const fetchPlots = async (req, res) => {

    try {

        // get data from model
        const plots = await getAllPlots();

        // send response
        res.status(200).json({

            success: true,
            count: plots.length,
            data: plots

        });

    } catch (error) {

        res.status(500).json({

            success: false,
            message: error.message

        });

    }

};



// GET SINGLE PLOT
export const fetchSinglePlot = async (req, res) => {

    try {

        // get ID from URL
        const { id } = req.params;


        // fetch plot from database
        const plot = await getPlotById(id);


        // if plot does not exist
        if (!plot) {

            return res.status(404).json({

                success: false,
                message: "Plot not found"

            });

        }


        // success response
        res.status(200).json({

            success: true,
            data: plot

        });

    } catch (error) {

        res.status(500).json({

            success: false,
            message: error.message

        });

    }

};


// UPDATE PLOT STATUS
export const editPlotStatus = async (req, res) => {

    try {

        // get plot ID from URL
        const { id } = req.params;


        // get new sales value from request body
        const { sales } = req.body;


        // update database
        const updatedPlot = await updatePlotStatus(
            id,
            sales
        );


        // if plot does not exist
        if (!updatedPlot) {

            return res.status(404).json({

                success: false,
                message: "Plot not found"

            });

        }


        // success response
        res.status(200).json({

            success: true,
            message: "Plot updated successfully",
            data: updatedPlot

        });

    } catch (error) {

        res.status(500).json({

            success: false,
            message: error.message

        });

    }

};


// Plot owner
export const fetchPlotOwner = async (req, res) => {

    try {

        const data = await getPlotOwner(
            req.params.id
        );

        if (!data) {

            return res.status(404).json({
                success: false,
                message: "Plot not found"
            });

        }

        res.status(200).json({
            success: true,
            data
        });

    } catch(error){

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};



export const fetchPlotDetails = async (req, res) => {

    try {

        const { plotId } = req.params;

        const plot =
            await getPlotDetails(plotId);

        if (!plot) {

            return res.status(404).json({

                success: false,
                message: "Plot not found"

            });

        }

        res.status(200).json({

            success: true,
            data: plot

        });

    } catch(error){

        res.status(500).json({

            success: false,
            message: error.message

        });

    }

};


/* ======================================================
   GET AVAILABLE PLOTS
====================================================== */

export const fetchAvailablePlots = async (req, res) => {

    try {

        const plots =
            await getAvailablePlots();

        res.status(200).json({

            success: true,
            count: plots.length,
            data: plots

        });

    } catch (error) {

        res.status(500).json({

            success: false,
            message: error.message

        });

    }

};