"use client"
import React, {useEffect, useState} from 'react';
import Table from "@/components/Tabel";

interface Project {
    id: string,
    name: string,
    deskripsi: string,
    status: string,
    tanggal_mulai: string,
    tanggal_selesai: string
}

const ProjectPage = () => {
    const [daftarProject, setDaftarProject] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/project');
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                setDaftarProject(data);
            } catch (error) {
                console.error(error)
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleDelete = (index: number) => {
        alert(`Item with index ${index} is deleted.`);
    };

    const handleDetail = (index: number) => {
        alert(`Detail of item with index ${index} is displayed.`);
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
