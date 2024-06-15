"use client"
import React, { useEffect, useState } from 'react';
import DynamicForm, { DropdownItem } from "@/components/Form";
import { useParams } from "next/navigation";
import axios from "axios";
import { Item } from "@prisma/client";
import LoadingBar from "@/components/LoadingBar";
import PageTitle from "@/components/PageTitle";

const Page = () => {
    const param = useParams();
    const [data, setData] = useState<Item>({
        id: 0, nama_item: "", id_jenis_barang: 0, gambar: "", deskripsi: "", stok: 0, harga: 0
    });
    const [jenisBarang, setJenisBarang] = useState<DropdownItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response1 = await axios.get(`/api/Inventory?id=${param.itemID}`);
                setData(response1.data);
            } catch (error) {
                console.error('Failed to fetch data:', error);
            } finally {
                setLoading(false);
            }
        };

        const fetchDropdown = async () => {
            try {
                const response2 = await axios.get(`/api/JenisBarang`)
                const fetchedData = response2.data
                const dropdownOptions = fetchedData.map((item: any) => ({
                    id: item.id,
                    value: item.nama_jenis
                }));
                setJenisBarang(dropdownOptions);
            } catch (error) {
                console.error('Failed to fetch data:', error);
            }
        }

        if (param.itemID && param.itemID !== "Tambah") {
            fetchData().then();
            fetchDropdown().then();
        } else {
            fetchDropdown().then();
            setLoading(false);
        }

    }, [param.itemID]);

    const dropdowns = {
        id_jenis_barang: jenisBarang,
    };

    if (loading) {
        return <LoadingBar />
    }

    if (param.itemID === "Tambah") {
        return (
            <div className="max-container p-4">
                <PageTitle title={"Tambah Item"} />
                <DynamicForm data={data} setData={setData} isNewForm={true} urlApi="Inventory" dropdowns={dropdowns} />
            </div>
        )
    }

    return (
        <div className="max-container p-4">
            <PageTitle title={"Detail Item"} />
            <DynamicForm data={data} setData={setData} isNewForm={false} urlApi="Inventory" dropdowns={dropdowns} />
            <img
                alt="gambar"
                src={data.gambar}
                onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.src = "https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg"
                }}
            />
        </div>
    );
};

export default Page;
