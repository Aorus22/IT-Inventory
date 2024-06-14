"use client"
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import {usePathname} from "next/navigation";

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
    });

    const [activePage, setActivePage] = useState('/');
    const pathname = usePathname();

    useEffect(() => {
        setActivePage(pathname);
    }, [pathname]);

    const menuItems = [
        {
            href: '/',
            label: 'Home',
            svg: '/icon/home.svg',
        },
        {
            href: '/Inventory',
            label: 'Daftar Inventaris',
            svg: '/icon/inventory.svg',
        },
        {
            href: '/Project',
            label: 'Project',
            svg: '/icon/project.svg',
        },
        {
            href: '/Transaksi',
            label: 'Transaksi',
            svg: '/icon/transaksi.svg',
        },
        {
            href: '/PurchaseOrder',
            label: 'Purchase Order',
            svg: '/icon/purchaseorder.svg',
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
            nama: ""
        });
    };

    return (
        <div className={` ${open ? "w-60" : "w-20 "} bg-[#2c3f79] h-screen pr-8 pt-8 relative duration-300`}>
            <div onClick={() => setOpen(!open)}
                 className={`absolute -right-4 top-9 w-8 h-8 rounded-full bg-white border z-10 flexCenter cursor-pointer ${!open && 'rotate-180'} duration-300`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                     className='fill-[#292929] p-1'>
                    <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z"/>
                </svg>
            </div>
            <div className="flex gap-x-4 justify-center items-center">
                <div className="ml-4">
                    <img src="/logo.png"/>
                </div>
            </div>
            <ul className="pt-6">
                {menuItems.map((item, index) => (
                    <li
                        key={index}
                        className={`font-bold text-gray-300 text-md flex items-center cursor-pointer pl-6 py-3 hover:bg-light-white rounded-r-xl mt-2 ${activePage === item.href && 'bg-white text-blue-600'}`}
                    >
                        <Link href={item.href}>
                            <div className="flex items-center">
                                <img
                                    src={item.svg}
                                    alt={item.label}
                                    className="sidebar-menu-item"
                                    style={{filter: activePage === item.href ? 'invert(100%)' : 'none'}}
                                />
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
                        <img src={user?.profilePic} alt="Profile" className="w-8 h-8 rounded-full"/>
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
