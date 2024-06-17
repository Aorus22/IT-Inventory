"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LineChart from "@/components/LineChart";
import PieChart from "@/components/PieChart";
import BarChart from "@/components/BarChart";

interface MenuItem {
    href: string;
    label: string;
    svg: string;
    color: string;
}

const menuItems: MenuItem[] = [
    {
        href: '/Inventory',
        label: 'Daftar Inventaris',
        svg: '/icon/inventory.svg',
        color: '#FFCB77',
    },
    {
        href: '/Project',
        label: 'Project',
        svg: '/icon/project.svg',
        color: '#7F9CF5',
    },
    {
        href: '/Transaksi',
        label: 'Transaksi',
        svg: '/icon/transaksi.svg',
        color: '#6EE7B7',
    },
    {
        href: '/PurchaseOrder',
        label: 'Purchase Order',
        svg: '/icon/purchaseorder.svg',
        color: '#FCA5A5',
    },
];

// const dummyDataTransaksiKeluar = [
//     { nama_bulan: 'Januari', jumlah_transaksi: 12 },
//     { nama_bulan: 'Februari', jumlah_transaksi: 19 },
//     { nama_bulan: 'Maret', jumlah_transaksi: 3 },
//     { nama_bulan: 'April', jumlah_transaksi: 5 },
//     { nama_bulan: 'Mei', jumlah_transaksi: 2 },
//     { nama_bulan: 'Juni', jumlah_transaksi: 3 },
// ];
//
// const dummyDataTransaksiMasuk = [
//     { nama_bulan: 'Januari', jumlah_transaksi: 15 },
//     { nama_bulan: 'Februari', jumlah_transaksi: 10 },
//     { nama_bulan: 'Maret', jumlah_transaksi: 6 },
//     { nama_bulan: 'April', jumlah_transaksi: 8 },
//     { nama_bulan: 'Mei', jumlah_transaksi: 12 },
//     { nama_bulan: 'Juni', jumlah_transaksi: 5 },
// ];

// const dummyDataTransaksiBarang = [
//     { jenis_barang: "Kain", jumlah_transaksi: 120 },
//     { jenis_barang: "Benang", jumlah_transaksi: 80 },
//     { jenis_barang: "Jarum", jumlah_transaksi: 50 },
//     { jenis_barang: "Velcro", jumlah_transaksi: 30 },
//     { jenis_barang: "Zipper", jumlah_transaksi: 60 },
//     { jenis_barang: "Project", jumlah_transaksi: 100 },
//     { jenis_barang: "Sampel", jumlah_transaksi: 40 },
//     { jenis_barang: "Kancing", jumlah_transaksi: 70 },
//     { jenis_barang: "Ribbon", jumlah_transaksi: 55 },
//     { jenis_barang: "Mesin", jumlah_transaksi: 25 },
//     { jenis_barang: "Misselenaiois", jumlah_transaksi: 15 },
// ];

// const dummyDataStatusProject = [
//     { status: 'ongoing', jumlah: 20 },
//     { status: 'pending', jumlah: 10 },
//     { status: 'completed', jumlah: 30 },
// ];

const MenuBox: React.FC<MenuItem> = ({ href, label, svg, color }) => {
    return (
        <a
            href={href}
            className={`menu-box flex flex-col items-center justify-center p-4 border rounded-xl shadow-md hover:bg-gray-100 transition`}
            style={{ backgroundColor: color }}
        >
            <img src={svg} alt={label} className="h-12 mb-2" />
            <span className="text-center">{label}</span>
        </a>
    );
};

const Page: React.FC = () => {
    const [transaksiKeluar, setTransaksiKeluar] = useState<any[]>([]);
    const [transaksiMasuk, setTransaksiMasuk] = useState<any[]>([]);
    const [transaksiJenisBarang, setTransaksiJenisBarang] = useState<any[]>([])
    const [projectPerStatus, setProjectPerStatus] = useState<any[]>([])

    useEffect(() => {
        async function fetchTransaksiPerBulan(jenis: string) {
            try {
                const response = await axios.get(`/api/Transaksi/TransaksiPerBulan?jenis=${jenis}`);
                if (jenis === 'keluar') {
                    setTransaksiKeluar(response.data);
                } else if (jenis === 'masuk') {
                    setTransaksiMasuk(response.data);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        async function fetchTransaksiPerJenisBarang() {
            try {
                const response = await axios.get(`/api/Transaksi/TransaksiPerJenisBarang`);
                setTransaksiJenisBarang(response.data)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        async function fetchProjectPerStatus() {
            try {
                const response = await axios.get(`/api/Project/ProjectPerStatus`);
                setProjectPerStatus(response.data)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        fetchTransaksiPerBulan('keluar').then();
        fetchTransaksiPerBulan('masuk').then();
        fetchTransaksiPerJenisBarang().then();
        fetchProjectPerStatus().then();
    }, []);

    return (
        <div className="max-container p-4">
            <h1 className="text-5xl font-bold text-[#292929]">Home</h1>
            <div className="menu-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4 mt-8">
                {menuItems.map((item, index) => (
                    <MenuBox key={index} {...item} />
                ))}
            </div>

            <div className="mt-8">
                <div className="mb-4 bg-white p-6 rounded-xl flex-col justify-center items-center flex">
                    <h2 className="text-2xl font-bold mb-2">Jumlah Transaksi Per Jenis Barang</h2>
                    <BarChart data={transaksiJenisBarang} title="Jumlah Transaksi Per Jenis Barang" color="#6EE7B7"
                              dataKeyX="jenis_barang" dataKeyY="jumlah_transaksi"/>
                </div>

                <div className="mb-4 bg-white p-6 rounded-xl flex-col justify-center items-center flex">
                    <h2 className="text-2xl font-bold mb-2">Jumlah Transaksi Keluar</h2>
                    <LineChart data={transaksiKeluar} title="Jumlah Transaksi Keluar" color="#6EE7B7"
                               dataKeyX="nama_bulan" dataKeyY="jumlah_transaksi"/>
                </div>

                <div className="mb-4 bg-white p-6 rounded-xl flex-col justify-center items-center flex">
                    <h2 className="text-2xl font-bold mb-2">Jumlah Transaksi Masuk</h2>
                    <LineChart data={transaksiMasuk} title="Jumlah Transaksi Masuk" color="#FCA5A5"
                               dataKeyX="nama_bulan" dataKeyY="jumlah_transaksi"/>
                </div>

                <div className="mb-4 bg-white p-6 rounded-xl flex-col justify-center items-center flex">
                    <h2 className="text-2xl font-bold mb-2">Status Project</h2>
                    <PieChart data={projectPerStatus}/>
                </div>
            </div>
        </div>
    );
};

export default Page;
