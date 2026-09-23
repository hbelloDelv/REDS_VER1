import {

    getAllPayments,
    getPaymentById,
    getActiveAllocations,
    createPayment,
    updatePayment,
    deletePayment

} from "../models/paymentModel.js";


/* ======================================================
   GET ALL PAYMENTS
====================================================== */

export const fetchPayments = async (req, res) => {

    try {

        const payments =
            await getAllPayments();

        res.status(200).json({

            success: true,
            count: payments.length,
            data: payments

        });

    } catch (error) {

        res.status(500).json({

            success: false,
            message: error.message

        });

    }

};



/* ======================================================
   GET SINGLE PAYMENT
====================================================== */

export const fetchPayment = async (req, res) => {

    try {

        const payment =
            await getPaymentById(req.params.id);

        if (!payment) {

            return res.status(404).json({

                success: false,
                message: "Payment not found"

            });

        }

        res.status(200).json({

            success: true,
            data: payment

        });

    } catch (error) {

        res.status(500).json({

            success: false,
            message: error.message

        });

    }

};



/* ======================================================
   GET ACTIVE ALLOCATIONS
====================================================== */

export const fetchActiveAllocations = async (req, res) => {

    try {

        const allocations =
            await getActiveAllocations();

        res.status(200).json({

            success: true,
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
   CREATE PAYMENT
====================================================== */

export const recordPayment = async (req, res) => {

    try {

        const {

            allocation_id,
            amount_paid,
            payment_method,
            payment_status,
            payment_date,
            receipt_number

        } = req.body;

        const payment =
            await createPayment(

                allocation_id,
                amount_paid,
                payment_method,
                payment_status,
                payment_date,
                receipt_number,
                req.user.user_id

            );

        res.status(201).json({

            success: true,
            message: "Payment recorded successfully.",
            data: payment

        });

    } catch (error) {

        res.status(500).json({

            success: false,
            message: error.message

        });

    }

};



/* ======================================================
   UPDATE PAYMENT
====================================================== */

export const editPayment = async (req, res) => {

    try {

        const {

            amount_paid,
            payment_method,
            payment_status,
            payment_date,
            receipt_number

        } = req.body;

        const payment =
            await updatePayment(

                req.params.id,

                amount_paid,
                payment_method,
                payment_status,
                payment_date,
                receipt_number,

                req.user.user_id

            );

        res.status(200).json({

            success: true,
            message: "Payment updated successfully.",
            data: payment

        });

    } catch (error) {

        res.status(500).json({

            success: false,
            message: error.message

        });

    }

};



/* ======================================================
   DELETE PAYMENT
====================================================== */

export const removePayment = async (req, res) => {

    try {

        await deletePayment(req.params.id);

        res.status(200).json({

            success: true,
            message: "Payment deleted successfully."

        });

    } catch (error) {

        res.status(500).json({

            success: false,
            message: error.message

        });

    }

};