import React from 'react';

const Unauthorized: React.FC = () => {
    return (
        <div className="flex justify-center items-center h-[90vh] bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                <h1 className="text-3xl font-bold mb-4">Unauthorized</h1>
                <p className="text-lg">You do not have permission to view this page.</p>
                <a href="/" className="mt-6 inline-block text-blue-500 hover:underline">
                    Go to Home
                </a>
            </div>
        </div>
    );
};

export default Unauthorized;
