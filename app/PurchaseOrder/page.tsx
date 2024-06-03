"use client"
import React, {useEffect, useState} from 'react';
import Tabel from "@/components/Tabel";
import {useRouter} from "next/navigation";
import axios from "axios";

export interface PO {
    id: string,
    name: string,
    deskripsi: string,
    tanggal: string,
    status: string
}

const PurchaseOrderPage = () => {
    const router = useRouter()
    const [daftarPO, setDaftarPO] = useState<PO[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData().then();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('/api/purchaseorder');
            setDaftarPO(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Failed to fetch data:', error);
        }
    };

    const handleDelete = async (id: string) => {
        try {
            const response = await axios.delete(`/api/purchaseorder?id=${id}`);
            fetchData().then();
            alert('Data deleted successfully');
        } catch (error) {
            console.error('Failed to delete data:', error);
        }
    };

    const handleDetail = (id: string) => {
        router.push(`/PurchaseOrder/${id}`)
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
