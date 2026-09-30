import api from "./api";

// =============================
// GET ALL PAYMENTS
// =============================
export const getPayments = async () => {

    const response = await api.get("/payments");

    return response.data;

};


// =============================
// GET PAYMENT SUMMARY
// =============================
export const getPaymentSummary = async () => {

    const response = await api.get(
        "/payments/summary"
    );

    return response.data;

};