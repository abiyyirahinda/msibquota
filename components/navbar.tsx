"use client"
import React from "react";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();
  const logoClick = () => {
    router.push("/")
  };
  const onCLick = () => {
    router.push("/login")
  }
  return (
    <div className="border-b">
      <div className="flex h-16 justify-center ">
        <p
          onClick={logoClick}
          className="shrink-0 flex items-center gap-x-2 font-bold text-xl  cursor-pointer"
        >
          KSWT x MSIB
        </p>
        {/* <Button onClick={onCLick}>
            Login
        </Button> */}
      </div>
      
    </div>
  );
};

export default Navbar;
