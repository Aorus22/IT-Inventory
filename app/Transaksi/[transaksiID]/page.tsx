'use client';
import React, {useEffect, useState} from 'react';
import DynamicForm, {FormDataCustom} from "@/components/Form";
import {Item} from "@/app/DaftarInventaris/page";
import {useParams} from "next/navigation";
import axios from "axios";

const Page = () => {
    const param = useParams()
    const [data, setData] = useState<Item>({
        deskripsi: "", gambar: "", id: "", jenis: "", name: "", stok: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`/api/transaksi?id=${param.transaksiID}`);
                setData(response.data);
            } catch (error) {
                console.error('Failed to fetch data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData().then();
    }, [param.transaksiID]);

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div className="max-container p-4">
            <h1 className="text-5xl font-bold text-[#292929] mb-4">Detail Item</h1>
            <DynamicForm data={data} setData={setData} />
        </div>
    );
};

export default Page;
