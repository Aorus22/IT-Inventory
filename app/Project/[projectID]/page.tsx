'use client';
import React, {useEffect, useState} from 'react';
import DynamicForm from "@/components/Form";
import {useParams} from "next/navigation";
import axios from "axios";
import {Project} from "@prisma/client";
import LoadingBar from "@/components/LoadingBar";

const Page = () => {
    const param = useParams()
    const [data, setData] = useState<Project>({
       id: 0, nama: "",  deskripsi: "", status: "", tanggal_mulai: new Date(), tanggal_selesai: new Date()
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`/api/Project?id=${param.projectID}`);
                setData(response.data);
            } catch (error) {
                console.error('Failed to fetch data:', error);
            } finally {
                setLoading(false);
            }
        };

        if (param.projectID !== "Tambah"){
            fetchData().then();
        } else {
            setLoading(false)
        }

    }, [param.projectID]);

    if (loading) {
        return <LoadingBar />
    }

    if (param.projectID === "Tambah"){
        return (
            <div className="max-container p-4">
                <h1 className="text-5xl font-bold text-[#292929] mb-4">Tambah Project</h1>
                <DynamicForm data={data} setData={setData} isNewForm={true} urlApi="Project"/>
            </div>
        )
    }

    return (
        <div className="max-container p-4">
            <h1 className="text-5xl font-bold text-[#292929] mb-4">Detail Item</h1>
            <DynamicForm data={data} setData={setData} isNewForm={false} urlApi="Project"/>
        </div>
    );
};

export default Page;
