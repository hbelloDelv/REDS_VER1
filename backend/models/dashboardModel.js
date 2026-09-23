import pool from "../database/connectDB.js";



export const getDashboardKPIs = async () => {

    const result = await pool.query(

    `
    SELECT

        ------------------------------------
        -- PLOT KPIs
        ------------------------------------

        COUNT(*) AS total_plots,

      COUNT(*) AS total_plots,

                COUNT(
                    CASE
                        WHEN sales = 'FOR SALE'
                        THEN 1
                    END
                ) AS available_plots,

                COUNT(
                    CASE
                        WHEN sales = 'SOLD'
                        THEN 1
                    END
                ) AS sold_plots,

                COUNT(
                    CASE
                        WHEN sales = 'ON HOLD'
                        THEN 1
                    END
                ) AS on_hold_plots,

                COUNT(
                    CASE
                        WHEN sales = 'NOT FOR SALE'
                        THEN 1
                    END
                ) AS not_for_sale_plots,


        ------------------------------------
        -- FINANCIAL KPIs
        ------------------------------------

        COALESCE(
            SUM(total_amount_paid),
            0
        ) AS total_revenue,


        COALESCE(
            SUM(outstanding_payment),
            0
        ) AS outstanding_payments,


        COALESCE(
            SUM(cost),
            0
        ) AS expected_revenue,


        COALESCE(
            SUM(infrastructure_cost),
            0
        ) AS infrastructure_cost



    FROM postgres.sample_plots
    `
);

    return result.rows[0];
};



// what kind of building 5, 4 3 bedrooms
export const getBuildingTypeDistribution = async () => {

    const query = `
        SELECT
                    building_type,
            COUNT(*) AS total
        FROM postgres.sample_plots
        WHERE building_type IS NOT NULL
        AND building_type <> 'NA'
        GROUP BY building_type
        ORDER BY total DESC;
    `;

    const result = await pool.query(query);

    return result.rows;
};



// what is are building use for
export const getPurposeDistribution = async () => {

    const query = `
        SELECT
            purpose,
            COUNT(*) AS total
        FROM postgres.sample_plots
        GROUP BY purpose
        ORDER BY total DESC
    `;

    const result = await pool.query(query);

    return result.rows;
};
   


// Block distribution
export const getBlockDistribution = async () => {

    const query = `
        SELECT
            block,
            COUNT(*) AS total
        FROM postgres.sample_plots
        GROUP BY block
        ORDER BY total DESC
    `;

    const result = await pool.query(query);

    return result.rows;
};


// sales summary for each block
export const getBlockSalesSummary = async () => {

    const query = `
        SELECT
            block,

            COUNT(*) AS total,

            COUNT(
                CASE
                    WHEN sales = 'SOLD'
                    THEN 1
                END
            ) AS sold,

            COUNT(
                CASE
                    WHEN sales = 'FOR SALE'
                    THEN 1
                END
            ) AS available,

            COUNT(
                CASE
                    WHEN sales = 'ON HOLD'
                    THEN 1
                END
            ) AS on_hold,

            COUNT(
                CASE
                    WHEN sales = 'NOT FOR SALE'
                    THEN 1
                END
            ) AS not_for_sale

        FROM postgres.sample_plots

        GROUP BY block

        ORDER BY block;
    `;

    const result = await pool.query(query);

    return result.rows;
};


export const getRevenueSummary = async () => {

    const result = await pool.query(`
    
        SELECT
        
            COALESCE(
                SUM(pa.purchase_amount),
                0
            ) AS expected_revenue,
            
            COALESCE(
                SUM(p.amount_paid),
                0
            ) AS collected_revenue
            
        FROM postgres.plot_allocations pa
        
        LEFT JOIN postgres.payments p
        ON pa.allocation_id = p.allocation_id
    
    `);

    return result.rows[0];

};