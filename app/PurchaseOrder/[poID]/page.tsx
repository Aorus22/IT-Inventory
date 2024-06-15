'use client';
import React, {useEffect, useState} from 'react';
import DynamicForm, {DropdownItem} from "@/components/Form";
import {useParams} from "next/navigation";
import axios from "axios";
import {PurchaseOrder} from "@prisma/client";
import LoadingBar from "@/components/LoadingBar";

const Page = () => {
    const param = useParams()
    const [data, setData] = useState<PurchaseOrder>({
        id: 0, nama_pemesan: "", id_item: 0, deskripsi: "", status: "", tanggal: new Date()
    });
    const [loading, setLoading] = useState(true);
    const [item, setItem] = useState<DropdownItem[]>([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`/api/PurchaseOrder?id=${param.poID}`);
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

    }, [param.poID]);

    const dropdowns = {
        id_item: item,
    };

    const ignore = ["status"]

    if (loading) {
        return <LoadingBar />
    }

    if (param.poID === "Tambah"){
        return (
            <div className="max-container p-4">
                <h1 className="text-5xl font-bold text-[#292929] mb-4">Tambah Purchase Order</h1>
                <DynamicForm data={data} setData={setData} isNewForm={true} urlApi="PurchaseOrder" dropdowns={dropdowns} ignore={ignore}/>
            </div>
        )
    }

    return (
        <div className="max-container p-4">
            <h1 className="text-5xl font-bold text-[#292929] mb-4">Detail Purchase Order</h1>
            <DynamicForm data={data} setData={setData} isNewForm={false} urlApi="PurchaseOrder" dropdowns={dropdowns} ignore={ignore}/>
        </div>
    );
};

export default Page;
