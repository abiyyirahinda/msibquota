'use client'
import axios from 'axios';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const Mitra = () => {
  const { id } = useParams();
  const [data, setData] = useState<any>({});

  useEffect(() => {
    fetchData();
  }, []); // Tambahkan array kosong sebagai dependencies untuk memastikan useEffect hanya dipanggil sekali saat komponen dimuat

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://api.kampusmerdeka.kemdikbud.go.id/magang/browse/opportunities/${id}`
      );
      const newData = response.data.data;
      console.log(newData)
      setData(newData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  const formatSalaryToRupiah = (salary: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(salary);
  };

  return (  
    <div className="container mx-auto px-4 py-6">
    <h1 className="text-3xl font-bold mb-4">Detail Pekerjaan</h1>
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold mb-2">{data.name}</h2>
      {/* <p className="text-gray-600 mb-4">{data.description}</p> */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <p className="font-bold">Kuota:</p>
          <p>{data.quota}</p>
        </div>
        <div>
          <p className="font-bold">Gaji:</p>
          {data.benefits && (
              <p>{formatSalaryToRupiah(data.benefits.salary)}</p>
            )}
        </div>
      </div>
      <a 
        href={data.web_portal} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
      >
        Lihat Detail
      </a>
    </div>
  </div>
  )
}

export default Mitra;
