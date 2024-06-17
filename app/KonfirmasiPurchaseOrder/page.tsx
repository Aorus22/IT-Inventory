"use client"
import React, {useEffect, useState} from 'react';
import Tabel from "@/components/Tabel";
import axios from "axios";
import {PurchaseOrder} from "@prisma/client";
import LoadingBar from "@/components/LoadingBar";
import PageTitle from "@/components/PageTitle";
import BoxKonfirmasi from "@/components/BoxKonfirmasi";

const PurchaseOrderPage = () => {
    const [daftarPO, setDaftarPO] = useState<PurchaseOrder[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData().then();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('/api/PurchaseOrder?status=pending');
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
                <PageTitle title={"Konfirmasi Purchase Order"}/>
                <div className="grid grid-cols-3 gap-3 mt-4">
                    {daftarPO.map((item, index) => (
                        <BoxKonfirmasi key={index} data={item} fetchData={fetchData} apiUrl={"PurchaseOrder"}/>
                    ))}
                </div>
            </section>
        </>
    );
};

export default PurchaseOrderPage;
