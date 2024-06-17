"use client"
import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Transaksi} from "@prisma/client";
import LoadingBar from "@/components/LoadingBar";
import PageTitle from "@/components/PageTitle";
import BoxKonfirmasi from "@/components/BoxKonfirmasi";

const TransactionPage = () => {
    const [daftarTransaksi, setDaftarTransaksi] = useState<Transaksi[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData().then();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('/api/Transaksi?status=pending');
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
            <section className='max-container px-4'>
                <PageTitle title={"Transaksi"} />
                <div className="grid grid-cols-3 gap-3 mt-4">
                    {daftarTransaksi.map((item, index) => (
                        <BoxKonfirmasi key={index} data={item} fetchData={fetchData} apiUrl={"Transaksi"}/>
                    ))}
                </div>
            </section>
        </>
    );
};

export default TransactionPage;
