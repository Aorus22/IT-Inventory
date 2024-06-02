"use client"
import React, {useEffect, useState} from 'react';
import Tabel from "@/components/Tabel";

interface PO {
    id: string,
    name: string,
    deskripsi: string,
    tanggal: string,
    status: string
}

const PurchaseOrderPage = () => {
    const [daftarPO, setDaftarPO] = useState<PO[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/purchaseorder');
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                setDaftarPO(data);
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
                <h1 className='text-5xl font-bold text-[#292929]'>Purchase Order</h1>
                <Tabel data={daftarPO} onDelete={handleDelete} onDetail={handleDetail} />
            </section>
        </>
    );
};

export default PurchaseOrderPage;
