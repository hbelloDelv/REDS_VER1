import { Search, Plus } from "lucide-react";

export default function Users() {
  const users = [
    {
      name: "Haruna Bello",
      email: "haruna@reds.ng",
      role: "Super Admin",
      status: "Active",
    },
    {
      name: "Sarah John",
      email: "sarah@reds.ng",
      role: "Allocation Officer",
      status: "Active",
    },
    {
      name: "Aliyu Musa",
      email: "aliyu@reds.ng",
      role: "Finance Officer",
      status: "Inactive",
    },
  ];

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

        <h1 className="text-4xl font-bold text-slate-800">
          Users
        </h1>

        <button className="bg-violet-600 hover:bg-violet-700 text-white px-5 py-3 rounded-xl flex items-center gap-2">
          <Plus size={18} />
          Add User
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
            placeholder="Search user..."
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
                <th className="text-left px-6 py-4">Name</th>
                <th className="text-left px-6 py-4">Email</th>
                <th className="text-left px-6 py-4">Role</th>
                <th className="text-left px-6 py-4">Status</th>
                <th className="text-left px-6 py-4">Actions</th>
              </tr>

            </thead>

            <tbody>

              {users.map((user, index) => (

                <tr
                  key={index}
                  className="border-t"
                >

                  <td className="px-6 py-4">
                    {user.name}
                  </td>

                  <td className="px-6 py-4">
                    {user.email}
                  </td>

                  <td className="px-6 py-4">
                    {user.role}
                  </td>

                  <td className="px-6 py-4">

                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        user.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {user.status}
                    </span>

                  </td>

                  <td className="px-6 py-4 flex gap-2">

                    <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">
                      Edit
                    </button>

                    <button className="bg-red-500 text-white px-4 py-2 rounded-lg">
                      Disable
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