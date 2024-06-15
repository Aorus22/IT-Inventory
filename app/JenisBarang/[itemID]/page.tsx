'use client';
import React, {useEffect, useState} from 'react';
import DynamicForm from "@/components/Form";
import {useParams} from "next/navigation";
import axios from "axios";
import {JenisBarang} from "@prisma/client";
import LoadingBar from "@/components/LoadingBar";

const Page = () => {
    const param = useParams()
    const [data, setData] = useState<JenisBarang>({
        id: 0, nama_jenis: ""
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`/api/JenisBarang?id=${param.itemID}`);
                setData(response.data);
            } catch (error) {
                console.error('Failed to fetch data:', error);
            } finally {
                setLoading(false);
            }
        };

        if (param.itemID !== "Tambah"){
            fetchData().then();
        } else {
            setLoading(false)
        }

    }, [param.itemID]);

    if (loading) {
        return <LoadingBar />
    }

    if (param.itemID === "Tambah"){
        return (
            <div className="max-container p-4">
                <h1 className="text-5xl font-bold text-[#292929] mb-4">Tambah Jenis Barang</h1>
                <DynamicForm data={data} setData={setData} isNewForm={true} urlApi="JenisBarang"/>
            </div>
        )
    }

    return (
        <div className="max-container p-4">
            <h1 className="text-5xl font-bold text-[#292929] mb-4">Detail Jenis Barang</h1>
            <DynamicForm data={data} setData={setData} isNewForm={false} urlApi="JenisBarang" />
        </div>
    );
};

export default Page;
