import React, { useState } from "react";
import { formatDate, formatHeader } from "@/util/formatString";
import axios from "axios";

interface BoxProps {
    [key: string]: any;
    apiUrl: string;
    fetchData: () => void;
}

const BoxKonfirmasi: React.FC<BoxProps> = ({ data, apiUrl, fetchData }) => {
    const [showModalConfirm, setShowModalConfirm] = useState(false);
    const [actionType, setActionType] = useState(""); // Menyimpan jenis aksi (approve/reject)

    const id = data.id;

    const handleApprove = () => {
        setActionType("approve");
        setShowModalConfirm(true);
    };

    const handleReject = () => {
        setActionType("reject");
        setShowModalConfirm(true);
    };

    const confirmAction = async () => {
        try {
            if (actionType === "approve") {
                await axios.post(`/api/${apiUrl}?id=${id}&status=approved`);
            } else if (actionType === "reject") {
                await axios.post(`/api/${apiUrl}?id=${id}&status=rejected`);
            }
            setShowModalConfirm(false);
            fetchData();
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                if (error.response && error.response.status === 400) {
                    alert(error.response.data.error)
                } else {
                    console.error(error);
                }
            } else {
                console.error('Unexpected error', error);
            }
        }
    };

    const cancelAction = () => {
        setShowModalConfirm(false);
    };

    return (
        <div className="h-full p-6 bg-white rounded-xl flex flex-col">
            {Object.entries(data).map(([key, value], index1) => (
                <div key={index1} style={{ marginBottom: '10px' }}>
                    <div className="font-bold">
                        {`${formatHeader(key)}:`}
                    </div>
                    <div>
                        {`${key.includes('tanggal') ? (formatDate(value as string)) : value}`}
                    </div>
                </div>
            ))}
            <div className="flex-grow"></div>
            <div className="flex justify-center items-center gap-4 mt-4">
                <button className="bg-green-600 px-4 py-2 rounded text-white font-bold"
                        onClick={handleApprove}>
                    Approve
                </button>
                <button className="bg-red-600 px-4 py-2 rounded text-white font-bold"
                        onClick={handleReject}>
                    Reject
                </button>
            </div>

            {showModalConfirm && (
                <>
                    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-700 bg-opacity-50">
                        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                            <p className="text-lg mb-4">
                                {actionType === "approve" ? "Are you sure you want to approve this item?" : "Are you sure you want to reject this item?"}
                            </p>
                            <div className="flex justify-end space-x-4">
                                <button
                                    className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                                    onClick={confirmAction}
                                >
                                    Yes
                                </button>
                                <button
                                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                                    onClick={cancelAction}
                                >
                                    No
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="fixed inset-0 bg-gray-700 bg-opacity-50 z-40" />
                </>
            )}
        </div>
    )
}

export default BoxKonfirmasi;
