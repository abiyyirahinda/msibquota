"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

import { useRouter } from "next/navigation";

import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";

const List = () => {
  const [searchQuery, setSearchQuery] = useState<string>(
    localStorage.getItem("searchQuery") || ""
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [opportunities, setOpportunities] = useState<any[]>([]);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [linkLoading, setLinkLoading] = useState<boolean>(false);
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
    setLinkLoading(true);
    if (linkLoading === true) {
      router.push(`/mitra/${mitraId}/${id}`);
    } else {
      router.push(`/mitra/${mitraId}/${id}`);
    }
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
    localStorage.setItem("searchQuery", query);
  };

  return (
    <div className="container py-5">
      <div className="">
        <Input
          placeholder="Mau Posisi APA NIH OSSSS????"
          value={searchQuery}
          onChange={handleSearchChange}
          className="w-full"  
        />
      </div>
      {loading && (
        <ul className="space-y-5 mt-4">
          {[...Array(10)].map((_, index) => (
            <li
              key={index}
              className="border rounded-xl p-4 shadow-md flex flex-col cursor-pointer"
            >
              <div className="flex">
                <div className="w-[50px]">
                  <Skeleton className="h-[42px] w-[42px] rounded-full" />
                </div>
                <div className="px-2 w-full space-y-3">
                  <Skeleton className="h-[20px] w-[100%] rounded-full" />
                  <Skeleton className="h-[20px] w-[100%] rounded-full" />
                  <Skeleton className="h-[20px] w-[70%] rounded-full" />
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      {linkLoading && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50 gap-4">
          <div className="h-8 w-8 bg-white rounded-full animate-bounce [animation-delay:-0.3s]"></div>
          <div className="h-8 w-8 bg-white rounded-full animate-bounce [animation-delay:-0.15s]"></div>
          <div className="h-8 w-8 bg-white rounded-full animate-bounce"></div>
        </div>
      )}

      <ul className="space-y-5 mt-4 grid grid-cols-1 sm:grid-cols-2 sm:gap-4">
        {opportunities.map((opportunity, index) => (
          <li
            key={index}
            className="border rounded-xl p-4 shadow-md flex flex-col cursor-pointer "
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
                <p className="text-sm">
                  {opportunity.location}{" "}
                  <span>({opportunity.activity_type})</span>
                </p>
                <p className="text-sm text-slate-500">
                  {opportunity.months_duration} Bulan
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default List;
