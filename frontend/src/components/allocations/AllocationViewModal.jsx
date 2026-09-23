import { useEffect, useState } from "react";

import Modal from "../shared/Modal";

import {
    getAllocation
} from "../../services/allocationService";

const AllocationViewModal = ({
    isOpen,
    allocationId,
    onClose
}) => {

    const [allocation, setAllocation] = useState(null);

    const [loading, setLoading] = useState(false);

    useEffect(() => {

        if (
            isOpen &&
            allocationId
        ) {

            loadAllocation();

        }

    }, [
        isOpen,
        allocationId
    ]);

    const loadAllocation = async () => {

        try {

            setLoading(true);

            const response =
                await getAllocation(
                    allocationId
                );

            setAllocation(
                response.data
            );

        } catch (error) {

            console.error(error);

            alert(
                "Failed to load allocation."
            );

        } finally {

            setLoading(false);

        }

    };

    if (
        loading ||
        !allocation
    ) {

        return (

            <Modal
                isOpen={isOpen}
                onClose={onClose}
                title="Allocation Details"
            >

                Loading...

            </Modal>

        );

    }

    return (

        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Allocation Details"
            width="max-w-3xl"
        >

            <div className="grid grid-cols-2 gap-5">

                <Info
                    title="Customer"
                    value={allocation.full_name}
                />

                <Info
                    title="Phone"
                    value={allocation.phone_number}
                />

                <Info
                    title="Email"
                    value={allocation.email}
                />

                <Info
                    title="Address"
                    value={allocation.residential_address}
                />

                <Info
                    title="Plot"
                    value={allocation.plot_id}
                />

                <Info
                    title="Block"
                    value={allocation.block}
                />

                <Info
                    title="Building"
                    value={allocation.building_type}
                />

                <Info
                    title="Purpose"
                    value={allocation.purpose}
                />

                <Info
                    title="Purchase Amount"
                    value={`₦${Number(
                        allocation.purchase_amount
                    ).toLocaleString()}`}
                />

                <Info
                    title="Amount Paid"
                    value={`₦${Number(
                        allocation.amount_paid
                    ).toLocaleString()}`}
                />

                <Info
                    title="Outstanding"
                    value={`₦${Number(
                        allocation.outstanding_balance
                    ).toLocaleString()}`}
                />

                <Info
                    title="Status"
                    value={allocation.allocation_status}
                />

            </div>

        </Modal>

    );

};

const Info = ({
    title,
    value
}) => (

    <div className="bg-gray-50 rounded-lg p-4">

        <p className="text-sm text-gray-500">

            {title}

        </p>

        <p className="font-semibold mt-1">

            {value}

        </p>

    </div>

);

export default AllocationViewModal;