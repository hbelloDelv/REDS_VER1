import pool from "../database/connectDB.js";

/* ==========================================================
   GET ALL PAYMENTS
========================================================== */

export const getAllPayments = async () => {

    const result = await pool.query(`
        SELECT

            p.payment_id,
            p.amount_paid,
            p.payment_method,
            p.payment_status,
            p.receipt_number,
            p.payment_date,

            pa.allocation_id,
            pa.purchase_amount,

            c.customer_id,
            c.full_name,

            sp.objectid,
            sp.plot_id,
            sp.block

        FROM postgres.payments p

        INNER JOIN postgres.plot_allocations pa
            ON p.allocation_id = pa.allocation_id

        INNER JOIN postgres.customers c
            ON pa.customer_id = c.customer_id

        INNER JOIN postgres.sample_plots sp
            ON pa.plot_id = sp.objectid

        ORDER BY p.payment_date DESC
    `);

    return result.rows;

};



/* ==========================================================
   GET SINGLE PAYMENT
========================================================== */

export const getPaymentById = async (paymentId) => {

    const result = await pool.query(
        `
        SELECT

            p.payment_id,
            p.amount_paid,
            p.payment_method,
            p.payment_status,
            p.receipt_number,
            p.payment_date,

            pa.allocation_id,
            pa.purchase_amount,

            c.customer_id,
            c.full_name,
            c.phone_number,
            c.email,

            sp.objectid,
            sp.plot_id,
            sp.block,
            sp.building_type

        FROM postgres.payments p

        INNER JOIN postgres.plot_allocations pa
            ON p.allocation_id = pa.allocation_id

        INNER JOIN postgres.customers c
            ON pa.customer_id = c.customer_id

        INNER JOIN postgres.sample_plots sp
            ON pa.plot_id = sp.objectid

        WHERE p.payment_id = $1
        `,
        [paymentId]
    );

    return result.rows[0];

};



/* ==========================================================
   GET ACTIVE ALLOCATIONS
========================================================== */

export const getActiveAllocations = async () => {

    const result = await pool.query(`
        SELECT

            pa.allocation_id,
            c.full_name,
            sp.plot_id,
            sp.block,
            pa.purchase_amount

        FROM postgres.plot_allocations pa

        INNER JOIN postgres.customers c
            ON pa.customer_id = c.customer_id

        INNER JOIN postgres.sample_plots sp
            ON pa.plot_id = sp.objectid

        WHERE pa.allocation_status='ACTIVE'

        ORDER BY c.full_name
    `);

    return result.rows;

};



/* ==========================================================
   CREATE PAYMENT
========================================================== */

export const createPayment = async (

    allocation_id,
    amount_paid,
    payment_method,
    payment_status,
    payment_date,
    receipt_number,
    created_by

) => {

    const result = await pool.query(
        `
        INSERT INTO postgres.payments(

            allocation_id,
            amount_paid,
            payment_method,
            payment_status,
            payment_date,
            receipt_number,
            created_by

        )

        VALUES($1,$2,$3,$4,$5,$6,$7)

        RETURNING *
        `,
        [

            allocation_id,
            amount_paid,
            payment_method,
            payment_status,
            payment_date,
            receipt_number,
            created_by

        ]
    );

    return result.rows[0];

};



/* ==========================================================
   UPDATE PAYMENT
========================================================== */

export const updatePayment = async (

    paymentId,
    amount_paid,
    payment_method,
    payment_status,
    payment_date,
    receipt_number,
    updated_by

) => {

    const result = await pool.query(
        `
        UPDATE postgres.payments

        SET

            amount_paid=$2,
            payment_method=$3,
            payment_status=$4,
            payment_date=$5,
            receipt_number=$6,
            updated_by=$7

        WHERE payment_id=$1

        RETURNING *
        `,
        [

            paymentId,
            amount_paid,
            payment_method,
            payment_status,
            payment_date,
            receipt_number,
            updated_by

        ]
    );

    return result.rows[0];

};



/* ==========================================================
   DELETE PAYMENT
========================================================== */

export const deletePayment = async (
    paymentId
) => {

    await pool.query(
        `
        DELETE FROM postgres.payments

        WHERE payment_id=$1
        `,
        [paymentId]
    );

    return true;

};