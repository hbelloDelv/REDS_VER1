import { Search, Plus } from "lucide-react";

export default function Payments() {
  const payments = [
    {
      receipt: "RCPT-001",
      customer: "Musa Bello",
      amount: "₦2,500,000",
      date: "10 Jun 2026",
      status: "Paid",
    },
    {
      receipt: "RCPT-002",
      customer: "Sarah John",
      amount: "₦1,000,000",
      date: "14 Jun 2026",
      status: "Partial",
    },
    {
      receipt: "RCPT-003",
      customer: "Aliyu Musa",
      amount: "₦500,000",
      date: "18 Jun 2026",
      status: "Outstanding",
    },
  ];

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
            ₦750M
          </h2>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6">
          <p className="text-slate-500 text-sm">
            Payments This Month
          </p>

          <h2 className="text-3xl font-bold mt-2">
            ₦85M
          </h2>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6">
          <p className="text-slate-500 text-sm">
            Outstanding Balance
          </p>

          <h2 className="text-3xl font-bold mt-2 text-red-600">
            ₦12M
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

              {payments.map((item, index) => (

                <tr
                  key={index}
                  className="border-t"
                >

                  <td className="px-6 py-4">
                    {item.receipt}
                  </td>

                  <td className="px-6 py-4">
                    {item.customer}
                  </td>

                  <td className="px-6 py-4">
                    {item.amount}
                  </td>

                  <td className="px-6 py-4">
                    {item.date}
                  </td>

                  <td className="px-6 py-4">

                    <span
                      className={`px-3 py-1 rounded-full text-sm
                      ${
                        item.status === "Paid"
                          ? "bg-green-100 text-green-700"
                          : item.status === "Partial"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {item.status}
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