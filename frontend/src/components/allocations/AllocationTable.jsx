const AllocationTable = ({
    allocations,
    onView,
    onEdit,
    onCancel
}) => {

    return (

        <div className="bg-white rounded-xl shadow overflow-hidden">

            <table className="w-full">

                <thead className="bg-gray-50">

                    <tr>

                        <th className="px-4 py-4 text-left">
                            Customer
                        </th>

                        <th className="px-4 py-4 text-left">
                            Plot
                        </th>

                        <th className="px-4 py-4 text-left">
                            Block
                        </th>

                        <th className="px-4 py-4 text-left">
                            Purchase
                        </th>

                        <th className="px-4 py-4 text-left">
                            Paid
                        </th>

                        <th className="px-4 py-4 text-left">
                            Outstanding
                        </th>

                        <th className="px-4 py-4 text-left">
                            Status
                        </th>

                        <th className="px-4 py-4 text-center">
                            Actions
                        </th>

                    </tr>

                </thead>

                <tbody>

                    {allocations.map((allocation) => (

                        <tr
                            key={allocation.allocation_id}
                            className="border-t"
                        >

                            <td className="px-4 py-4">

                                {allocation.full_name}

                            </td>

                            <td className="px-4 py-4">

                                {allocation.plot_id}

                            </td>

                            <td className="px-4 py-4">

                                {allocation.block}

                            </td>

                            <td className="px-4 py-4">

                                ₦{Number(
                                    allocation.purchase_amount
                                ).toLocaleString()}

                            </td>

                            <td className="px-4 py-4 text-green-600">

                                ₦{Number(
                                    allocation.amount_paid
                                ).toLocaleString()}

                            </td>

                            <td className="px-4 py-4 text-red-500">

                                ₦{Number(
                                    allocation.outstanding_balance
                                ).toLocaleString()}

                            </td>

                            <td className="px-4 py-4">

                                <span
                                    className="
                                    bg-green-100
                                    text-green-700
                                    px-3
                                    py-1
                                    rounded-full
                                    text-sm
                                "
                                >
                                    {allocation.allocation_status}
                                </span>

                            </td>

                            <td className="px-4 py-4">

                          <div className="flex justify-center gap-2">

                            <button
                                onClick={() => onView(allocation)}
                                className="
                                    bg-green-600
                                    text-white
                                    px-4
                                    py-2
                                    rounded
                                "
                            >
                                View
                            </button>

                            <button
                                onClick={() => onEdit(allocation.allocation_id)}
                                className="
                                    bg-blue-600
                                    text-white
                                    px-4
                                    py-2
                                    rounded
                                "
                            >
                                Edit
                            </button>
{/* 
                            <button
                                onClick={() => onCancel(allocation.allocation_id)}
                                className="
                                    bg-red-600
                                    text-white
                                    px-4
                                    py-2
                                    rounded
                                "
                            >
                                Cancel
                            </button> */}

<button
    onClick={() => {
        console.log(allocation);
        onCancel(allocation);
    }}
    className="
        bg-red-600
        text-white
        px-4
        py-2
        rounded
    "
>
    Cancel
</button>

                        </div>

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>

    );

};

export default AllocationTable;