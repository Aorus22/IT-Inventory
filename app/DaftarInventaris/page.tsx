"use client";
import React, { useEffect, useState } from 'react';
import Table from "@/components/Tabel";

interface Item {
    id: string,
    name: string,
    jenis: string,
    deskripsi: string,
    stok: number,
    gambar: string
}

const Page = () => {
    const [inventoryData, setInventoryData] = useState<Item[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/inventory');
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                setInventoryData(data);
            } catch (error) {
                console.error(error)
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleDelete = (index: number) => {
        alert(`Item with index ${index} is deleted.`);
    };

    const handleDetail = (index: number) => {
        alert(`Detail of item with index ${index} is displayed.`);
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
