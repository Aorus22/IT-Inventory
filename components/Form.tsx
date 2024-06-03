'use client';
import React, { ChangeEvent, Dispatch, SetStateAction, useState, useEffect } from 'react';
import axios from "axios";
import {useRouter} from "next/navigation";

export type FormDataCustom = {
    [key: string]: any;
};

interface DynamicFormProps {
    isNewForm: boolean;
    urlApi: string;
    data: FormDataCustom;
    setData: Dispatch<SetStateAction<any>>;
}

const DynamicForm: React.FC<DynamicFormProps> = ({ isNewForm, data, setData, urlApi }) => {
    const router = useRouter();
    const [isEditMode, setIsEditMode] = useState(isNewForm);
    const [initialData, setInitialData] = useState<FormDataCustom>(data);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        let parsedValue: any;

        if (e.target.type === "number") {
            parsedValue = Number(value);
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
            const response = await axios.put(`/api/${urlApi}`, data);
            router.push(`/${urlApi}`);
            alert("Add data successfull")
        } catch (error){
            console.error(error)
        }
    };

    const handleUpdate = async () => {
        try {
            const response = await axios.patch(`/api/${urlApi}?id=${data.id}`, data);
            router.push(`/${urlApi}`);
            alert("Update data successfull")
        } catch (error){
            console.error(error)
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
        <div>
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
                {Object.keys(data).map((key) => (
                    <div key={key} className="mb-4">
                        <label
                            className={`block text-gray-700 text-sm font-bold mb-2 ${isNewForm && key === 'id' ? 'hidden' : ''}`}
                            htmlFor={key}>
                            {key.charAt(0).toUpperCase() + key.slice(1)}
                        </label>
                        <input
                            type={getInputType(key)}
                            name={key}
                            value={getInputType(key) === "datetime-local" ? (data[key].toISOString().slice(0, 16)) : (data[key])}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            hidden={isNewForm && key === 'id'}
                            disabled={!isEditMode || key === 'id'}
                        />
                    </div>
                ))}

                {isNewForm && (
                    <button
                        type="button"
                        onClick={handleSubmit}
                        className="px-4 py-2 bg-blue-500 text-white rounded"
                    >
                        Submit
                    </button>
                )}
            </form>
        </div>
    );
};

export default DynamicForm;
