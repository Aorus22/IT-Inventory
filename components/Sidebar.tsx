"use client"
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import {usePathname, useRouter} from "next/navigation";
import Cookies from "js-cookie";
import {fdatasyncSync} from "node:fs";
import axios from "axios";

type User = {
    username: string,
    role: string,
}

const Sidebar = () => {
    const [open, setOpen] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState<User>({
        role: "",
        username: ""
    });

    const [activePage, setActivePage] = useState('/');
    const pathname = usePathname();
    const router = useRouter()

    useEffect(() => {
        setActivePage(pathname);
        const currentUserString = sessionStorage.getItem('sessionUser')
        if (currentUserString){
            const currentUser = JSON.parse(currentUserString) as User
            setUser(currentUser)
            setIsLoggedIn(true)
        }
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
            href: '/JenisBarang',
            label: 'Jenis Barang',
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
        router.push("/Login")
        router.refresh()
    };

    const handleLogout = async  () => {
        setIsLoggedIn(false)
        const response = await axios.post('/api/Logout', "gatawu");
        sessionStorage.removeItem('sessionUser')
        setUser({
            role: "",
            username: ""
        });
        router.refresh()
    };

    return (
        <div className={` ${open ? "w-60" : "w-20 "} bg-[#2c3f79] h-screen pr-8 pt-8 relative duration-300`}>
            <div onClick={() => setOpen(!open)}
                 className={`absolute -right-4 top-9 w-8 h-8 rounded-full bg-white border z-1 flexCenter cursor-pointer ${!open && 'rotate-180'} duration-300`}>
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
                        className={`font-bold text-gray-300 text-md flex items-center cursor-pointer pl-6 py-3 hover:bg-light-white rounded-r-xl mt-2 ${activePage === item.href && 'bg-white text-blue-700'}`}
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
                        <img src={'/placeholder_pp.jpg'} alt="Profile" className="w-8 h-8 rounded-full"/>
                        <div>
                            <p>{user.username}</p>
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
