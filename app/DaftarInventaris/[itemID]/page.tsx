'use client';
import React, {useEffect, useState} from 'react';
import DynamicForm, {FormDataCustom} from "@/components/Form";
import {Item} from "@/app/DaftarInventaris/page";
import {useParams} from "next/navigation";
import axios from "axios";

const Page = () => {
    const param = useParams()
    const [data, setData] = useState<Item>({
        deskripsi: "", gambar: "", id: "", jenis: "", name: "", stok: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`/api/inventory?id=${param.itemID}`);
                setData(response.data);
            } catch (error) {
                console.error('Failed to fetch data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData().then();
    }, [param.itemID]);

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div className="max-container p-4">
            <h1 className="text-5xl font-bold text-[#292929] mb-4">Detail Item</h1>
            <DynamicForm data={data} setData={setData} />
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
