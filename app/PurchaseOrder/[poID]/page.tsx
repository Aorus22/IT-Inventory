'use client';
import React, {useEffect, useState} from 'react';
import DynamicForm, {DropdownItem} from "@/components/Form";
import {useParams} from "next/navigation";
import axios from "axios";
import {Item, PurchaseOrder} from "@prisma/client";
import LoadingBar from "@/components/LoadingBar";
import PageTitle from "@/components/PageTitle";
import excelPO, {saveFile} from "@/util/excelPO";
import excel from "@/util/excelPO";

const Page = () => {
    const param = useParams()
    const [data, setData] = useState<PurchaseOrder>({
        id: 0, nama_pemesan: "", id_item: 0, kuantitas: 0, deskripsi: "", status: "", tanggal: new Date()
    });
    const [currentItem, setCurrentItem] = useState<Item>({
        id: 0, nama_item: "", id_jenis_barang: 0, gambar: "", deskripsi: "", stok: 0, harga: 0
    })
    const [loading, setLoading] = useState(true);
    const [dropdownItem, setDropdownItem] = useState<DropdownItem[]>([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get<PurchaseOrder>(`/api/PurchaseOrder?id=${param.poID}`);
                response.data.tanggal = new Date(response.data.tanggal);
                setData(response.data);
                return response.data;
            } catch (error) {
                console.error('Failed to fetch data:', error);
                throw error; // re-throw the error to ensure loading state is correctly handled
            }
        };

        const fetchDropdown = async (data?: PurchaseOrder) => {
            try {
                const response2 = await axios.get<Item[]>(`/api/Inventory`);
                const fetchedData = response2.data;
                if (param.poID !== "Tambah") {
                    const currentItem = fetchedData.filter(item => item.id === data?.id_item);
                    setCurrentItem(currentItem[0]);
                }
                const dropdownOptions = fetchedData.map((item: any) => ({
                    id: item.id,
                    value: item.nama_item
                }));
                setDropdownItem(dropdownOptions);
            } catch (error) {
                console.error('Failed to fetch data:', error);
            }
        };

        const fetchDataAndDropdown = async () => {
            setLoading(true);
            try {
                const data = await fetchData();
                await fetchDropdown(data);
            } catch (error) {
                console.error(error)
            } finally {
                setLoading(false);
            }
        };

        if (param.poID !== "Tambah") {
            fetchDataAndDropdown().then();
        } else {
            fetchDropdown().then()
            setLoading(false)
        }
    }, [param.poID]);


    const dropdowns = {
        id_item: dropdownItem,
    };

    const ignore = ["status"]

    const handleGenerateForm = async () => {
        await excelPO(data, currentItem)
        // const dataPOST = {
        //     dataPO: data,
        //     dataItem: currentItem
        // }
        // try {
        //     const res = await axios.post(`/api/Excel`, dataPOST)
        //     saveFile( Buffer.from(res.data, 'binary'))
        // } catch (err){
        //     console.error(err)
        // }
    }

    if (loading) {
        return <LoadingBar />
    }

    if (param.poID === "Tambah"){
        return (
            <div className="max-container p-4">
                <PageTitle title={"Tambah Purchase Order"} />
                <DynamicForm data={data} setData={setData} isNewForm={true} urlApi="PurchaseOrder" dropdowns={dropdowns} ignore={ignore}/>
            </div>
        )
    }

    return (
        <div className="max-container p-4">
            <PageTitle title={"Detail Purchase Order"} />
            <DynamicForm data={data} setData={setData} isNewForm={false} urlApi="PurchaseOrder" dropdowns={dropdowns} ignore={ignore}/>
            {data.status === "approved" && (
                <div className="rounded-xl bg-white py-5 w-full my-4 flex items-center justify-center">
                    <button className="text-xl bg-green-200 hover:bg-green-400 text-green-800 font-bold py-2 px-4 rounded"
                            onClick={handleGenerateForm}
                    >
                        Generate Form
                    </button>
                </div>
            )}
        </div>
    );
};

export default Page;
