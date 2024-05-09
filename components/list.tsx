"use client";
import React, { useState, useEffect } from "react";
import { Input } from "./ui/input";
import axios from "axios";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

const List = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [opportunities, setOpportunities] = useState<any[]>([]);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    setLoading(true);
    setOpportunities([]);
    setPage(1);
    fetchData(1);
  }, [searchQuery]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, hasMore, page]);

  const fetchData = async (pageNumber: number) => {
    try {
      const response = await axios.get(
        `https://api.kampusmerdeka.kemdikbud.go.id/magang/browse/opportunities?opportunity_type=&keyword=${searchQuery}&activity_type=&offset=${
          (pageNumber - 1) * 20
        }&limit=20`
      );
      const newData = response.data.data;

      if (newData.length === 0) {
        setHasMore(false);
      }

      setOpportunities((prevData) => [...prevData, ...newData]);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching opportunities:", error);
    }
  };

  const handleSearchSubmit = () => {
    fetchData(1);
  };
  const handleLinkClick = (mitraId: string, id: string) => {
    console.log(
      `Tautan untuk mitra dengan Mitra ID ${mitraId} dengan id ${id} telah diklik`
    );

    router.push(`/mitra/${mitraId}/${id}`);
  };

  const handleScroll = () => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;

    if (scrollTop + clientHeight >= scrollHeight - 20 && !loading && hasMore) {
      fetchData(page + 1);
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);
  };

  return (
    <div className="container space-y-5 py-5">
      <div className="flex gap-4">
        <Input
          placeholder="Mau Posisi APA NIH OSSSS????"
          value={searchQuery}
          onChange={handleSearchChange}
          className="w-full md:w-1/2 px-2"
        />
        <Button
          className="text-white font-bold rounded-xmd"
          onClick={handleSearchSubmit}
        >
          Search
        </Button>
      </div>
      <ul className="space-y-5">
        {opportunities.map((opportunity, index) => (
          <li
            key={index}
            className="border rounded-xl p-4 shadow-md flex flex-col cursor-pointer"
            onClick={() =>
              handleLinkClick(opportunity.mitra_id, opportunity.id)
            }
          >
            <div className="flex">
              <div className="w-[50px]">
                <img src={opportunity.logo} alt="Logo" className="w-10" />
              </div>
              <div className="px-2 w-full">
                <p className="font-semibold">{opportunity.name}</p>
                <p className="text-sm">{opportunity.mitra_name}</p>
                <p className="text-sm">{opportunity.location} <span>({opportunity.activity_type})</span></p>
                <p className="text-sm text-slate-500">{opportunity.months_duration} Bulan</p>
              </div>
            </div>
            {/* <div className="flex justify-center mb-2">
              <img src={opportunity.logo} alt="Logo" className="w-20" />
            </div>
            <div>
              <p className="font-bold">{opportunity.name}</p>
              <p>{opportunity.mitra_name}</p>
              <p>Tipe Magang: {opportunity.opportunity_type}</p>
              <p>Tipe Aktivitas: {opportunity.activity_type}</p>
              <p>Lokasi: {opportunity.location}</p>
              <p>Durasi (bulan): {opportunity.months_duration}</p>
            </div> */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default List;
