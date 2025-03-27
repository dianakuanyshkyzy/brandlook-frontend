import Link from "next/link";
import React, { useState, useEffect } from "react";

const Navbar = () => {
  const [favoriteCount, setFavoriteCount] = useState<number>(0);

  useEffect(() => {
    const updateFavoriteCount = () => {
      const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
      setFavoriteCount(favorites.length);
    };

    updateFavoriteCount();

    window.addEventListener("storage", updateFavoriteCount);

    return () => {
      window.removeEventListener("storage", updateFavoriteCount);
    };
  }, []);

  return (
    <nav className="flex justify-between items-center w-full h-16 px-8 bg-black text-white">
      
      <div className="flex items-center text-2xl font-bold ml-[340px]">
        <Link href="/home" passHref>
          <h1 className="text-[25px] font-poppins font-extrabold leading-[52px] tracking-tight">
            <span className="font-extrabold italic">brand</span>
            <span className="text-[#6F00FF] font-extrabold italic">list</span>{" "} 
          </h1>
        </Link>
      </div>
    
      <div className="flex items-center gap-4 mr-[340px] relative">
        <Link href="/favorites" passHref>
          <div className="relative">
            <img
              src="/images/heart.png"
              alt="Favorites"
              className="w-[20px] h-[18px] cursor-pointer"
            />
            {favoriteCount > 0 && (
              <span className="absolute -top-2 -right-3 bg-customPurple text-white text-xs px-1.5 py-0.5 rounded-full">
                {favoriteCount}
              </span>
            )}
          </div>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;