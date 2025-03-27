"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Breadcrumb from "@/components/Breadcrumb";
import FilterBar from "@/components/FilterBar";
import ProductGrid from "@/components/ProductGrid";
import { useRouter } from "next/navigation";

const SearchResults = ({ params }: { params: Promise<{ query: string }> }) => {
  const router = useRouter();
  const [query, setQuery] = useState<string | null>(null);
  const [products, setProducts] = useState<Array<{ 
    id: number;
    name: string;
    sale_price: number;
    first_price?: number;
    brand: string;
    shop: string;
    image_url: string;
    link: string;
    category: string[];
  }>>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const resolvedParams = await params;
        const searchQuery = decodeURIComponent(resolvedParams.query || "");
        setQuery(searchQuery);

        const response = await fetch(`${process.env.NEXT_PUBLIC_LOCALHOST}/search?name=${encodeURIComponent(searchQuery)}`);
    
        if (!response.ok) {
          throw new Error(`HTTP Error! Status: ${response.status}`);
        }
    
        const data = await response.json();
        console.log("Fetched Products:", data); // Debugging
    
        setProducts(
          (data.results || []).map((product: {
            id: number;
            name: string;
            sale_price: number;
            first_price?: number;
            brand: string;
            shop: string;
            image_url: string;
            link: string;
            category: string[];
          }) => ({
            id: product.id,
            //name: product.name,
            name: product.name.length > 17 ? product.name.slice(0, 17) + "..." : product.name, 
            sale_price: product.sale_price,
            first_price: product.first_price,
            brand: product.brand,
            shop: product.shop,
            image_url: product.image_url,
            link: product.link,
            category: product.category,
            onClick: () => router.push(`/search/${searchQuery}/${product.id}`), 
          }))
        );
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    console.log("API URL:", process.env.NEXT_PUBLIC_LOCALHOST);

    fetchProducts();
  }, [params]); // Fix dependency

  const fetchFilteredProducts = async (filters: Record<string, string>) => {
    try {
      const queryParams = new URLSearchParams(filters);
      console.log("Sending Filter Request:", queryParams.toString()); // ✅ Log request before sending
  
      const response = await fetch(`${process.env.NEXT_PUBLIC_LOCALHOST}/products/filter?${queryParams.toString()}`);
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP Error! Status: ${response.status} - ${errorText}`);
      }
  
      const data = await response.json();
      console.log("Filtered Products:", data); // ✅ Log response for debugging
  
      setProducts(
        (data.results || []).map((product: {
          id: number;
          name: string;
          sale_price: number;
          first_price?: number;
          brand: string;
          shop: string;
          image_url: string;
          link: string;
          category: string[];
        }) => ({
          id: product.id,
          name: product.name,
          sale_price: product.sale_price,
          first_price: product.first_price,
          brand: product.brand,
          shop: product.shop,
          image_url: product.image_url,
          link: product.link,
          category: product.category,
          onClick: () => router.push(`/search/${query}/${product.id}`),
        }))
      );
    } catch (error) {
      console.error("Error fetching filtered products:", error);
    }
  };
  

  return (
    <div className="bg-black text-white min-h-screen font-inter font-normal pb-[20px]">
      <Navbar />
      <Breadcrumb breadcrumbs={[{ label: "Поиск", href: "/home" }, { label: query || "..." }]} />
      <main className="px-8">
        <h1 className="text-[35px] font-normal mb-6 ml-[340px] mt-[10px] ">{query}</h1>
        <FilterBar onApplyFilters={fetchFilteredProducts} />
        {products.length > 0 ? (
          <ProductGrid
            products={products}
          />
        ) : (
          <p className="text-gray-400 text-center mt-6">Ничего не найдено.</p>
        )}
      </main>
    </div>
  );
};

export default SearchResults;
