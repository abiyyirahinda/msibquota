import Image from "next/image";
import Navbar from "@/components/navbar";
import SearchBar from "@/components/searchbar";
import List from "@/components/list";

export default function Home() {
  return (
    <div>
    <Navbar />
    <List />
  </div>
  );
}