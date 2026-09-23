export default function QuickActions() {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">

      <h3 className="text-lg font-semibold mb-5">
        Quick Actions
      </h3>

      <div className="grid grid-cols-2 gap-3">

        <button className="bg-violet-600 text-white rounded-xl py-3">
          Add Customer
        </button>

        <button className="bg-blue-600 text-white rounded-xl py-3">
          Allocate Plot
        </button>

        <button className="bg-green-600 text-white rounded-xl py-3">
          Record Payment
        </button>

        <button className="bg-slate-700 text-white rounded-xl py-3">
          Create User
        </button>

      </div>

    </div>
  );
}