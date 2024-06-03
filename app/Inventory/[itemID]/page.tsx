'use client';
import React, {useEffect, useState} from 'react';
import DynamicForm from "@/components/Form";
import {useParams} from "next/navigation";
import axios from "axios";
import {Item} from "@prisma/client";
import LoadingBar from "@/components/LoadingBar";

const Page = () => {
    const param = useParams()
    const [data, setData] = useState<Item>({
        id: 0,  nama: "", jenis: "", deskripsi: "", gambar: "", stok: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`/api/Inventory?id=${param.itemID}`);
                setData(response.data);
            } catch (error) {
                console.error('Failed to fetch data:', error);
            } finally {
                setLoading(false);
            }
        };

        if (param.itemID !== "Tambah"){
            fetchData().then();
        } else {
            setLoading(false)
        }

    }, [param.itemID]);

    if (loading) {
        return <LoadingBar />
    }

    if (param.itemID === "Tambah"){
        return (
            <div className="max-container p-4">
                <h1 className="text-5xl font-bold text-[#292929] mb-4">Tambah Item</h1>
                <DynamicForm data={data} setData={setData} isNewForm={true} urlApi="Inventory"/>
            </div>
        )
    }

    return (
        <div className="max-container p-4">
            <h1 className="text-5xl font-bold text-[#292929] mb-4">Detail Item</h1>
            <DynamicForm data={data} setData={setData} isNewForm={false} urlApi="Inventory" />
            <img
                alt="gambar"
                src={data.gambar}
                onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.src="https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg"
                }}
            />
        </div>
    );
};

export default Page;
