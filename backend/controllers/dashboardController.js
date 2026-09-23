import {
    getDashboardKPIs,
    getRevenueSummary,
    getBuildingTypeDistribution,
    getPurposeDistribution,
    getBlockDistribution,
    getBlockSalesSummary
}
from "../models/dashboardModel.js";



export const fetchDashboardKPIs = async (req, res) => {

    try {

        const dashboardData = await getDashboardKPIs();


        res.status(200).json({

            success: true,

            data: {

               plotKPIs: {

                    totalPlots:
                        Number(dashboardData.total_plots),

                    availablePlots:
                        Number(dashboardData.available_plots),

                    soldPlots:
                        Number(dashboardData.sold_plots),

                    onHoldPlots:
                        Number(dashboardData.on_hold_plots),

                    notForSalePlots:
                        Number(dashboardData.not_for_sale_plots)
                    },

                financialKPIs: {

                    totalRevenue:
                        Number(dashboardData.total_revenue),

                    outstandingPayments:
                        Number(dashboardData.outstanding_payments),

                    expectedRevenue:
                        Number(dashboardData.expected_revenue),

                    infrastructureCost:
                        Number(dashboardData.infrastructure_cost)
                }

            }

        });

    } catch (error) {

        res.status(500).json({

            success: false,
            message: error.message

        });

    }

};



export const fetchBuildingTypeDistribution = async (req, res) => {

    try {

        const data = await getBuildingTypeDistribution();

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


export const fetchPurposeDistribution = async (req, res) => {

    try {

        const data = await getPurposeDistribution();

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



export const fetchBlockDistribution = async (req, res) => {

    try {

        const data = await getBlockDistribution();

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



export const fetchBlockSalesSummary = async (req, res) => {

    try {

        const data = await getBlockSalesSummary();

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



export const fetchRevenueSummary = async (req, res) => {

    try {

        const revenue =
            await getRevenueSummary();

        const expectedRevenue =
            Number(revenue.expected_revenue);

        const collectedRevenue =
            Number(revenue.collected_revenue);

        const outstandingRevenue =
            expectedRevenue -
            collectedRevenue;

        const collectionRate =
            expectedRevenue > 0
            ? (
                collectedRevenue /
                expectedRevenue
              ) * 100
            : 0;

        res.status(200).json({

            success: true,

            data: {

                expectedRevenue,

                collectedRevenue,

                outstandingRevenue,

                collectionRate:
                    Number(
                        collectionRate.toFixed(2)
                    )

            }

        });

    } catch(error){

        res.status(500).json({

            success: false,
            message: error.message

        });

    }

};