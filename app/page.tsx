"use client"
import React from 'react';
import Chart from "@/components/Chart";

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

const dummyDataTransaksiKeluar = [
    { nama_bulan: 'Januari', jumlah_transaksi: 12 },
    { nama_bulan: 'Februari', jumlah_transaksi: 19 },
    { nama_bulan: 'Maret', jumlah_transaksi: 3 },
    { nama_bulan: 'April', jumlah_transaksi: 5 },
    { nama_bulan: 'Mei', jumlah_transaksi: 2 },
    { nama_bulan: 'Juni', jumlah_transaksi: 3 },
];

const dummyDataTransaksiMasuk = [
    { nama_bulan: 'Januari', jumlah_transaksi: 15 },
    { nama_bulan: 'Februari', jumlah_transaksi: 10 },
    { nama_bulan: 'Maret', jumlah_transaksi: 6 },
    { nama_bulan: 'April', jumlah_transaksi: 8 },
    { nama_bulan: 'Mei', jumlah_transaksi: 12 },
    { nama_bulan: 'Juni', jumlah_transaksi: 5 },
];

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
    return (
        <div className="max-container p-4">
            <h1 className="text-5xl font-bold text-[#292929]">Home</h1>
            <div className="menu-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4 mt-8">
                {menuItems.map((item, index) => (
                    <MenuBox key={index} {...item} />
                ))}
            </div>

            <div className="mt-8">
                <div className="mb-4 bg-white p-6 rounded-xl">
                    <h2 className="text-2xl font-bold mb-2">Grafik Jumlah Transaksi Keluar</h2>
                    <Chart data={dummyDataTransaksiKeluar} title="Jumlah Transaksi Keluar" color="#6EE7B7" />
                </div>

                <div className="mb-4 bg-white p-6 rounded-xl">
                    <h2 className="text-2xl font-bold mb-2">Grafik Jumlah Transaksi Masuk</h2>
                    <Chart data={dummyDataTransaksiMasuk} title="Jumlah Transaksi Masuk" color="#FCA5A5"/>
                </div>
            </div>
        </div>
    );
};

export default Page;
