import React from 'react'

interface MenuItem {
  href: string;
  label: string;
  svg: JSX.Element;
}

const menuItems = [
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

const MenuBox: React.FC<MenuItem> = ({ href, label, svg }) => {
  return (
      <a href={href} className="menu-box flex flex-col items-center justify-center p-4 border rounded shadow-md hover:bg-gray-100 transition">
          {svg}
          <span className="mt-2 text-center">{label}</span>
      </a>
  );
};

// Halaman utama
const Page: React.FC = () => {
  return (
      <>
          <section className='max-container p-4'>
              <h1 className='text-5xl font-bold text-[#292929]'>Home</h1>
              <div className="menu-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
                  {menuItems.map((item, index) => (
                      <MenuBox key={index} {...item} />
                  ))}
              </div>
          </section>
      </>
  );
};

export default Page;