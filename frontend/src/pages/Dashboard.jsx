import {
  Users,
  Map,
  ClipboardList,
  Wallet,
} from "lucide-react";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
} from "recharts";

export default function Dashboard() {
  const stats = [
    {
      title: "Customers",
      value: "2,450",
      icon: Users,
      color: "bg-blue-500",
    },
    {
      title: "Available Plots",
      value: "120",
      icon: Map,
      color: "bg-green-500",
    },
    {
      title: "Allocated Plots",
      value: "80",
      icon: ClipboardList,
      color: "bg-orange-500",
    },
    {
      title: "Revenue",
      value: "₦750M",
      icon: Wallet,
      color: "bg-violet-600",
    },
  ];

  const revenueData = [
    { month: "Jan", revenue: 80 },
    { month: "Feb", revenue: 120 },
    { month: "Mar", revenue: 150 },
    { month: "Apr", revenue: 220 },
    { month: "May", revenue: 280 },
    { month: "Jun", revenue: 320 },
  ];

  const allocationData = [
    { month: "Jan", plots: 8 },
    { month: "Feb", plots: 12 },
    { month: "Mar", plots: 18 },
    { month: "Apr", plots: 25 },
    { month: "May", plots: 30 },
    { month: "Jun", plots: 40 },
  ];

  const recentAllocations = [
    {
      customer: "Musa Bello",
      plot: "A-102",
      status: "Approved",
    },
    {
      customer: "Sarah John",
      plot: "B-055",
      status: "Pending",
    },
    {
      customer: "Aliyu Musa",
      plot: "C-011",
      status: "Approved",
    },
  ];

  const recentPayments = [
    {
      customer: "Musa Bello",
      amount: "₦2,500,000",
    },
    {
      customer: "Sarah John",
      amount: "₦1,000,000",
    },
    {
      customer: "Ibrahim Lawal",
      amount: "₦3,200,000",
    },
  ];

  return (
    <div className="space-y-8">

      {/* PAGE TITLE */}
      <h1 className="text-4xl font-bold text-slate-800">
        REDS Dashboard
      </h1>

      {/* KPI CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="bg-white rounded-2xl shadow-sm p-6 flex justify-between items-center"
            >
              <div>
                <p className="text-sm text-slate-500">
                  {item.title}
                </p>

                <h2 className="text-3xl font-bold mt-2">
                  {item.value}
                </h2>
              </div>

              <div
                className={`${item.color} h-14 w-14 rounded-xl flex items-center justify-center`}
              >
                <Icon
                  size={26}
                  className="text-white"
                />
              </div>
            </div>
          );
        })}

      </div>

      {/* CHARTS */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

        {/* Revenue Chart */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">

          <h3 className="text-lg font-semibold mb-6">
            Revenue Trend
          </h3>

          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />

                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#7C3AED"
                  fill="#C4B5FD"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

        </div>

        {/* Plot Allocation */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">

          <h3 className="text-lg font-semibold mb-6">
            Plot Allocations
          </h3>

          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={allocationData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />

                <Bar
                  dataKey="plots"
                  fill="#2563EB"
                  radius={[8, 8, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

        </div>

      </div>

      {/* TABLES + QUICK ACTIONS */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        {/* RECENT ALLOCATIONS */}
        <div className="bg-white rounded-2xl shadow-sm p-6">

          <h3 className="text-lg font-semibold mb-4">
            Recent Allocations
          </h3>

          <table className="w-full">

            <thead>
              <tr className="border-b">
                <th className="text-left py-2">
                  Customer
                </th>

                <th className="text-left py-2">
                  Plot
                </th>

                <th className="text-left py-2">
                  Status
                </th>
              </tr>
            </thead>

            <tbody>

              {recentAllocations.map((item, index) => (
                <tr
                  key={index}
                  className="border-b"
                >
                  <td className="py-3">
                    {item.customer}
                  </td>

                  <td>{item.plot}</td>

                  <td>
                    <span
                      className={
                        item.status === "Approved"
                          ? "text-green-600"
                          : "text-orange-500"
                      }
                    >
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}

            </tbody>

          </table>

        </div>

        {/* RECENT PAYMENTS */}
        <div className="bg-white rounded-2xl shadow-sm p-6">

          <h3 className="text-lg font-semibold mb-4">
            Recent Payments
          </h3>

          <div className="space-y-4">

            {recentPayments.map((item, index) => (
              <div
                key={index}
                className="flex justify-between border-b pb-3"
              >
                <span>{item.customer}</span>

                <span className="font-semibold">
                  {item.amount}
                </span>
              </div>
            ))}

          </div>

        </div>

        {/* QUICK ACTIONS */}
        <div className="bg-white rounded-2xl shadow-sm p-6">

          <h3 className="text-lg font-semibold mb-5">
            Quick Actions
          </h3>

          <div className="grid grid-cols-2 gap-3">

            <button className="bg-violet-600 text-white rounded-xl py-3 hover:bg-violet-700">
              Add Customer
            </button>

            <button className="bg-blue-600 text-white rounded-xl py-3 hover:bg-blue-700">
              Allocate Plot
            </button>

            <button className="bg-green-600 text-white rounded-xl py-3 hover:bg-green-700">
              Record Payment
            </button>

            <button className="bg-slate-700 text-white rounded-xl py-3 hover:bg-slate-800">
              Create User
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}