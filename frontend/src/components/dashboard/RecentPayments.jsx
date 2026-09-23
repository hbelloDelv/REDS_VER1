import {
  recentPayments,
} from "../../data/dashboardData";

export default function RecentPayments() {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">

      <h3 className="text-lg font-semibold mb-4">
        Recent Payments
      </h3>

      <table className="w-full">

        <thead>
          <tr className="text-left border-b">
            <th>Customer</th>
            <th>Amount</th>
          </tr>
        </thead>

        <tbody>

          {recentPayments.map((item,index)=>(
            <tr
              key={index}
              className="border-b"
            >
              <td className="py-3">
                {item.customer}
              </td>

              <td>{item.amount}</td>
            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
}