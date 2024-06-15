"use client"
import React, {useEffect, useState} from 'react';
import Tabel from "@/components/Tabel";
import axios from "axios";
import {Project} from "@prisma/client";
import LoadingBar from "@/components/LoadingBar";
import PageTitle from "@/components/PageTitle";

// export interface Project {
//     id: string,
//     nama: string,
//     deskripsi: string,
//     status: string,
//     tanggal_mulai: Date,
//     tanggal_selesai: Date
// }

const ProjectPage = () => {
    const [daftarProject, setDaftarProject] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData().then();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('/api/Project');
            setDaftarProject(response.data);
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
                <PageTitle title={"Project"} />
                <Tabel data={daftarProject} apiUrl={"Project"} fetchData={fetchData}/>
            </section>
        </>
    );
};

export default ProjectPage;
