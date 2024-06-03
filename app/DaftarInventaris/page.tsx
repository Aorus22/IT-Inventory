"use client";
import React, { useEffect, useState } from 'react';
import Table from "@/components/Tabel";
import {useRouter} from "next/navigation";
import axios from "axios";

export interface Item {
    id: string,
    name: string,
    jenis: string,
    deskripsi: string,
    stok: number,
    gambar: string
}

const Page = () => {
    const router = useRouter()
    const [inventoryData, setInventoryData] = useState<Item[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData().then();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('/api/inventory');
            setInventoryData(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Failed to fetch data:', error);
        }
    };

    const handleDelete = async (id: string) => {
        try {
            const response = await axios.delete(`/api/inventory?id=${id}`);
            fetchData().then();
            alert('Data deleted successfully');
        } catch (error) {
            console.error('Failed to delete data:', error);
        }
    };

    const handleDetail = (id: string) => {
        router.push(`/DaftarInventaris/${id}`)
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <>
            <section className='max-container p-4'>
                <h1 className='text-5xl font-bold text-[#292929]'>Daftar Inventaris</h1>
                <Table data={inventoryData} onDelete={handleDelete} onDetail={handleDetail} />
            </section>
        </>
    );
};

export default Page;
