"use client"
import Link from 'next/link';
import React, { useState } from 'react';

type User = {
    nama: string,
    role: string,
    profilePic: string
}

const Sidebar = () => {
    const [open, setOpen] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState<User>({
        profilePic: "",
        role: "",
        nama: ""
        }
    );

    const menuItems = [
        {
            href: '/',
            label: 'Home',
            svg: <img src="/icon/home.svg" alt="Home" />,
        },
        {
            href: '/Inventory',
            label: 'Daftar Inventaris',
            svg: <img src="/icon/inventory.svg" alt="Inventory" />
        },
        {
            href: '/Project',
            label: 'Project',
            svg: <img src="/icon/project.svg" alt="Project" />
        },
        {
            href: '/Transaksi',
            label: 'Transaksi',
            svg: <img src="/icon/transaksi.svg" alt="Transaksi" />
        },
        {
            href: '/PurchaseOrder',
            label: 'Purchase Order',
            svg: <img src="/icon/purchaseorder.svg" alt="Purchase Order" />
        },
    ];

    const handleLogin = () => {
        setIsLoggedIn(true);
        setUser({ nama: 'John Doe', role: 'Admin', profilePic: '/placeholder_pp.jpg' });
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setUser({
            profilePic: "",
            role: "",
            nama: ""});
    };

    return (
        <div className={` ${open ? "w-60" : "w-20 "} bg-[#292929] h-screen p-5 pt-8 relative duration-300`}>
            <div onClick={() => setOpen(!open)}
                 className={`absolute -right-4 top-9 w-8 h-8 rounded-full bg-white border z-10 flexCenter cursor-pointer ${!open && 'rotate-180'} duration-300`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                     className='fill-[#292929] p-1'>
                    <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z"/>
                </svg>
            </div>
            <div className="flex gap-x-4 items-center">
                <h1 className={`text-white origin-left font-medium text-xl duration-200 ${!open && "scale-0"}`}>Menu</h1>
            </div>
            <ul className="pt-6">
                {menuItems.map((item, index) => (
                    <li key={index}
                        className="text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-light-white rounded-md mt-2">
                        <Link href={item.href}>
                            <div className="flex items-center">
                                {item.svg}
                                <span
                                    className={`${!open && 'hidden'} origin-left duration-200 ml-4`}>{item.label}</span>
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>
            {isLoggedIn ? (
                <div className="absolute bottom-0 left-0 right-0 p-5 bg-gray-900">
                    <div className="flex items-center gap-x-4 text-white">
                        <img src={user?.profilePic} alt="Profile" className="w-8 h-8 rounded-full" />
                        <div>
                            <p>{user.nama}</p>
                            <p>{user.role}</p>
                        </div>
                        <button className="text-white" onClick={handleLogout}>Logout</button>
                    </div>
                </div>
            ) : (
                <div className="absolute bottom-0 left-0 right-0 p-5 bg-gray-900">
                    <button className="text-white" onClick={handleLogin}>Login</button>
                </div>
            )}
        </div>
    );
};

export default Sidebar;
