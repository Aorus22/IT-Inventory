"use client";
import React, { useEffect, useState } from 'react';
import Tabel from "@/components/Tabel";
import axios from "axios";
import {Item} from "@prisma/client";
import LoadingBar from "@/components/LoadingBar";
import PageTitle from "@/components/PageTitle";

// export interface Item {
//     id: string,
//     nama: string,
//     jenis: string,
//     deskripsi: string,
//     stok: number,
//     gambar: string
// }

const Page = () => {
    const [inventoryData, setInventoryData] = useState<Item[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData().then();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('/api/Inventory');
            setInventoryData(response.data);
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
                <PageTitle title={"Inventaris"} />
                <Tabel data={inventoryData} apiUrl={"Inventory"} fetchData={fetchData}/>
            </section>
        </>
    );
};

export default Page;
