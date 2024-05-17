import Link from 'next/link'
import React from 'react'
import Seatbar from "@/components/Seatbar";
import { Timestamp } from 'firebase-admin/firestore';

export type hargaProps = {
  tipe: string,
  nominal: number,
  currency: string,
}

export type hotelProps = {
  bintang: string,
  nama_hotel: string,
  url_hotel: string[],
}

export type paketProps = {
  durasi: number,
  harga: hargaProps[],
  harga_dp: number,
  hotel: hotelProps[],
  img: string,
  jadwal: string,
  lokasiberangkat: string,
  maskapai: string,
  paketID: string,
  remainingseat: number,
  thumbnail: string,
  title: string,
  totalseat: number,
}

export type cardProps = {
  paketID: string,
  remainingseat: number,
  thumbnail: string,
  title: string,
  totalseat: number,
  jadwal: string
}

const CardPaket : React.FC<{paket : cardProps}> = ({paket}) => {
  return (
    <div key={paket.paketID} className='flex flex-col justify-between bg-white h-96 rounded-lg shadow-md border duration-500 hover:shadow-xl'>
      <div>
        <img src={paket.thumbnail} alt='foto-paket' className='h-40 w-full object-cover rounded-t-lg' />
        <h1 className='font-semibold text-[14px] text-center my-3 mx-6 h-16'>{paket.title}</h1>
        <div className='mx-6'>
          <Seatbar totalSeats={paket.totalseat} remainingSeats={paket.remainingseat} />
        </div>
      </div>
      <div className='flexEnd gap-2 items-center m-4'>
        {/*<Link href={'/EditPaket'}>*/}
        {/*  <div className='bg-green-50 p-1 rounded-md duration-200 hover:bg-black'>*/}
        {/*    <svg width={28} height={28} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className='fill-white'><path d="m11.25 6c.398 0 .75.352.75.75 0 .414-.336.75-.75.75-1.505 0-7.75 0-7.75 0v12h17v-8.749c0-.414.336-.75.75-.75s.75.336.75.75v9.249c0 .621-.522 1-1 1h-18c-.48 0-1-.379-1-1v-13c0-.481.38-1 1-1zm1.521 9.689 9.012-9.012c.133-.133.217-.329.217-.532 0-.179-.065-.363-.218-.515l-2.423-2.415c-.143-.143-.333-.215-.522-.215s-.378.072-.523.215l-9.027 8.996c-.442 1.371-1.158 3.586-1.264 3.952-.126.433.198.834.572.834.41 0 .696-.099 4.176-1.308zm-2.258-2.392 1.17 1.171c-.704.232-1.274.418-1.729.566zm.968-1.154 7.356-7.331 1.347 1.342-7.346 7.347z"/></svg>*/}
        {/*  </div>*/}
        {/*</Link>*/}
        {/*<Link href={'/'}>*/}
        {/*  <div className='bg-red-600 p-1 rounded-md duration-200 hover:bg-black'>*/}
        {/*    <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" className='fill-white'><path d="M19 24h-14c-1.104 0-2-.896-2-2v-17h-1v-2h6v-1.5c0-.827.673-1.5 1.5-1.5h5c.825 0 1.5.671 1.5 1.5v1.5h6v2h-1v17c0 1.104-.896 2-2 2zm0-19h-14v16.5c0 .276.224.5.5.5h13c.276 0 .5-.224.5-.5v-16.5zm-9 4c0-.552-.448-1-1-1s-1 .448-1 1v9c0 .552.448 1 1 1s1-.448 1-1v-9zm6 0c0-.552-.448-1-1-1s-1 .448-1 1v9c0 .552.448 1 1 1s1-.448 1-1v-9zm-2-7h-4v1h4v-1z"/></svg>*/}
        {/*  </div>*/}
        {/*</Link>*/}
        <Link href={`/DetailPaket/${paket.paketID}`}>
          <p className='bg-[#f14310] py-1 px-4 font-medium text-white duration-200 hover:bg-black rounded-md'>Detail</p>
        </Link>
      </div>
    </div>
  )
}

export default CardPaket