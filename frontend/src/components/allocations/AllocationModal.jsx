import { useState } from "react";

import Modal from "../shared/Modal";
import AllocationForm from "./AllocationForm";

const AllocationModal = ({
    allocation,
    customers,
    plots,
    onClose,
    onSave
}) => {

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (formData) => {

        try {

            setLoading(true);

            await onSave(formData);

        } catch (error) {

            console.error(error);

            alert("Failed to save allocation.");

        } finally {

            setLoading(false);

        }

    };

    return (

        <Modal
            isOpen={true}
            onClose={onClose}
            title={
                allocation
                    ? "Edit Allocation"
                    : "New Plot Allocation"
            }
            width="max-w-2xl"
        >

            <AllocationForm
                allocation={allocation}
                customers={customers}
                plots={plots}
                loading={loading}
                onSubmit={handleSubmit}
            />

        </Modal>

    );

};

export default AllocationModal;