import { useState } from "react";

const AllocationForm = ({
    allocation,
    customers,
    plots,
    loading,
    onSubmit
}) => {

    const [formData, setFormData] = useState({

        customer_id:
            allocation?.customer_id || "",

        plot_id:
            allocation?.objectid || "",

        purchase_amount:
            allocation?.purchase_amount || "",

        payment_plan:
            allocation?.payment_plan || "INSTALLMENT"

    });

    const handlePlotChange = (e) => {

        const selectedPlot = plots.find(

            plot =>
                plot.objectid === Number(e.target.value)

        );

        setFormData({

            ...formData,

            plot_id: Number(e.target.value),

            purchase_amount:
                selectedPlot
                    ? selectedPlot.cost
                    : ""

        });

    };

    const handleSubmit = (e) => {

        e.preventDefault();

        onSubmit(formData);

    };

    return (

        <form
            onSubmit={handleSubmit}
            className="space-y-5"
        >

            {/* Customer */}

            <div>

                <label className="block font-medium mb-2">

                    Customer

                </label>

                <select
                    required
                    disabled={!!allocation}
                    value={formData.customer_id}
                    onChange={(e) =>
                        setFormData({

                            ...formData,

                            customer_id:
                                Number(e.target.value)

                        })
                    }
                    className="w-full border rounded-lg p-3"
                >

                    <option value="">

                        Select Customer

                    </option>

                    {customers.map(customer => (

                        <option
                            key={customer.customer_id}
                            value={customer.customer_id}
                        >

                            {customer.full_name}

                        </option>

                    ))}

                </select>

            </div>

            {/* Plot */}

            <div>

                <label className="block font-medium mb-2">

                    Available Plot

                </label>

                <select
                    required
                    value={formData.plot_id}
                    onChange={handlePlotChange}
                    className="w-full border rounded-lg p-3"
                >

                    <option value="">

                        Select Plot

                    </option>

                    {plots.map(plot => (
                    <option
                        key={plot.objectid}
                        value={plot.objectid}
                    >

                        {plot.plot_id}
                        {" | Block "}
                        {plot.block}
                        {" | "}
                        {plot.building_type}
                        {" | ₦"}
                        {Number(plot.cost).toLocaleString()}

                    </option>

                    ))}

                </select>

            </div>

            {/* Purchase Amount */}

            <div>

                <label className="block font-medium mb-2">

                    Purchase Amount

                </label>

                <input
                    type="number"
                    readOnly
                    value={formData.purchase_amount}
                    className="w-full border rounded-lg p-3 bg-gray-100"
                />

            </div>

            {/* Payment Plan */}

            <div>

                <label className="block font-medium mb-2">

                    Payment Plan

                </label>

                <select
                    value={formData.payment_plan}
                    onChange={(e) =>
                        setFormData({

                            ...formData,

                            payment_plan:
                                e.target.value

                        })
                    }
                    className="w-full border rounded-lg p-3"
                >

                    <option value="FULL">

                        Full Payment

                    </option>

                    <option value="INSTALLMENT">

                        Installment

                    </option>

                </select>

            </div>

            <div className="flex justify-end pt-4">

                <button
                    type="submit"
                    disabled={loading}
                    className="bg-purple-700 hover:bg-purple-800 text-white px-6 py-3 rounded-lg"
                >

                    {loading
                        ? "Saving..."
                        : allocation
                            ? "Update Allocation"
                            : "Allocate Plot"}

                </button>

            </div>

        </form>

    );

};

export default AllocationForm;