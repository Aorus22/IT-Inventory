"use client"
import React, {useEffect, useState} from 'react';
import Tabel from "@/components/Tabel";

interface Transaksi {
    id: string,
    name: string,
    status: string,
    tanggal: string,
    kuantitas: number
}

const TransactionPage = () => {
    const [daftarTransaksi, setDaftarTransaksi] = useState<Transaksi[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/transaksi');
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                setDaftarTransaksi(data);
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
                <h1 className='text-5xl font-bold text-[#292929]'>Transaksi</h1>
                <Tabel data={daftarTransaksi} onDelete={handleDelete} onDetail={handleDetail}/>
            </section>
        </>
    );
};

export default TransactionPage;
