import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface TableProps {
    data: Array<{ [key: string]: any }>;
    apiUrl: string;
    fetchData: () => void;
}

const formatHeader = (key: string) => {
    return key.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
};

const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
};

const Table: React.FC<TableProps> = ({ data, apiUrl, fetchData }) => {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(() => {
        return parseInt(localStorage.getItem('itemsPerPage') || '10');
    });

    useEffect(() => {
        localStorage.setItem('itemsPerPage', itemsPerPage.toString());
    }, [itemsPerPage]);

    const [showModalDelete, setShowModalDelete] = useState(false);
    const [modalItemId, setModalItemId] = useState('');

    const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'ascending' | 'descending' | '' }>({ key: '', direction: '' });

    const handleDelete = async (id: string) => {
        setModalItemId(id);
        setShowModalDelete(true);
    };

    const confirmDelete = async () => {
        try {
            await axios.delete(`/api/${apiUrl}?id=${modalItemId}`);
            fetchData();
            alert('Data deleted successfully');
        } catch (error) {
            console.error('Failed to delete data:', error);
        } finally {
            setShowModalDelete(false);
        }
    };

    const cancelDelete = () => {
        setShowModalDelete(false);
    };

    const handleDetail = (id: string) => {
        router.push(`/${apiUrl}/${id}`);
    };

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
        setCurrentPage(1);
    };

    const handleSort = (key: string) => {
        let direction: 'ascending' | 'descending' | '' = 'ascending'; // Default to ascending

        if (sortConfig.key === key) {
            if (sortConfig.direction === 'ascending') {
                direction = 'descending';
            } else if (sortConfig.direction === 'descending') {
                direction = '';
            }
        }

        setSortConfig({ key, direction });
    };

    const sortedData = [...data].sort((a, b) => {
        if (sortConfig.key && sortConfig.direction) {
            if (a[sortConfig.key] < b[sortConfig.key]) {
                return sortConfig.direction === 'ascending' ? -1 : 1;
            }
            if (a[sortConfig.key] > b[sortConfig.key]) {
                return sortConfig.direction === 'ascending' ? 1 : -1;
            }
            return 0;
        }
        return 0;
    });

    const filteredData = sortedData.filter(item =>
        Object.values(item).some(value =>
            value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    const handleChangePage = (page: number) => {
        setCurrentPage(page);
    };

    const handleChangeItemsPerPage = (value: string) => {
        setItemsPerPage(parseInt(value));
        setCurrentPage(1);
    };

    const exportToPdf = () => {
        const doc = new jsPDF('p', 'pt', 'a4');
        const pdfTable = document.querySelector('#pdf-table');

        if (!pdfTable) {
            console.error('Element with ID "pdf-table" not found.');
            return;
        }

        const actionColumns = pdfTable.querySelectorAll('th:last-child, td:last-child');
        actionColumns.forEach(col => {
            (col as HTMLElement).style.display = 'none';
        });

        html2canvas(pdfTable as HTMLElement, {
            scale: 1
        }).then(canvas => {

            actionColumns.forEach(col => {
                (col as HTMLElement).style.display = '';
            });

            const imgData = canvas.toDataURL('image/png');
            const pdfWidth = doc.internal.pageSize.getWidth();
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

            doc.addImage(imgData, 'PNG', 40, 40, pdfWidth - 80, pdfHeight);
            doc.save('table.pdf');
        }).catch(error => {
            console.error('Failed to generate PDF:', error);
            actionColumns.forEach(col => {
                (col as HTMLElement).style.display = '';
            });
        });
    };

    const pagination = (
        <div className="flex justify-between items-center mt-4 mb-2">
            <div>
                <span className="mr-2">Items per halaman:</span>
                <select
                    value={itemsPerPage}
                    onChange={(e) => handleChangeItemsPerPage(e.target.value)}
                    className="border rounded-lg py-2 px-4 border-black"
                >
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                </select>
            </div>
            <div className="flex justify-center items-center space-x-2">
                <button
                    className={`bg-white text-black font-semibold py-2 px-4 border border-black rounded-lg ${currentPage === 1 ? 'pointer-events-none bg-gray-300' : 'hover:bg-gray-100'}`}
                    onClick={() => handleChangePage(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    {"<"}
                </button>
                <div className="flex h-full justify-center items-center text-center">
                    <span className="black px-4 py-2 rounded-lg">{currentPage}</span>
                </div>
                <button
                    className={`bg-white text-black font-semibold py-2 px-4 border border-black rounded-lg ${currentPage === totalPages ? 'pointer-events-none bg-gray-300' : 'hover:bg-gray-100'}`}
                    onClick={() => handleChangePage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    {">"}
                </button>
            </div>
        </div>
    );

    return (
        <div className="px-8 py-4 mt-3 bg-white rounded-xl relative">
            <div className="flex justify-between items-center my-4">
                <button
                    className="bg-[#2c3f79] text-white flex items-center space-x-2 font-semibold py-2 px-4 border border-black rounded-lg hover:bg-gray-100 hover:text-[#2c3f79]"
                    onClick={() => router.push(`/${apiUrl}/Tambah`)}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                         className="h-6 w-6">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} stroke="currentColor"
                              d="M12 4v16m8-8H4"/>
                    </svg>
                    <span>Tambah</span>
                </button>
                <button
                    className="bg-green-200 hover:bg-green-400 text-green-800 font-bold py-2 px-4 rounded"
                    onClick={exportToPdf}
                >
                    Export to PDF
                </button>
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search"
                        value={searchTerm}
                        onChange={handleSearch}
                        className="border rounded-lg py-2 px-4 pl-10 border-black w-full"
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none"
                             viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="M10 6a4 4 0 100 8 4 4 0 000-8zM21 21l-5.2-5.2"/>
                        </svg>
                    </div>
                </div>
            </div>
            {pagination}
            {filteredData.length <= 0 || currentItems.length <= 0 ? (
                <p className="text-center p-4">Tidak ada data yang tersedia.</p>
            ) : (
                <>
                    <table id="pdf-table" className="table-auto w-full border-collapse">
                        <thead>
                        <tr className="h-12 bg-white border-b-2 border-black">
                            <th className="px-4 py-2">No</th>
                            {Object.keys(currentItems[0]).map((key, index) => (
                                <th
                                    key={index}
                                    className="px-4 py-2 cursor-pointer"
                                    onClick={() => handleSort(key)}
                                >
                                    {formatHeader(key)}
                                    {sortConfig.key === key && sortConfig.direction !== '' && (
                                        <span>
                                            {sortConfig.direction === 'ascending' ? ' ▲' : ' ▼'}
                                        </span>
                                    )}
                                </th>
                            ))}
                            <th className="px-4 py-2">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {currentItems.map((item, index) => (
                            <tr key={index} className="bg-white border-b-2">
                                <td className="px-4 py-2">{indexOfFirstItem + index + 1}</td>
                                {Object.entries(item).map(([key, value], i) => (
                                    <td key={i} className="px-4 py-2">
                                        {key.includes('tanggal') || key.includes('date') ? formatDate(value) : value}
                                    </td>
                                ))}
                                <td className="px-4 py-2">
                                    <div className="flex flex-col items-center space-y-2">
                                        <button
                                            className="bg-blue-200 hover:bg-blue-400 text-blue-800 font-bold py-2 px-4 rounded"
                                            onClick={() => handleDetail(item.id)}
                                        >
                                            Detail
                                        </button>
                                        <button
                                            className="bg-red-200 hover:bg-red-400 text-red-800 font-bold py-2 px-4 rounded"
                                            onClick={() => handleDelete(item.id)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    {pagination}
                </>
            )}

            {showModalDelete && (
                <>
                    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-700 bg-opacity-50">
                        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                            <p className="text-lg mb-4">Are you sure you want to delete this item?</p>
                            <div className="flex justify-end space-x-4">
                                <button
                                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                                    onClick={confirmDelete}
                                >
                                    Yes
                                </button>
                                <button
                                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                                    onClick={cancelDelete}
                                >
                                    No
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="fixed inset-0 bg-gray-700 bg-opacity-50 z-40" />
                </>
            )}
        </div>
    );
};

export default Table;
