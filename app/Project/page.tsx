"use client"
import React, {useEffect, useState} from 'react';
import Table from "@/components/Tabel";
import {useRouter} from "next/navigation";
import axios from "axios";

export interface Project {
    id: string,
    name: string,
    deskripsi: string,
    status: string,
    tanggal_mulai: string,
    tanggal_selesai: string
}

const ProjectPage = () => {
    const router = useRouter()
    const [daftarProject, setDaftarProject] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData().then();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('/api/project');
            setDaftarProject(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Failed to fetch data:', error);
        }
    };

    const handleDelete = async (id: string) => {
        try {
            const response = await axios.delete(`/api/project?id=${id}`);
            fetchData().then();
            alert('Data deleted successfully');
        } catch (error) {
            console.error('Failed to delete data:', error);
        }
    };

    const handleDetail = (id: string) => {
        router.push(`/Project/${id}`)
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <>
            <section className='max-container p-4'>
                <h1 className='text-5xl font-bold text-[#292929]'>Project</h1>
                <Table data={daftarProject} onDelete={handleDelete} onDetail={handleDetail} />
            </section>
        </>
    );
};

export default ProjectPage;
