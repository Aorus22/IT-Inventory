'use client';
import React, {useEffect, useState} from 'react';
import DynamicForm from "@/components/Form";
import {useParams} from "next/navigation";
import axios from "axios";
import {PurchaseOrder} from "@prisma/client";
import LoadingBar from "@/components/LoadingBar";

const Page = () => {
    const param = useParams()
    const [data, setData] = useState<PurchaseOrder>({
        id: 0, nama: "", deskripsi: "", status: "", tanggal: new Date()
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`/api/PurchaseOrder?id=${param.poID}`);
                setData(response.data);
            } catch (error) {
                console.error('Failed to fetch data:', error);
            } finally {
                setLoading(false);
            }
        };

        if (param.poID !== "Tambah"){
            fetchData().then();
        } else {
            setLoading(false)
        }

    }, [param.poID]);

    if (loading) {
        return <LoadingBar />
    }

    if (param.poID === "Tambah"){
        return (
            <div className="max-container p-4">
                <h1 className="text-5xl font-bold text-[#292929] mb-4">Tambah Purchase Order</h1>
                <DynamicForm data={data} setData={setData} isNewForm={true} urlApi="PurchaseOrder"/>
            </div>
        )
    }

    return (
        <div className="max-container p-4">
            <h1 className="text-5xl font-bold text-[#292929] mb-4">Detail Item</h1>
            <DynamicForm data={data} setData={setData} isNewForm={false} urlApi="PurchaseOrder" />
        </div>
    );
};

export default Page;
