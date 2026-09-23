import { Search, Plus } from "lucide-react";

export default function Plots() {
  const plots = [
    {
      plotNo: "A-102",
      estate: "Phase 1",
      size: "500 sqm",
      status: "Available",
    },
    {
      plotNo: "B-205",
      estate: "Phase 2",
      size: "750 sqm",
      status: "Allocated",
    },
    {
      plotNo: "C-310",
      estate: "Phase 3",
      size: "1000 sqm",
      status: "Reserved",
    },
  ];

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

        <h1 className="text-4xl font-bold text-slate-800">
          Plots
        </h1>

        <button className="bg-violet-600 hover:bg-violet-700 text-white px-5 py-3 rounded-xl flex items-center gap-2">
          <Plus size={18} />
          Add Plot
        </button>

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
            placeholder="Search plot..."
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
                  Plot No
                </th>

                <th className="text-left px-6 py-4">
                  Estate
                </th>

                <th className="text-left px-6 py-4">
                  Size
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

              {plots.map((plot, index) => (

                <tr
                  key={index}
                  className="border-t"
                >

                  <td className="px-6 py-4">
                    {plot.plotNo}
                  </td>

                  <td className="px-6 py-4">
                    {plot.estate}
                  </td>

                  <td className="px-6 py-4">
                    {plot.size}
                  </td>

                  <td className="px-6 py-4">

                    <span
                      className={`px-3 py-1 rounded-full text-sm
                        ${
                          plot.status === "Available"
                            ? "bg-green-100 text-green-700"
                            : plot.status === "Allocated"
                            ? "bg-orange-100 text-orange-700"
                            : "bg-blue-100 text-blue-700"
                        }`}
                    >
                      {plot.status}
                    </span>

                  </td>

                  <td className="px-6 py-4 flex gap-2">

                    <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">
                      Edit
                    </button>

                    <button className="bg-red-500 text-white px-4 py-2 rounded-lg">
                      Delete
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