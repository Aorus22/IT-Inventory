"use client";
import React, { useEffect, useState } from 'react';
import Tabel from "@/components/Tabel";
import axios from "axios";
import {Item, JenisBarang} from "@prisma/client";
import LoadingBar from "@/components/LoadingBar";
import PageTitle from "@/components/PageTitle";

const Page = () => {
    const [jenisData, setJenisData] = useState<JenisBarang[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData().then();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('/api/JenisBarang');
            setJenisData(response.data);
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
                <PageTitle title={"Jenis Barang"} />
                <Tabel data={jenisData} apiUrl={"JenisBarang"} fetchData={fetchData}/>
            </section>
        </>
    );
};

export default Page;
