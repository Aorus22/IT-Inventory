'use client';
import React, { ChangeEvent, Dispatch, SetStateAction, useState, useEffect } from 'react';

export type FormDataCustom = {
    [key: string]: any;
};

interface DynamicFormProps {
    data: FormDataCustom;
    setData: Dispatch<SetStateAction<any>>;
}

const DynamicForm: React.FC<DynamicFormProps> = ({ data, setData }) => {
    const [isEditMode, setIsEditMode] = useState(false);
    const [initialData, setInitialData] = useState<FormDataCustom>(data);

    useEffect(() => {
        setInitialData(data);
    }, [data]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setData((prevData: any) => ({ ...prevData, [name]: value }));
    };

    const toggleEditMode = () => {
        if (isEditMode) {
            setData(initialData);
        }
        setIsEditMode(!isEditMode);
    };

    const handleCancel = () => {
        setData(initialData);
        setIsEditMode(false);
    };

    if (!data) {
        return <p className="text-center p-4">Tidak ada data yang tersedia.</p>;
    }

    return (
        <div>
            <div className="mb-4 flex space-x-2">
                <button
                    type="button"
                    onClick={toggleEditMode}
                    className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                    {isEditMode ? 'Save' : 'Edit'}
                </button>
                {isEditMode && (
                    <button
                        type="button"
                        onClick={handleCancel}
                        className="px-4 py-2 bg-red-500 text-white rounded"
                    >
                        Cancel
                    </button>
                )}
            </div>
            <form>
                {Object.keys(data).map((key) => (
                    <div key={key} className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={key}>
                            {key.charAt(0).toUpperCase() + key.slice(1)}
                        </label>
                        <input
                            type="text"
                            id={key}
                            name={key}
                            value={data[key]}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            disabled={!isEditMode || key === 'id'}
                        />
                    </div>
                ))}
            </form>
        </div>
    );
};

export default DynamicForm;
