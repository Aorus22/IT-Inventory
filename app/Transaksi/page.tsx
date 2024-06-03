"use client"
import React, {useEffect, useState} from 'react';
import Tabel from "@/components/Tabel";
import axios from "axios";
import {Transaksi} from "@prisma/client";
import LoadingBar from "@/components/LoadingBar";

// export interface Transaksi {
//     id: string,
//     nama: string,
//     status: string,
//     tanggal: Date,
//     kuantitas: number
// }

const TransactionPage = () => {
    const [daftarTransaksi, setDaftarTransaksi] = useState<Transaksi[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData().then();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('/api/Transaksi');
            setDaftarTransaksi(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Failed to fetch data:', error);
        }
    };

    if (loading) {
        return <LoadingBar />
    }

    return (
        <>
            <section className='max-container p-4'>
                <h1 className='text-5xl font-bold text-[#292929]'>Transaksi</h1>
                <Tabel data={daftarTransaksi} apiUrl={"Transaksi"} fetchData={fetchData}/>
            </section>
        </>
    );
};

export default TransactionPage;
