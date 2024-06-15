"use client"
import React, {useEffect, useState} from 'react';
import Tabel from "@/components/Tabel";
import axios from "axios";
import {PurchaseOrder} from "@prisma/client";
import LoadingBar from "@/components/LoadingBar";
import PageTitle from "@/components/PageTitle";

// export interface PO {
//     id: string,
//     nama: string,
//     deskripsi: string,
//     tanggal: Date,
//     status: string
// }

const PurchaseOrderPage = () => {
    const [daftarPO, setDaftarPO] = useState<PurchaseOrder[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData().then();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('/api/PurchaseOrder');
            setDaftarPO(response.data);
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
                <PageTitle title={"Purchase Order"} />
                <Tabel data={daftarPO} apiUrl={"PurchaseOrder"} fetchData={fetchData}/>
            </section>
        </>
    );
};

export default PurchaseOrderPage;
