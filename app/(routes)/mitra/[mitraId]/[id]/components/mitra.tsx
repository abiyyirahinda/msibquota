"use client";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import React, { useEffect, useState } from "react";

const Mitra = () => {
  const { id } = useParams();
  const [data, setData] = useState<any>({});
  const [linkLoading, setLinkLoading] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    fetchData();
  }, []); // Tambahkan array kosong sebagai dependencies untuk memastikan useEffect hanya dipanggil sekali saat komponen dimuat

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://api.kampusmerdeka.kemdikbud.go.id/magang/browse/position/${id}`
      );
      const newData = response.data.data;
      console.log(newData);
      setData(newData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const formatSalaryToRupiah = (salary: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(salary);
  };

  const back = () => {
    setLinkLoading(true);
    if (linkLoading === true) {
      router.push('/');
    } else {
      router.push('/');
    }
  }

  return (
    <div className="container py-4 ">
      <div className="flex">
        <div className="">
          <Button onClick={back}>
              <ChevronLeft className="h-4 w-4" />
            
          </Button>
        </div>
      </div>
      {linkLoading && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50 gap-4">
          <div className="h-8 w-8 bg-white rounded-full animate-bounce [animation-delay:-0.3s]"></div>
          <div className="h-8 w-8 bg-white rounded-full animate-bounce [animation-delay:-0.15s]"></div>
          <div className="h-8 w-8 bg-white rounded-full animate-bounce"></div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md p-6 mt-6">
        <h2 className="text-xl font-bold mb-2">{data.name}</h2>
        {/* <p className="text-gray-600 mb-4">{data.description}</p> */}
        <div className="flex justify-between items-center mb-4">
          <div>
            <p className="font-bold">Available:</p>
            <p>{data.available_to_apply ? "Masih bisa daftar" : "false"}</p>
          </div>
          <div>
            <p className="font-bold">Kuota?:</p>
            <p>{data.is_quota_full ? "Dah penuh" : "Belom penuh"}</p>
          </div>
          {/* <div>
            <p className="font-bold">Gaji:</p>
            {data.benefits && data.benefits.salary ? (
              <p>{formatSalaryToRupiah(data.benefits.salary)}</p>
            ) : (
              <p>Tidak menampilkan gaji</p>
            )}
          </div> */}
        </div>
        {/* {data.web_portal ? (

        <a
          href={data.web_portal}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
        >
          Lihat Detail
        </a>
        ): (
          <p>Tidak ada keterangan web portal</p>
        )} */}
          
          
      </div>
    </div>
  );
};

export default Mitra;
