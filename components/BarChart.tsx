import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface DataItem {
    [key: string]: string | number;
}

interface ChartProps {
    data: DataItem[];
    title: string;
    color: string;
    dataKeyX: string;
    dataKeyY: string;
}


const ChartComponent: React.FC<ChartProps> = ({ data, title, color, dataKeyX, dataKeyY }) => {
    return (
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <XAxis dataKey={dataKeyX} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey={dataKeyY} fill={color} name={title} />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default ChartComponent;