'use client';
import React, { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import axios from "axios";
import { useRouter } from "next/navigation";
import { formatHeader } from "@/components/Tabel";
import {id} from "postcss-selector-parser";

export type FormDataCustom = {
    [key: string]: any;
};

export interface DropdownItem {
    id: string | number;
    value: string;
}

export interface Dropdowns {
    [key: string]: DropdownItem[];
}

interface DynamicFormProps {
    isNewForm: boolean;
    urlApi: string;
    data: FormDataCustom;
    setData: Dispatch<SetStateAction<any>>;
    dropdowns?: Dropdowns;
    ignore?: string[];
}

const DynamicForm: React.FC<DynamicFormProps> = ({ isNewForm, data, setData, urlApi, dropdowns, ignore }) => {
    const router = useRouter();
    const [isEditMode, setIsEditMode] = useState(isNewForm);
    const [initialData] = useState<FormDataCustom>(data);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        let parsedValue: any;

        if (e.target.type === "number") {
            parsedValue = parseInt(value);
        } else if (e.target.type === "datetime-local") {
            parsedValue = new Date(value);
        } else {
            parsedValue = value;
        }

        setData((prevData: FormDataCustom) => ({ ...prevData, [name]: parsedValue }));
    };

    const toggleEditMode = () => {
        if (isEditMode) {
            setData(initialData);
        }
        setIsEditMode(!isEditMode);
    };

    if (!data) {
        return <p className="text-center p-4">Tidak ada data yang tersedia.</p>;
    }

    const handleSubmit = async () => {
        try {
            await axios.put(`/api/${urlApi}`, data);
            router.push(`/${urlApi}`);
            alert("Add data successful");
        } catch (error) {
            console.error(error);
        }
    };

    const handleUpdate = async () => {
        try {
            await axios.patch(`/api/${urlApi}?id=${data.id}`, data);
            router.push(`/${urlApi}`);
            alert("Update data successful");
        } catch (error) {
            console.error(error);
        }
        setIsEditMode(!isEditMode);
    };

    const getInputType = (key: string): string => {
        const value = data[key];

        if (typeof value === 'number') {
            return 'number';
        } else if (typeof value === 'string') {
            return 'text';
        } else if (value instanceof Date) {
            return 'datetime-local';
        }
        return 'text';
    };

    return (
        <div className="bg-white rounded-xl p-12 mt-4">
            {!isNewForm && (
                <div className="mb-4 flex space-x-2">
                    <button
                        type="button"
                        onClick={toggleEditMode}
                        className={`px-4 py-2 ${isEditMode ? 'bg-red-500' : 'bg-blue-500'} text-white rounded`}
                    >
                        {isEditMode ? 'Cancel' : 'Edit'}
                    </button>
                    {isEditMode && (
                        <button
                            type="button"
                            onClick={handleUpdate}
                            className="px-4 py-2 bg-green-500 text-white rounded"
                        >
                            Save
                        </button>
                    )}
                </div>
            )}
            <form>
                {Object.keys(data).map((key) => {
                    const isHidden = isNewForm && (ignore?.includes(key) || key === "id");
                    const isDisabled = !isEditMode || ignore?.includes(key) || key === "id";

                    return (
                        <div key={key} className={`mb-4 ${isHidden ? 'hidden' : ''}`}>
                            <label
                                className="block text-gray-700 text-lg font-bold mb-2"
                                htmlFor={key}
                            >
                                {formatHeader(key)}
                            </label>
                            {dropdowns && dropdowns[key] ? (
                                <select
                                    name={key}
                                    onChange={handleChange}
                                    value={data[key] || ""}
                                    className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline text-lg ${isDisabled ? 'bg-blue-100 cursor-not-allowed' : ''}`}
                                    disabled={isDisabled}
                                >
                                    <option value="" disabled hidden>Pilih...</option>
                                    {dropdowns[key].map((item) => (
                                        <option key={item.id} value={item.id}>
                                            {item.id === item.value ? item.id : `${item.id} - ${item.value}`}
                                        </option>
                                    ))}
                                </select>
                            ) : (
                                <input
                                    type={getInputType(key)}
                                    name={key}
                                    value={getInputType(key) === "datetime-local" ? data[key].toISOString().slice(0, 16) : data[key]}
                                    onChange={handleChange}
                                    className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-lg ${isDisabled ? 'bg-blue-100 cursor-not-allowed' : ''}`}
                                    disabled={isDisabled}
                                />
                            )}
                        </div>
                    );
                })}

                {isNewForm && (
                    <button
                        type="button"
                        onClick={handleSubmit}
                        className="px-4 py-2 bg-blue-500 text-white rounded text-lg"
                    >
                        Submit
                    </button>
                )}
            </form>

        </div>
    );
};

export default DynamicForm;
