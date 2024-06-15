'use client';
import React, {useEffect, useState} from 'react';
import DynamicForm, {DropdownItem} from "@/components/Form";
import {useParams} from "next/navigation";
import axios from "axios";
import {Transaksi} from "@prisma/client";
import LoadingBar from "@/components/LoadingBar";

const Page = () => {
    const param = useParams()
    const [data, setData] = useState<Transaksi>({
        id: 0, jenis_transaksi:"masuk", nama_customer: "", id_item: 0, kuantitas: 0, status: "", tanggal: new Date()
    });
    const [loading, setLoading] = useState(true);
    const [item, setItem] = useState<DropdownItem[]>([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`/api/Transaksi?id=${param.transaksiID}`);
                setData(response.data);
            } catch (error) {
                console.error('Failed to fetch data:', error);
            } finally {
                setLoading(false);
            }
        };

        const fetchDropdown = async () => {
            try {
                const response2 = await axios.get(`/api/Inventory`)
                const fetchedData = response2.data
                const dropdownOptions = fetchedData.map((item: any) => ({
                    id: item.id,
                    value: item.nama_item
                }));
                setItem(dropdownOptions);
            } catch (error) {
                console.error('Failed to fetch data:', error);
            }
        }

        if (param.poID !== "Tambah"){
            fetchData().then();
            fetchDropdown().then()
        } else {
            fetchDropdown().then()
            setLoading(false)
        }

    }, [param.transaksiID]);

    const dropdowns = {
        id_item: item,
        jenis_transaksi: [
            {id: "keluar", value: "keluar"},
            {id: "masuk", value: "masuk"},
        ]
    };

    const ignore = ["status"]

    if (loading) {
        return <LoadingBar />
    }

    if (param.transaksiID === "Tambah"){
        return (
            <div className="max-container p-4">
                <h1 className="text-5xl font-bold text-[#292929] mb-4">Tambah Transaksi</h1>
                <DynamicForm data={data} setData={setData} isNewForm={true} urlApi="Transaksi" dropdowns={dropdowns} ignore={ignore}/>
            </div>
        )
    }

    return (
        <div className="max-container p-4">
            <h1 className="text-5xl font-bold text-[#292929] mb-4">Detail Transaksi</h1>
            <DynamicForm data={data} setData={setData} isNewForm={false} urlApi="Transaksi" dropdowns={dropdowns} ignore={ignore}/>
        </div>
    );
};

export default Page;
