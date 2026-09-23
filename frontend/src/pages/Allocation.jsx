import { useEffect, useState } from "react";
import { Plus } from "lucide-react";

import {
    getAllocations,
    getAllocation,
    createAllocation,
    updateAllocation,
    cancelAllocation
} from "../services/allocationService";

import { getCustomerList } from "../services/customerService";

import { getAvailablePlots } from "../services/plotService";

import AllocationTable from "../components/allocations/AllocationTable";
import AllocationModal from "../components/allocations/AllocationModal";
import AllocationViewModal from "../components/allocations/AllocationViewModal";

const Allocation = () => {

    const [allocations, setAllocations] = useState([]);
    const [loading, setLoading] = useState(true);

    const [showModal, setShowModal] = useState(false);
    const [showViewModal, setShowViewModal] = useState(false);

    const [editingAllocation, setEditingAllocation] = useState(null);
    const [selectedAllocation, setSelectedAllocation] = useState(null);

    const [customers, setCustomers] = useState([]);
    const [plots, setPlots] = useState([]);

    useEffect(() => {

        loadAllocations();

    }, []);

    // ============================================
    // LOAD TABLE
    // ============================================

    const loadAllocations = async () => {

        try {

            const response = await getAllocations();

            setAllocations(response.data);

        } catch (error) {

            console.error(error);

            alert("Failed to load allocations.");

        } finally {

            setLoading(false);

        }

    };

   

    const handleCreate = async () => {

    console.log("Button clicked");

    try {

        const customerResponse =
            await getCustomerList();

        console.log(customerResponse);

        const plotResponse =
            await getAvailablePlots();

        console.log(plotResponse);

        setCustomers(customerResponse.data);

        setPlots(plotResponse.data);

        setEditingAllocation(null);

        console.log("Opening modal");

        setShowModal(true);

    } catch (error) {

        console.error(error);

    }

};

    // ============================================
    // EDIT
    // ============================================

    const handleEdit = async (allocationId) => {

        try {

            const allocation =
                await getAllocation(allocationId);

            const customerResponse =
                await getCustomerList();

            const plotResponse =
                await getAvailablePlots();

            const currentPlot = {

                objectid:
                    allocation.data.objectid,

                plot_id:
                    allocation.data.plot_id,

                block:
                    allocation.data.block,

                cost:
                    allocation.data.purchase_amount,

                building_type:
                    allocation.data.building_type

            };

            const availablePlots = [

                currentPlot,

                ...plotResponse.data.filter(

                    plot =>
                        plot.objectid !==
                        currentPlot.objectid

                )

            ];

            setCustomers(customerResponse.data);

            setPlots(availablePlots);

            setEditingAllocation(allocation.data);

            setShowModal(true);

        } catch (error) {

            console.error(error);

            alert("Failed to load allocation.");

        }

    };

    // ============================================
    // VIEW
    // ============================================

    const handleView = (allocation) => {

        setSelectedAllocation(
            allocation.allocation_id
        );

        setShowViewModal(true);

    };

    // ============================================
    // SAVE
    // ============================================

    const handleSave = async (formData) => {

        try {

            if (editingAllocation) {

                await updateAllocation(

                    editingAllocation.allocation_id,

                    formData

                );

            } else {

                await createAllocation(formData);

            }

            await loadAllocations();

            setShowModal(false);

            setEditingAllocation(null);

        } catch (error) {

            console.error(error);

            alert("Failed to save allocation.");

        }

    };

    // ============================================
    // CANCEL (Placeholder)
    // ============================================

const handleCancel = async (allocation) => {

    const confirmed = window.confirm(
        `Are you sure you want to cancel Plot ${allocation.plot_id}?`
    );

    if (!confirmed) return;

    try {

        await cancelAllocation(allocation.allocation_id);

        alert("Allocation cancelled successfully.");

        await loadAllocations();

    } catch (error) {

        console.error(error);

        alert("Failed to cancel allocation.");

    }

};

    return (

        <div className="p-6">

            <div className="flex items-center justify-between mb-6">

                <h1 className="text-3xl font-bold">

                    Plot Allocations

                </h1>

                <button
                    onClick={handleCreate}
                    className="bg-purple-700 hover:bg-purple-800 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                >
                    <Plus size={18} />

                    New Allocation

                </button>

            </div>

            <div className="bg-white rounded-xl shadow overflow-x-auto">

                <AllocationTable

                    allocations={allocations}

                    onView={handleView}

                    onEdit={handleEdit}

                    onCancel={handleCancel}

                />

            </div>

            <AllocationViewModal

                isOpen={showViewModal}

                allocationId={selectedAllocation}

                onClose={() => {

                    setShowViewModal(false);

                    setSelectedAllocation(null);

                }}

            />

            {

                showModal && (

                    <AllocationModal

                        allocation={editingAllocation}

                        customers={customers}

                        plots={plots}

                        onClose={() => {

                            setShowModal(false);

                            setEditingAllocation(null);

                        }}

                        onSave={handleSave}

                    />

                )

            }

        </div>

    );

};

export default Allocation;