import { Search, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import {
    getPayments,
    getPaymentSummary
} from "../services/paymentService";

export default function Payments() {

const [payments, setPayments] = useState([]);
const [summary, setSummary] = useState({
    total_revenue: 0,
    active_allocations: 0,
    outstanding_balance: 0
});

useEffect(() => {

    loadPayments();

    loadSummary();

}, []);

const loadPayments = async () => {

    try {

        const response = await getPayments();

        setPayments(response.data);

    } catch (error) {

        console.error(error);

        alert("Failed to load payments.");

    }

};


const loadSummary = async () => {

    try {

        const response =
            await getPaymentSummary();

        setSummary(response.data);

    } catch (error) {

        console.error(error);

    }

};

  return (
    <div className="space-y-6">

      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

        <h1 className="text-4xl font-bold text-slate-800">
          Payments
        </h1>

        <button className="bg-violet-600 hover:bg-violet-700 text-white px-5 py-3 rounded-xl flex items-center gap-2">
          <Plus size={18} />
          Record Payment
        </button>

      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <div className="bg-white rounded-2xl shadow-sm p-6">
          <p className="text-slate-500 text-sm">
            Total Revenue
          </p>

            <h2 className="text-3xl font-bold mt-2">

                ₦{Number(summary.total_revenue).toLocaleString()}

            </h2>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6">
          <p className="text-slate-500 text-sm">
              Active Allocations
          </p>

          <h2 className="text-3xl font-bold mt-2">
              {summary.active_allocations}
          </h2>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6">
          <p className="text-slate-500 text-sm">
            Outstanding Balance
          </p>

          <h2 className="text-3xl font-bold mt-2 text-red-600">
                ₦{Number(summary.outstanding_balance || 0).toLocaleString()}
          </h2>
        </div>

      </div>

      {/* Search */}
      <div className="bg-white rounded-2xl p-4 shadow-sm">

        <div className="relative">

          <Search
            size={20}
            className="absolute left-4 top-3.5 text-slate-400"
          />

          <input
            type="text"
            placeholder="Search payment..."
            className="w-full border border-slate-200 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-violet-500"
          />

        </div>

      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="bg-slate-50">

              <tr>

                <th className="text-left px-6 py-4">
                  Receipt No
                </th>

                <th className="text-left px-6 py-4">
                  Customer
                </th>

                <th className="text-left px-6 py-4">
                  Amount
                </th>

                <th className="text-left px-6 py-4">
                  Date
                </th>

                <th className="text-left px-6 py-4">
                  Status
                </th>

                <th className="text-left px-6 py-4">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>
                {payments.map((item) => (

                    <tr
                        key={item.payment_id}
                        className="border-t"
                    >

                  <td className="px-6 py-4">
                    {item.receipt_number}
                  </td>

                  <td className="px-6 py-4">
                    {item.full_name}
                  </td>

                  <td className="px-6 py-4">
                    ₦{Number(item.amount_paid).toLocaleString()}
                  </td>

                  <td className="px-6 py-4">
                    {new Date(item.payment_date).toLocaleDateString()}
                  </td>

                <td className="px-6 py-4">

                  <span
                      className={`px-3 py-1 rounded-full text-sm font-medium
                      ${
                          item.payment_status === "PAID"
                              ? "bg-green-100 text-green-700"
                              : item.payment_status === "PART_PAYMENT"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-red-100 text-red-700"
                      }`}
                  >
                      {
                          item.payment_status === "PAID"
                              ? "Paid"
                              : item.payment_status === "PART_PAYMENT"
                              ? "Part Payment"
                              : "Pending"
                      }
                  </span>

              </td>
                  

                  <td className="px-6 py-4 flex gap-2">

                    <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">
                      View
                    </button>

                    <button className="bg-slate-700 text-white px-4 py-2 rounded-lg">
                      Receipt
                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}