import { createCustomer,
         getAllCustomers,
          getCustomerProfile
} from "../models/customerModel.js";

export const createNewCustomer = async (req, res) => {

    try {

       const customer = await createCustomer({
            ...req.body,
            created_by: req.user.user_id
        });

        res.status(201).json({
            success: true,
            message: "Customer created successfully",
            data: customer
        });

    } catch(error){

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};


// Fetch customer
export const fetchCustomers = async (req, res) => {

    try {

        const customers =
            await getAllCustomers();

        res.status(200).json({
            success: true,
            count: customers.length,
            data: customers
        });

    } catch(error){

    console.error(
        "PROFILE ERROR:",
        error
    );

    res.status(500).json({

        success: false,
        message: error.message

    });

}

};



export const fetchCustomerProfile =
async (req, res) => {

    try {

        const { id } = req.params;

        const profile =
            await getCustomerProfile(id);

        if (profile.length === 0) {

            return res.status(404).json({

                success: false,
                message: "Customer not found"

            });

        }

        const customer = {

            customer_id:
                profile[0].customer_id,

            full_name:
                profile[0].full_name,

            phone_number:
                profile[0].phone_number,

            email:
                profile[0].email,

            residential_address:
                profile[0].residential_address

        };

        const plots = profile
            .filter(
                item => item.plot_id !== null
            )
            .map(item => ({

                plot_id:
                    item.plot_id,

                block:
                    item.block,

                building_type:
                    item.building_type,

                purchase_amount:
                    Number(
                        item.purchase_amount || 0
                    ),

                amount_paid:
                    Number(
                        item.amount_paid || 0
                    ),

                outstanding_balance:
                    Number(
                        item.outstanding_balance || 0
                    )

            }));

        const summary = {

            totalPlots:
                plots.length,

            purchaseAmount:
                plots.reduce(
                    (sum, plot) =>
                        sum +
                        plot.purchase_amount,
                    0
                ),

            amountPaid:
                plots.reduce(
                    (sum, plot) =>
                        sum +
                        plot.amount_paid,
                    0
                ),

            outstandingBalance:
                plots.reduce(
                    (sum, plot) =>
                        sum +
                        plot.outstanding_balance,
                    0
                )

        };

        res.status(200).json({

            success: true,

            data: {

                customer,
                plots,
                summary

            }

        });

    } catch(error){

    console.error(
        "PROFILE ERROR:",
        error
    );

    res.status(500).json({

        success: false,
        message: error.message

    });

}

    }
