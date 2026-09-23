import { X } from "lucide-react";

const Modal = ({
    isOpen,
    onClose,
    title,
    children,
    width = "max-w-4xl",
}) => {

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">

            <div
                className={`bg-white rounded-xl shadow-xl w-full ${width} mx-4`}
            >

                <div className="flex items-center justify-between border-b px-6 py-4">

                    <h2 className="text-2xl font-bold">
                        {title}
                    </h2>

                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-red-600"
                    >
                        <X size={26} />
                    </button>

                </div>

                <div className="p-6">

                    {children}

                </div>

            </div>

        </div>
    );
};

export default Modal;