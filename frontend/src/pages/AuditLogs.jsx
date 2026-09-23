import { Search } from "lucide-react";

export default function AuditLogs() {
  const logs = [
    {
      user: "Haruna Bello",
      action: "Created Customer",
      module: "Customers",
      date: "20 Jun 2026",
      time: "10:25 AM",
    },
    {
      user: "Sarah John",
      action: "Allocated Plot A-102",
      module: "Allocations",
      date: "21 Jun 2026",
      time: "11:40 AM",
    },
    {
      user: "Aliyu Musa",
      action: "Recorded Payment",
      module: "Payments",
      date: "22 Jun 2026",
      time: "2:15 PM",
    },
    {
      user: "Haruna Bello",
      action: "Created User",
      module: "Users",
      date: "22 Jun 2026",
      time: "4:10 PM",
    },
  ];

  return (
    <div className="space-y-6">

      <h1 className="text-4xl font-bold text-slate-800">
        Audit Logs
      </h1>

      {/* Search */}

      <div className="bg-white rounded-2xl p-4 shadow-sm">

        <div className="relative">

          <Search
            size={20}
            className="absolute left-4 top-3.5 text-slate-400"
          />

          <input
            type="text"
            placeholder="Search activity..."
            className="w-full border border-slate-200 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-violet-500"
          />

        </div>

      </div>

      {/* Logs Table */}

      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="bg-slate-50">

              <tr>
                <th className="text-left px-6 py-4">User</th>
                <th className="text-left px-6 py-4">Action</th>
                <th className="text-left px-6 py-4">Module</th>
                <th className="text-left px-6 py-4">Date</th>
                <th className="text-left px-6 py-4">Time</th>
              </tr>

            </thead>

            <tbody>

              {logs.map((log, index) => (

                <tr
                  key={index}
                  className="border-t"
                >

                  <td className="px-6 py-4">
                    {log.user}
                  </td>

                  <td className="px-6 py-4">
                    {log.action}
                  </td>

                  <td className="px-6 py-4">
                    {log.module}
                  </td>

                  <td className="px-6 py-4">
                    {log.date}
                  </td>

                  <td className="px-6 py-4">
                    {log.time}
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