import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import ExcelJS from 'exceljs';
import {formatHeader, formatDate} from "@/util/formatString";

interface TableProps {
    data: Array<{ [key: string]: any }>;
    apiUrl: string;
    fetchData: () => void;
}

const Table: React.FC<TableProps> = ({ data, apiUrl, fetchData }) => {
    const router = useRouter();

    const [showModalDelete, setShowModalDelete] = useState(false);
    const [modalItemId, setModalItemId] = useState('');

    const handleDelete = async (id: string) => {
        setModalItemId(id);
        setShowModalDelete(true);
    };

    const confirmDelete = async () => {
        try {
            const response = await axios.delete(`/api/${apiUrl}?id=${modalItemId}`);
            if (response.status === 200) {
                alert('Data deleted successfully');
                fetchData();
            } else {
                alert('Failed to delete data');
            }
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                if (error.response) {
                    if (error.response.status === 401) {
                        alert('Unauthorized operation');
                    } else if (error.response.data && error.response.data.error) {
                        alert(`Failed to delete data: ${error.response.data.error}`);
                    } else {
                        alert('Failed to delete data');
                    }
                } else {
                    alert('Failed to delete data');
                }
            } else {
                alert('An unexpected error occurred');
            }
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

    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(() => {
        return parseInt(localStorage.getItem('itemsPerPage') || '10');
    });

    useEffect(() => {
        localStorage.setItem('itemsPerPage', itemsPerPage.toString());
    }, [itemsPerPage]);

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
        setCurrentPage(1);
    };

    const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'ascending' | 'descending' | '' }>({ key: '', direction: '' });

    const handleSort = (key: string) => {
        let direction: 'ascending' | 'descending' | '' = 'ascending';

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
        const pdfTable = document.querySelector('#pdf-table') as HTMLTableElement;

        if (!pdfTable) {
            console.error('Element with ID "pdf-table" not found.');
            return;
        }

        const actionColumns = pdfTable.querySelectorAll('th:last-child, td:last-child') as NodeListOf<HTMLElement>;
        actionColumns.forEach(col => {
            col.style.display = 'none';
        });

        const totalPagesExpander = new Promise<void>(resolve => {
            const pdfWidth = doc.internal.pageSize.getWidth();
            const pdfHeight = doc.internal.pageSize.getHeight();
            html2canvas(pdfTable, {
                scale: 1
            }).then(canvas => {
                const imgData = canvas.toDataURL('image/png');
                const imgHeight = (canvas.height * pdfWidth) / canvas.width;
                let position = 0;

                // Calculate total pages
                const totalRows = pdfTable.rows.length;
                const pageHeight = pdfHeight - 40; // accounting for margins

                const renderPage = () => {
                    doc.addImage(imgData, 'PNG', 40, 40 + position, pdfWidth - 80, imgHeight);
                    position -= pageHeight;

                    // Check if there are remaining rows to render
                    if (position <= -imgHeight) {
                        doc.addPage();
                        resolve();
                    } else {
                        doc.addPage();
                        renderPage();
                    }
                };

                renderPage();
            });
        });

        totalPagesExpander.then(() => {
            actionColumns.forEach(col => {
                col.style.display = '';
            });

            doc.save('table.pdf');
        }).catch(error => {
            console.error('Failed to generate PDF:', error);
            actionColumns.forEach(col => {
                col.style.display = '';
            });
        });
    };

    const exportToExcel = () => {
        const workbook = new ExcelJS.Workbook();
        const sheet = workbook.addWorksheet('Sheet1');

        const headers = Object.keys(currentItems[0]);
        sheet.addRow(headers);

        currentItems.forEach(item => {
            const row = Object.values(item);
            sheet.addRow(row);
        });

        workbook.xlsx.writeBuffer().then(buffer => {
            const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            const filename = 'table.xlsx';
            const href = URL.createObjectURL(blob);

            const a = document.createElement('a');
            a.href = href;
            a.download = filename;
            a.click();
            URL.revokeObjectURL(href);
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
                <div>
                    <button
                        className="bg-red-200 hover:bg-red-400 text-red-800 font-bold py-2 px-4 rounded"
                        onClick={exportToPdf}
                    >
                        Export to PDF
                    </button>
                    <button
                        className="bg-green-200 hover:bg-green-400 text-green-800 font-bold py-2 px-4 rounded ml-2"
                        onClick={exportToExcel}
                    >
                        Export to Excel
                    </button>
                </div>
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
