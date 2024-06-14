import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface ChartProps {
    data: { nama_bulan: string; jumlah_transaksi: number }[];
    title: string;
    color: string;
}

const ChartComponent: React.FC<ChartProps> = ({ data, title, color }) => {
    return (
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <XAxis dataKey="nama_bulan" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="jumlah_transaksi" fill={color} name={title} />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default ChartComponent;
