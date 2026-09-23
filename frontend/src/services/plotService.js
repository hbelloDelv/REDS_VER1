import api from "./api";

// =============================
// AVAILABLE PLOTS
// =============================
export const getAvailablePlots = async () => {

    const response = await api.get(
        "/plots/available"
    );

    return response.data;
};