import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface PieChartProps {
    data: { status: string; jumlah: number }[];
}

const COLORS = ['#0088FE', '#FFBB28', '#00C49F'];

const PieChartComponent: React.FC<PieChartProps> = ({ data }) => (
    <ResponsiveContainer width="100%" height={400}>
        <PieChart>
            <Pie
                data={data}
                cx="50%"
                cy="50%"
                outerRadius={150}
                fill="#8884d8"
                dataKey="jumlah"
                nameKey="status"
                labelLine={false}
                label={({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
                    const radius = outerRadius + 10;
                    const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
                    const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));

                    return (
                        <text
                            x={x}
                            y={y}
                            fill="black"
                            textAnchor={x > cx ? 'start' : 'end'}
                            dominantBaseline="central"
                        >
                            {`${data[index].jumlah}`}
                        </text>
                    );
                }}
            >
                {
                    data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))
                }
            </Pie>
            <Tooltip />
            <Legend />
        </PieChart>
    </ResponsiveContainer>
);

export default PieChartComponent;