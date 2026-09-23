import pool from "../database/connectDB.js";

export const createCustomer = async (customerData) => {

    const {
        full_name,
        phone_number,
        email,
        residential_address,
        means_of_id,
        id_number,
        sales_rep,
        created_by
    } = customerData;

    const query = `
        INSERT INTO postgres.customers
        (
              full_name,
              phone_number,
                email,
                residential_address,
                means_of_id,
                id_number,
                sales_rep,
                registration_date,
                created_by
        )
        VALUES
        (
            $1,$2,$3,$4,$5,$6,$7,CURRENT_DATE,$8
        )
        RETURNING *
    `;

    const result = await pool.query(
        query,
        [
            full_name,
            phone_number,
            email,
            residential_address,
            means_of_id,
            id_number,
            sales_rep,
            created_by
        ]
    );

    return result.rows[0];
};





export const getAllCustomers = async () => {

    const result = await pool.query(`
        SELECT *
        FROM postgres.customers
        ORDER BY customer_id
    `);

    return result.rows;

};



export const getCustomerProfile = async (
    customerId
) => {

    const result = await pool.query(
        `
        SELECT

            c.customer_id,
            c.full_name,
            c.phone_number,
            c.email,
            c.residential_address,

            sp.plot_id,
            sp.block,
            sp.building_type,

            COALESCE(
                pa.purchase_amount,
                0
            ) AS purchase_amount,

            COALESCE(
                SUM(p.amount_paid),
                0
            ) AS amount_paid,

            COALESCE(
                pa.purchase_amount,
                0
            ) -
            COALESCE(
                SUM(p.amount_paid),
                0
            ) AS outstanding_balance

        FROM postgres.customers c

        LEFT JOIN postgres.plot_allocations pa
            ON c.customer_id = pa.customer_id
        AND pa.allocation_status = 'ACTIVE'

        LEFT JOIN postgres.sample_plots sp
            ON pa.plot_id = sp.objectid

        LEFT JOIN postgres.payments p
            ON pa.allocation_id = p.allocation_id

        WHERE c.customer_id = $1

        GROUP BY

            c.customer_id,
            c.full_name,
            c.phone_number,
            c.email,
            c.residential_address,

            sp.plot_id,
            sp.block,
            sp.building_type,

            pa.purchase_amount
        `,
        [customerId]
    );

    return result.rows;

};