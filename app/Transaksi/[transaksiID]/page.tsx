'use client';
import React, {useEffect, useState} from 'react';
import DynamicForm from "@/components/Form";
import {useParams} from "next/navigation";
import axios from "axios";
import {Transaksi} from "@prisma/client";
import LoadingBar from "@/components/LoadingBar";

const Page = () => {
    const param = useParams()
    const [data, setData] = useState<Transaksi>({
        id: 0, nama: "", kuantitas: 0, status: "", tanggal: new Date()
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`/api/Transaksi?id=${param.transaksiID}`);
                setData(response.data);
            } catch (error) {
                console.error('Failed to fetch data:', error);
            } finally {
                setLoading(false);
            }
        };

        if (param.transaksiID !== "Tambah"){
            fetchData().then();
        } else {
            setLoading(false)
        }
    }, [param.transaksiID]);

    if (loading) {
        return <LoadingBar />
    }

    if (param.transaksiID === "Tambah"){
        return (
            <div className="max-container p-4">
                <h1 className="text-5xl font-bold text-[#292929] mb-4">Tambah Transaksi</h1>
                <DynamicForm data={data} setData={setData} isNewForm={true} urlApi="Transaksi"/>
            </div>
        )
    }

    return (
        <div className="max-container p-4">
            <h1 className="text-5xl font-bold text-[#292929] mb-4">Detail Item</h1>
            <DynamicForm data={data} setData={setData} isNewForm={false} urlApi="Transaksi"/>
        </div>
    );
};

export default Page;
