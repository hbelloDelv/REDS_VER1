import { useEffect, useState } from "react";

import {
  Search,
  Plus,
  Loader2,
  X
} from "lucide-react";

import {
  getCustomers,
  createCustomer,
  getCustomerProfile
} from "../services/customerService";

export default function Customer() {

  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showModal, setShowModal] = useState(false);

  const [showProfileModal, setShowProfileModal] =
    useState(false);

  const [profileLoading, setProfileLoading] =
    useState(false);

  const [selectedCustomer, setSelectedCustomer] =
    useState(null);

  const [formData, setFormData] = useState({
    full_name: "",
    phone_number: "",
    email: "",
    residential_address: ""
  });

  useEffect(() => {
    loadCustomers();
  }, []);

  const loadCustomers = async () => {

    try {

      setLoading(true);

      const response =
        await getCustomers();

      setCustomers(
        response.data || []
      );

    } catch (error) {

      console.error(error);

      setError(
        "Failed to load customers"
      );

    } finally {

      setLoading(false);

    }

  };

  const handleCreateCustomer =
    async (e) => {

      e.preventDefault();

      try {

        await createCustomer(
          formData
        );

        setShowModal(false);

        setFormData({
          full_name: "",
          phone_number: "",
          email: "",
          residential_address: ""
        });

        loadCustomers();

      } catch (error) {

        console.error(error);

        alert(
          "Failed to create customer"
        );

      }

    };

  const handleViewCustomer =
    async (id) => {

      try {

        setProfileLoading(true);

        const response =
          await getCustomerProfile(id);

        console.log(
          "Customer Profile:",
          response.data
        );

        setSelectedCustomer(
          response.data
        );

        setShowProfileModal(true);

      } catch (error) {

        console.error(error);

        alert(
          "Failed to load customer profile"
        );

      } finally {

        setProfileLoading(false);

      }

    };

  if (loading) {

    return (

      <div className="flex justify-center items-center h-[70vh]">

        <div className="flex flex-col items-center gap-3">

          <Loader2
            size={40}
            className="animate-spin text-violet-600"
          />

          <p className="text-slate-500">
            Loading customers...
          </p>

        </div>

      </div>

    );

  }

  if (error) {

    return (

      <div className="bg-red-100 text-red-600 p-4 rounded-xl">
        {error}
      </div>

    );

  }

  return (

    <div className="space-y-6">

      {/* Header */}

      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">

        <h1 className="text-4xl font-bold text-slate-800">
          Customers
        </h1>

        <button
          onClick={() =>
            setShowModal(true)
          }
          className="bg-violet-600 text-white px-5 py-3 rounded-xl flex items-center gap-2"
        >

          <Plus size={18} />

          Add Customer

        </button>

      </div>

      {/* Search */}

      <div className="bg-white p-4 rounded-2xl shadow-sm">

        <div className="relative">

          <Search
            size={18}
            className="absolute left-3 top-3 text-slate-400"
          />

          <input
            type="text"
            placeholder="Search customer..."
            className="w-full border rounded-xl pl-10 pr-4 py-3"
          />

        </div>

      </div>

      {/* Table */}

      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="bg-slate-50">

              <tr>

                <th className="text-left p-4">
                  Name
                </th>

                <th className="text-left p-4">
                  Phone
                </th>

                <th className="text-left p-4">
                  Email
                </th>

                <th className="text-left p-4">
                  Status
                </th>

                <th className="text-left p-4">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {customers.length === 0 ? (

                <tr>

                  <td
                    colSpan="5"
                    className="text-center py-10"
                  >
                    No customers found
                  </td>

                </tr>

              ) : (

                customers.map((customer) => (

                  <tr
                    key={customer.customer_id}
                    className="border-t"
                  >

                    <td className="p-4">
                      {customer.full_name}
                    </td>

                    <td className="p-4">
                      {customer.phone_number}
                    </td>

                    <td className="p-4">
                      {customer.email}
                    </td>

                    <td className="p-4">

                      <span className="px-3 py-1 rounded-full text-sm bg-green-100 text-green-700">

                        Active

                      </span>

                    </td>

                    <td className="p-4">

                      <div className="flex gap-2">

                        <button
                          onClick={() =>
                            handleViewCustomer(
                              customer.customer_id
                            )
                          }
                          className="px-3 py-1 bg-green-600 text-white rounded-lg"
                        >
                          View
                        </button>

                        <button className="px-3 py-1 bg-blue-500 text-white rounded-lg">
                          Edit
                        </button>

                        <button className="px-3 py-1 bg-red-500 text-white rounded-lg">
                          Delete
                        </button>

                      </div>

                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

      </div>

      {/* Add Customer Modal */}

      {showModal && (

        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

          <div className="bg-white rounded-2xl p-6 w-full max-w-lg">

            <div className="flex justify-between items-center mb-6">

              <h2 className="text-2xl font-bold">
                Add Customer
              </h2>

              <button
                onClick={() =>
                  setShowModal(false)
                }
              >
                <X />
              </button>

            </div>

            <form
              onSubmit={handleCreateCustomer}
              className="space-y-4"
            >

              <input
                type="text"
                placeholder="Full Name"
                value={formData.full_name}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    full_name: e.target.value
                  })
                }
                className="w-full border p-3 rounded-xl"
                required
              />

              <input
                type="text"
                placeholder="Phone Number"
                value={formData.phone_number}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    phone_number: e.target.value
                  })
                }
                className="w-full border p-3 rounded-xl"
                required
              />

              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    email: e.target.value
                  })
                }
                className="w-full border p-3 rounded-xl"
              />

              <textarea
                rows="3"
                placeholder="Residential Address"
                value={formData.residential_address}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    residential_address:
                      e.target.value
                  })
                }
                className="w-full border p-3 rounded-xl"
              />

              <button
                type="submit"
                className="w-full bg-violet-600 text-white py-3 rounded-xl"
              >
                Save Customer
              </button>

            </form>

          </div>

        </div>

      )}

      {/* Profile Modal */}

      {showProfileModal &&
        selectedCustomer && (

        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">

          <div className="bg-white rounded-2xl p-6 w-full max-w-6xl max-h-[90vh] overflow-y-auto">

            <div className="flex justify-between items-center mb-6">

              <h2 className="text-3xl font-bold">
                Customer Profile
              </h2>

              <button
                onClick={() =>
                  setShowProfileModal(false)
                }
              >
                <X size={30} />
              </button>

            </div>

            {profileLoading ? (

              <div className="flex justify-center py-10">

                <Loader2
                  className="animate-spin"
                  size={40}
                />

              </div>

            ) : (

              <>
                {/* Customer Details */}
                <div className="grid md:grid-cols-2 gap-6 mb-6">

                  <div className="bg-slate-50 p-5 rounded-xl">
                    <h3 className="font-semibold mb-2">Full Name</h3>
                    <p>{selectedCustomer.customer?.full_name}</p>
                  </div>

                  <div className="bg-slate-50 p-5 rounded-xl">
                    <h3 className="font-semibold mb-2">Phone Number</h3>
                    <p>{selectedCustomer.customer?.phone_number}</p>
                  </div>

                  <div className="bg-slate-50 p-5 rounded-xl">
                    <h3 className="font-semibold mb-2">Email</h3>
                    <p>{selectedCustomer.customer?.email}</p>
                  </div>

                  <div className="bg-slate-50 p-5 rounded-xl">
                    <h3 className="font-semibold mb-2">Address</h3>
                    <p>{selectedCustomer.customer?.residential_address}</p>
                  </div>

                </div>

                {/* Summary */}
                <div className="grid md:grid-cols-4 gap-4 mb-8">

                  <div className="bg-blue-50 p-5 rounded-xl">
                    <p>Total Plots</p>
                    <h2 className="text-4xl font-bold">
                      {selectedCustomer.summary?.totalPlots || 0}
                    </h2>
                  </div>

                  <div className="bg-purple-50 p-5 rounded-xl">
                    <p>Purchase Amount</p>
                    <h2 className="text-3xl font-bold">
                      ₦{(selectedCustomer.summary?.purchaseAmount || 0).toLocaleString()}
                    </h2>
                  </div>

                  <div className="bg-green-50 p-5 rounded-xl">
                    <p>Amount Paid</p>
                    <h2 className="text-3xl font-bold text-green-600">
                      ₦{(selectedCustomer.summary?.amountPaid || 0).toLocaleString()}
                    </h2>
                  </div>

                  <div className="bg-red-50 p-5 rounded-xl">
                    <p>Outstanding Balance</p>
                    <h2 className="text-3xl font-bold text-red-600">
                      ₦{(selectedCustomer.summary?.outstandingBalance || 0).toLocaleString()}
                    </h2>
                  </div>

                </div>

                {/* Plots */}

                <h3 className="text-2xl font-bold mb-4">
                  Allocated Plots
                </h3>

                <table className="w-full">

                  <thead className="bg-slate-100">

                    <tr>
                      <th className="p-3 text-left">Plot ID</th>
                      <th className="p-3 text-left">Block</th>
                      <th className="p-3 text-left">Building Type</th>
                      <th className="p-3 text-left">Purchase Amount</th>
                      <th className="p-3 text-left">Amount Paid</th>
                      <th className="p-3 text-left">Outstanding</th>
                    </tr>

                  </thead>

                  <tbody>

                    {selectedCustomer.plots?.length > 0 ? (

                      selectedCustomer.plots.map((plot) => (

                        <tr
                          key={plot.plot_id}
                          className="border-t"
                        >

                          <td className="p-3">
                            {plot.plot_id || "-"}
                          </td>

                          <td className="p-3">
                            {plot.block || "-"}
                          </td>

                          <td className="p-3">
                            {plot.building_type || "-"}
                          </td>

                          <td className="p-3">
                            ₦{(plot.purchase_amount || 0).toLocaleString()}
                          </td>

                          <td className="p-3 text-green-600">
                            ₦{(plot.amount_paid || 0).toLocaleString()}
                          </td>

                          <td className="p-3 text-red-600">
                            ₦{(plot.outstanding_balance || 0).toLocaleString()}
                          </td>

                        </tr>

                      ))

                    ) : (

                      <tr>

                        <td
                          colSpan="6"
                          className="text-center py-8 text-slate-500"
                        >
                          No plot allocation found
                        </td>

                      </tr>

                    )}

                  </tbody>

                </table>

              </>
            )}

          </div>

        </div>

      )}

    </div>

  );
}