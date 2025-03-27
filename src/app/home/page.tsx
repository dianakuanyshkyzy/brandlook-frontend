"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import { useEffect } from "react";


const SearchSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const [icon, setIcon] = useState("/images/arrow.png");
  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push(`/search/${encodeURIComponent(searchQuery)}`);
    }
    
  };

  const handleQueryClick = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <div
      className="absolute z-10 bg-darkgrayColor bg-opacity-95 text-white text-center rounded-[30px] w-[760px] h-[680px] mx-auto left-1/2 transform -translate-x-1/2 overflow-hidden"
      style={{ top: "20px" }} 
    >
      <div className="p-10 mt-[130px]">
        <h1 className="text-[32px] font-poppins font-normal leading-[42px] tracking-tight">
          <span className="font-extrabold italic">brand</span>
          <span className="text-[#6F00FF] font-extrabold italic">list</span>{" "}
          <span className="font-inter">— это</span>{" "}
          <span className="text-[#6F00FF] font-inter">поисковик</span>
          <br />
          <span className="font-inter">любимых брендов в</span>{" "}
          <br/>
          <span className="font-inter">магазинах Казахстана</span>{" "}
        </h1>

        <div className="mt-[50px] flex justify-center items-center relative w-full max-w-[550px] mx-auto">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Напишите свой запрос"
            className="w-full px-[25px] py-[10px] text-lg rounded-full bg-inputColor text-white focus:outline-none placeholder-borderColor"
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <button
            className="absolute right-4 w-[30px] h-[30px] bg-purple-600 text-white rounded-full flex items-center justify-center"
            onClick={handleSearch}
            onMouseEnter={() => setIcon("/images/whitearrow.png")} 
            onMouseLeave={() => setIcon("/images/arrow.png")} 
          >
            <img src={icon} alt="Search" className="w-[15px] h-[15px]" />
          </button>
        </div>

        {/* Popular Queries */}
        <div className="mt-8 text-gray-300 max-w-[550px] mx-auto">
          <p className="text-[16px] text-borderColor">Самые популярные запросы:</p>
          <div className="mt-4 flex flex-wrap justify-center gap-4">
            {[
              "Adidas Samba",
              "Спортивные брюки",
              "Кроссовки",
              "Calvin Klein Jeans",
              "Худи",
            ].map((query, index) => (
              <span
                key={index}
                onClick={() => handleQueryClick(query)}
                className="border-2 border-borderColor px-[28px] py-[5px] rounded-full text-borderColor text-[16px] cursor-pointer hover:bg-purple-600"
              >
                {query}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const Home = () => {
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);
  return (
    <>
      <Navbar />
      <div className="relative w-full h-screen overflow-hidden bg-black">
        <div
          className="absolute left-0 flex items-center space-x-[20px] animate-gallery w-[calc(450px*6*2)]"
          style={{ top: "100px" }} 
        >
          {[...Array(3)].map((_, repeatIndex) =>
            [1, 2, 3, 4, 5, 6].map((num) => (
              <img
                key={`${repeatIndex}-${num}`}
                src={`/images/image${num}.png`}
                alt={`Image ${num}`}
                className={`w-[250px] h-[340px] rounded-[30px] object-cover ${
                  num % 2 === 0 ? "mt-40" : "mt-20"
                }`}
              />
            ))
          )}
        </div>
        <SearchSection />
      </div>
    </>
  );
};

export default Home;
