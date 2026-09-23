import pool from "../database/connectDB.js";


//GET all plots
export const getAllPlots = async () => {

    const result = await pool.query(

        `SELECT
            objectid,
            plot_id,
            block,
            building_type,
            sales,
            cost

         FROM postgres.sample_plots

         ORDER BY objectid ASC`
    );

    return result.rows;
};


// GET SINGLE PLOT
export const getPlotById = async (id) => {

    const result = await pool.query(

        `SELECT
            objectid,
            plot_id,
            block,
            building_type,
            sales,
            cost

         FROM postgres.sample_plots

         WHERE objectid = $1`,

        [id]
    );

    return result.rows[0];
};


// UPDATE PLOT SALES STATUS
export const updatePlotStatus = async (
    id,
    sales
) => {

    const result = await pool.query(

        `UPDATE postgres.sample_plots

         SET sales = $1

         WHERE objectid = $2

         RETURNING
            objectid,
            plot_id,
            block,
            sales`,

        [sales, id]
    );

    return result.rows[0];
};


// Plot owner 
export const getPlotOwner = async (objectid) => {

    const query = `
        SELECT
            sp.objectid,
            sp.plot_id,
            sp.block,
            sp.building_type,

            c.customer_id,
            c.full_name,
            c.phone_number,
            c.email,

            pa.purchase_amount,
            pa.payment_plan,
            pa.allocation_status

        FROM postgres.sample_plots sp

        LEFT JOIN postgres.plot_allocations pa
        ON sp.objectid = pa.plot_id

        LEFT JOIN postgres.customers c
        ON pa.customer_id = c.customer_id

        WHERE sp.objectid = $1
    `;

    const result = await pool.query(
        query,
        [objectid]
    );

    return result.rows[0];
};



export const getPlotDetails = async (
    plotId
) => {

    const result = await pool.query(
        `
        SELECT

            sp.objectid,
            sp.plot_id,
            sp.block,
            sp.building_type,
            sp.sales,

            c.customer_id,
            c.full_name,
            c.phone_number,
            c.email,

            pa.purchase_amount,
            pa.payment_plan,

            COALESCE(
                SUM(p.amount_paid),
                0
            ) AS amount_paid,

            pa.purchase_amount -
            COALESCE(
                SUM(p.amount_paid),
                0
            ) AS outstanding_balance

        FROM postgres.sample_plots sp

        LEFT JOIN postgres.plot_allocations pa
        ON sp.objectid = pa.plot_id

        LEFT JOIN postgres.customers c
        ON pa.customer_id = c.customer_id

        LEFT JOIN postgres.payments p
        ON pa.allocation_id = p.allocation_id

        WHERE sp.plot_id = $1

        GROUP BY

            sp.objectid,
            sp.plot_id,
            sp.block,
            sp.building_type,
            sp.sales,

            c.customer_id,
            c.full_name,
            c.phone_number,
            c.email,

            pa.purchase_amount,
            pa.payment_plan
        `,
        [plotId]
    );

    return result.rows[0];

};


/* ==========================================================
   GET AVAILABLE PLOTS
========================================================== */

export const getAvailablePlots = async () => {

    const result = await pool.query(
        `
        SELECT

            objectid,
            plot_id,
            block,
            building_type,
            structure_type,
            purpose,
            cost

        FROM postgres.sample_plots

        WHERE sales = 'FOR SALE'

        ORDER BY
            block,
            plot_id
        `
    );

    return result.rows;

};
