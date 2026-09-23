import pool from "../database/connectDB.js";


/* ==========================================================
   CREATE ALLOCATION
========================================================== */

export const createAllocation = async (
    plot_id,
    customer_id,
    purchase_amount,
    payment_plan,
    created_by
) => {

    const result = await pool.query(
        `
        INSERT INTO postgres.plot_allocations
        (
            plot_id,
            customer_id,
            allocation_date,
            purchase_amount,
            payment_plan,
            allocation_status,
            created_by
        )
        VALUES
        (
            $1,
            $2,
            CURRENT_DATE,
            $3,
            $4,
            'ACTIVE',
            $5
        )
        RETURNING *
        `,
        [
            plot_id,
            customer_id,
            purchase_amount,
            payment_plan,
            created_by
        ]
    );

    return result.rows[0];

};



/* ==========================================================
   GET ALL ALLOCATIONS
========================================================== */

export const getAllAllocations = async () => {

    const result = await pool.query(
        `
        SELECT

            pa.allocation_id,
            pa.allocation_date,
            pa.purchase_amount,
            pa.payment_plan,
            pa.allocation_status,

            c.customer_id,
            c.full_name,
            c.phone_number,

            sp.objectid,
            sp.plot_id,
            sp.block,
            sp.building_type,

            COALESCE(
                SUM(p.amount_paid),
                0
            ) AS amount_paid,

            pa.purchase_amount -
            COALESCE(
                SUM(p.amount_paid),
                0
            ) AS outstanding_balance

        FROM postgres.plot_allocations pa

        INNER JOIN postgres.customers c
            ON pa.customer_id = c.customer_id

        INNER JOIN postgres.sample_plots sp
            ON pa.plot_id = sp.objectid

        LEFT JOIN postgres.payments p
            ON pa.allocation_id = p.allocation_id

        WHERE pa.allocation_status = 'ACTIVE'

        GROUP BY

            pa.allocation_id,
            pa.allocation_date,
            pa.purchase_amount,
            pa.payment_plan,
            pa.allocation_status,

            c.customer_id,
            c.full_name,
            c.phone_number,

            sp.objectid,
            sp.plot_id,
            sp.block,
            sp.building_type

        ORDER BY pa.allocation_id DESC
        `
    );

    return result.rows;

};



/* ==========================================================
   GET SINGLE ALLOCATION
========================================================== */

export const getAllocationById = async (
    allocationId
) => {

    const result = await pool.query(
        `
        SELECT

            pa.allocation_id,
            pa.allocation_date,
            pa.purchase_amount,
            pa.payment_plan,
            pa.allocation_status,

            c.customer_id,
            c.full_name,
            c.phone_number,
            c.email,
            c.residential_address,

            sp.objectid,
            sp.plot_id,
            sp.block,
            sp.building_type,
            sp.structure_type,
            sp.purpose,
            sp.cost,

            COALESCE(
                SUM(p.amount_paid),
                0
            ) AS amount_paid,

            pa.purchase_amount -
            COALESCE(
                SUM(p.amount_paid),
                0
            ) AS outstanding_balance

        FROM postgres.plot_allocations pa

        INNER JOIN postgres.customers c
            ON pa.customer_id = c.customer_id

        INNER JOIN postgres.sample_plots sp
            ON pa.plot_id = sp.objectid

        LEFT JOIN postgres.payments p
            ON pa.allocation_id = p.allocation_id

        WHERE pa.allocation_id = $1

        GROUP BY

            pa.allocation_id,
            pa.allocation_date,
            pa.purchase_amount,
            pa.payment_plan,
            pa.allocation_status,

            c.customer_id,
            c.full_name,
            c.phone_number,
            c.email,
            c.residential_address,

            sp.objectid,
            sp.plot_id,
            sp.block,
            sp.building_type,
            sp.structure_type,
            sp.purpose,
            sp.cost
        `,
        [allocationId]
    );

    return result.rows[0];

};



/* ==========================================================
   UPDATE ALLOCATION
========================================================== */

export const updateAllocation = async (
    allocationId,
    purchase_amount,
    payment_plan,
    updated_by
) => {

    const result = await pool.query(
        `
        UPDATE postgres.plot_allocations

        SET

            purchase_amount = $1,
            payment_plan = $2,
            updated_by = $3

        WHERE allocation_id = $4

        RETURNING *
        `,
        [
            purchase_amount,
            payment_plan,
            updated_by,
            allocationId
        ]
    );

    return result.rows[0];

};



/* ==========================================================
   CANCEL ALLOCATION (SOFT DELETE)
========================================================== */

export const cancelAllocation = async (allocationId) => {

    const client = await pool.connect();

    try {

        await client.query("BEGIN");

        // Get the allocated plot
        const allocation = await client.query(
            `
            SELECT plot_id
            FROM postgres.plot_allocations
            WHERE allocation_id = $1
            `,
            [allocationId]
        );

        if (allocation.rows.length === 0) {

            throw new Error("Allocation not found");

        }

        const plotId = allocation.rows[0].plot_id;

        // Cancel allocation
        await client.query(
            `
            UPDATE postgres.plot_allocations
            SET allocation_status = 'CANCELLED'
            WHERE allocation_id = $1
            `,
            [allocationId]
        );


            console.log("Plot ID:", plotId);

            console.log("Updating sample_plots...");

            const result = await client.query(
            `
            UPDATE postgres.sample_plots
            SET sales = 'FOR SALE'
            WHERE objectid = $1
            RETURNING objectid, sales
            `,
            [plotId]
            );

            console.log(result.rows);

            await client.query("COMMIT");

            console.log("COMMIT SUCCESSFUL");

            console.log("Returning from cancelAllocation()");


        return true;

    } catch (error) {

        await client.query("ROLLBACK");

        throw error;

    } finally {

        client.release();

    }

};



/* ==========================================================
   MARK PLOT SOLD
========================================================== */

export const markPlotSold = async (
    objectid
) => {

    await pool.query(
        `
        UPDATE postgres.sample_plots

        SET sales = 'SOLD'

        WHERE objectid = $1
        `,
        [objectid]
    );

};



/* ==========================================================
   MARK PLOT AVAILABLE
========================================================== */

export const markPlotAvailable = async (
    objectid
) => {

    await pool.query(
        `
        UPDATE postgres.sample_plots

        SET sales = 'FOR SALE'

        WHERE objectid = $1
        `,
        [objectid]
    );

};