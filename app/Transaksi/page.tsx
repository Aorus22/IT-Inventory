"use client"
import React, {useEffect, useState} from 'react';
import Tabel from "@/components/Tabel";
import {useRouter} from "next/navigation";
import axios from "axios";

export interface Transaksi {
    id: string,
    name: string,
    status: string,
    tanggal: string,
    kuantitas: number
}

const TransactionPage = () => {
    const router = useRouter()
    const [daftarTransaksi, setDaftarTransaksi] = useState<Transaksi[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData().then();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('/api/transaksi');
            setDaftarTransaksi(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Failed to fetch data:', error);
        }
    };

    const handleDelete = async (id: string) => {
        try {
            const response = await axios.delete(`/api/transaksi?id=${id}`);
            fetchData().then();
            alert('Data deleted successfully');
        } catch (error) {
            console.error('Failed to delete data:', error);
        }
    };

    const handleDetail = (id: string) => {
        router.push(`/Transaksi/${id}`)
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <>
            <section className='max-container p-4'>
                <h1 className='text-5xl font-bold text-[#292929]'>Transaksi</h1>
                <Tabel data={daftarTransaksi} onDelete={handleDelete} onDetail={handleDetail}/>
            </section>
        </>
    );
};

export default TransactionPage;
