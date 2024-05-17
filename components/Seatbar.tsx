import React from 'react';

interface SeatBarProps {
    totalSeats: number;
    remainingSeats: number;
}

const SeatBar: React.FC<SeatBarProps> = ({ totalSeats, remainingSeats }) => {
    const percentage = (remainingSeats / totalSeats) * 100;

    return (
        <div className="relative bg-gray-30 rounded-2xl h-10 w-full">
            <div
                className="bg-[#f14310] rounded-2xl h-10"
                style={{ width: `${percentage}%` }}
            >
                <p className='text-white   font-bold p-2 absolute left-1/2 transform -translate-x-1/2 top-1/2 -translate-y-1/2 whitespace-nowrap'>Sisa Kuota : {remainingSeats}</p>
            </div>
        </div>
    );
};

export default SeatBar;
