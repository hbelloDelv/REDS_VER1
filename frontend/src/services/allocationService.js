import api from "./api";

// =============================
// GET ALL ALLOCATIONS
// =============================
export const getAllocations = async () => {
    const response = await api.get("/allocations");
    return response.data;
};

// =============================
// GET SINGLE ALLOCATION
// =============================
export const getAllocation = async (id) => {
    const response = await api.get(`/allocations/${id}`);
    return response.data;
};

// =============================
// CREATE ALLOCATION
// =============================
export const createAllocation = async (allocationData) => {
    const response = await api.post(
        "/allocations",
        allocationData
    );

    return response.data;
};

// =============================
// UPDATE ALLOCATION
// =============================
export const updateAllocation = async (
    id,
    allocationData
) => {

    const response = await api.put(
        `/allocations/${id}`,
        allocationData
    );

    return response.data;
};

// =============================
// CANCEL ALLOCATION
// =============================
export const cancelAllocation = async (id) => {

    const response = await api.delete(
        `/allocations/${id}`
    );

    return response.data;
};