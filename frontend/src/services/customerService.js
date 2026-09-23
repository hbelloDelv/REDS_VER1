import api from "./api";

export const getCustomers = async () => {
  const response =
    await api.get("/customers");

  return response.data;
};

export const createCustomer = async (
  customerData
) => {

  const response =
    await api.post(
      "/customers",
      customerData
    );

  return response.data;
};



export const getCustomerProfile = async (id) => {
  const response = await api.get(
    `/customers/${id}/profile`
  );

  return response.data;
};



// =============================
// GET CUSTOMERS FOR DROPDOWN
// =============================
export const getCustomerList = async () => {

    const response = await api.get(
        "/customers"
    );

    return response.data;
};