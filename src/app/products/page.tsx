"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  Search, 
  X, 
  Filter, 
  ArrowUpDown, 
  Layers, 
  Gauge, 
  ChevronLeft, 
  ChevronRight,
  RotateCcw,
  SlidersHorizontal,
  Check
} from "lucide-react";
import productsData from "@/data/products.json";
import ProductCard from "@/components/ProductCard";
import { Product } from "@/types/product";

export default function ProductsPage() {
  const allProducts: Product[] = (productsData as unknown) as Product[];

  // Search & Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedMaterial, setSelectedMaterial] = useState("all");
  const [selectedDesign, setSelectedDesign] = useState("all");
  const [selectedConnection, setSelectedConnection] = useState("all");
  const [selectedMake, setSelectedMake] = useState("all");
  const [sortBy, setSortBy] = useState("item-asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const pageSize = 12;

  // Extract unique filter options dynamically from data
  const categories = useMemo(() => {
    return Array.from(new Set(allProducts.map((p) => p.category))).sort();
  }, [allProducts]);

  const materialsList = useMemo(() => {
    const set = new Set<string>();
    allProducts.forEach((p) => {
      const b = p.materials.body || "";
      if (b.includes("304") || b.includes("CF8")) set.add("SS 304 / CF8");
      if (b.includes("316") || b.includes("CF8M")) set.add("SS 316 / CF8M");
      if (b.includes("Cast Iron") || b.includes("C.I.")) set.add("Cast Iron");
      if (b.includes("Cast Steel") || b.includes("WCB")) set.add("Cast Steel (WCB)");
      if (b.includes("Forged") || b.includes("A 105") || b.includes("410")) set.add("Forged Steel (A105 / 410)");
      if (b.includes("Polypropylene")) set.add("Polypropylene (PP)");
      if (b.includes("Brass")) set.add("Forged Brass");
      if (b.includes("Gun Metal")) set.add("Gun Metal (G.M.)");
      if (b.includes("Mild Steel") || b.includes("M.S.")) set.add("Mild Steel (M.S.)");
    });
    return Array.from(set).sort();
  }, [allProducts]);

  const designTypes = useMemo(() => {
    const set = new Set<string>();
    allProducts.forEach((p) => {
      if (p.category.includes("Ball")) set.add("Ball Valve");
      if (p.category.includes("Butterfly")) set.add("Butterfly Valve");
      if (p.category.includes("Check") || p.subcategory.includes("Check")) set.add("Check / NRV Valve");
      if (p.subcategory.includes("Gate")) set.add("Gate Valve");
      if (p.subcategory.includes("Globe")) set.add("Globe Valve");
      if (p.subcategory.includes("Diaphragm")) set.add("Diaphragm Valve");
      if (p.category.includes("Steam Traps") || p.subcategory.includes("Trap")) set.add("Steam Trap");
      if (p.subcategory.includes("Strainer") || p.category.includes("Strainer")) set.add("Strainer");
      if (p.subcategory.includes("Sight Glass") || p.category.includes("Sight")) set.add("Sight Glass");
      if (p.subcategory.includes("Needle")) set.add("Needle Valve");
      if (p.subcategory.includes("Float")) set.add("Float Valve");
    });
    return Array.from(set).sort();
  }, [allProducts]);

  const connectionTypes = useMemo(() => {
    const set = new Set<string>();
    allProducts.forEach((p) => {
      p.connectionTypes.forEach((c) => {
        if (c.toLowerCase().includes("screwed") || c.toLowerCase().includes("bsp") || c.toLowerCase().includes("threaded")) set.add("Screwed / Threaded");
        if (c.toLowerCase().includes("flange") || c.toLowerCase().includes("flanged") || c.toLowerCase().includes("150#") || c.toLowerCase().includes("300#") || c.toLowerCase().includes("table")) set.add("Flanged End");
        if (c.toLowerCase().includes("wafer")) set.add("Wafer Type");
        if (c.toLowerCase().includes("tri-clamp") || c.toLowerCase().includes("tc")) set.add("Tri-Clamp (TC)");
        if (c.toLowerCase().includes("socketweld")) set.add("Socketweld End");
        if (c.toLowerCase().includes("weld")) set.add("Butt-Weld End");
      });
    });
    return Array.from(set).sort();
  }, [allProducts]);

  const manufacturers = useMemo(() => {
    const set = new Set<string>();
    allProducts.forEach((p) => {
      set.add(p.manufacturerOrMake);
    });
    return Array.from(set).sort();
  }, [allProducts]);

  // Real Multi-attribute Filtering & Full Search Engine
  const filteredProducts = useMemo(() => {
    return allProducts.filter((product) => {
      // 1. Search Query Match
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const itemNumberMatch = product.catalogItemNumber.toString() === query ||
          `item ${product.catalogItemNumber}` === query ||
          `item #${product.catalogItemNumber}` === query ||
          `#${product.catalogItemNumber}` === query;

        const nameMatch = product.displayName.toLowerCase().includes(query) ||
          product.originalName.toLowerCase().includes(query) ||
          product.slug.toLowerCase().includes(query) ||
          product.id.toLowerCase().includes(query);

        const categoryMatch = product.category.toLowerCase().includes(query) ||
          product.subcategory.toLowerCase().includes(query);

        const makeMatch = product.manufacturerOrMake.toLowerCase().includes(query);

        const materialsMatch = JSON.stringify(product.materials).toLowerCase().includes(query);

        const specsMatch = JSON.stringify(product.technicalSpecifications).toLowerCase().includes(query) ||
          product.design.toLowerCase().includes(query) ||
          product.pressureRatings.toLowerCase().includes(query);

        const sizesMatch = product.sizeVariants.some(
          (s) => s.inch.toLowerCase().includes(query) || s.mm.toString() === query || `${s.mm}mm`.includes(query)
        );

        if (!itemNumberMatch && !nameMatch && !categoryMatch && !makeMatch && !materialsMatch && !specsMatch && !sizesMatch) {
          return false;
        }
      }

      // 2. Category Filter
      if (selectedCategory !== "all" && product.category !== selectedCategory) {
        return false;
      }

      // 3. Material Filter
      if (selectedMaterial !== "all") {
        const body = (product.materials.body || "").toLowerCase();
        if (selectedMaterial === "SS 304 / CF8" && !body.includes("304") && !body.includes("cf8")) return false;
        if (selectedMaterial === "SS 316 / CF8M" && !body.includes("316") && !body.includes("cf8m")) return false;
        if (selectedMaterial === "Cast Iron" && !body.includes("cast iron") && !body.includes("c.i.")) return false;
        if (selectedMaterial === "Cast Steel (WCB)" && !body.includes("cast steel") && !body.includes("wcb")) return false;
        if (selectedMaterial === "Forged Steel (A105 / 410)" && !body.includes("forged") && !body.includes("a 105") && !body.includes("410")) return false;
        if (selectedMaterial === "Polypropylene (PP)" && !body.includes("polypropylene")) return false;
        if (selectedMaterial === "Forged Brass" && !body.includes("brass")) return false;
        if (selectedMaterial === "Gun Metal (G.M.)" && !body.includes("gun metal")) return false;
        if (selectedMaterial === "Mild Steel (M.S.)" && !body.includes("mild steel") && !body.includes("m.s.")) return false;
      }

      // 4. Design / Type Filter
      if (selectedDesign !== "all") {
        if (selectedDesign === "Ball Valve" && !product.category.includes("Ball")) return false;
        if (selectedDesign === "Butterfly Valve" && !product.category.includes("Butterfly")) return false;
        if (selectedDesign === "Check / NRV Valve" && !product.category.includes("Check") && !product.subcategory.includes("Check")) return false;
        if (selectedDesign === "Gate Valve" && !product.subcategory.includes("Gate")) return false;
        if (selectedDesign === "Globe Valve" && !product.subcategory.includes("Globe")) return false;
        if (selectedDesign === "Diaphragm Valve" && !product.subcategory.includes("Diaphragm")) return false;
        if (selectedDesign === "Steam Trap" && !product.category.includes("Steam Traps") && !product.subcategory.includes("Trap")) return false;
        if (selectedDesign === "Strainer" && !product.subcategory.includes("Strainer") && !product.category.includes("Strainer")) return false;
        if (selectedDesign === "Sight Glass" && !product.subcategory.includes("Sight Glass") && !product.category.includes("Sight")) return false;
        if (selectedDesign === "Needle Valve" && !product.subcategory.includes("Needle")) return false;
        if (selectedDesign === "Float Valve" && !product.subcategory.includes("Float")) return false;
      }

      // 5. Connection Filter
      if (selectedConnection !== "all") {
        const conns = product.connectionTypes.join(" ").toLowerCase();
        if (selectedConnection === "Screwed / Threaded" && !conns.includes("screwed") && !conns.includes("bsp") && !conns.includes("threaded")) return false;
        if (selectedConnection === "Flanged End" && !conns.includes("flange") && !conns.includes("flanged") && !conns.includes("150#") && !conns.includes("300#") && !conns.includes("table")) return false;
        if (selectedConnection === "Wafer Type" && !conns.includes("wafer")) return false;
        if (selectedConnection === "Tri-Clamp (TC)" && !conns.includes("tri-clamp") && !conns.includes("tc")) return false;
        if (selectedConnection === "Socketweld End" && !conns.includes("socketweld")) return false;
        if (selectedConnection === "Butt-Weld End" && !conns.includes("weld")) return false;
      }

      // 6. Make Filter
      if (selectedMake !== "all" && product.manufacturerOrMake !== selectedMake) {
        return false;
      }

      return true;
    });
  }, [allProducts, searchQuery, selectedCategory, selectedMaterial, selectedDesign, selectedConnection, selectedMake]);

  // Sorting
  const sortedProducts = useMemo(() => {
    return [...filteredProducts].sort((a, b) => {
      if (sortBy === "item-asc") return a.catalogItemNumber - b.catalogItemNumber;
      if (sortBy === "item-desc") return b.catalogItemNumber - a.catalogItemNumber;
      if (sortBy === "name-asc") return a.displayName.localeCompare(b.displayName);
      if (sortBy === "name-desc") return b.displayName.localeCompare(a.displayName);
      if (sortBy === "category") return a.category.localeCompare(b.category);
      return 0;
    });
  }, [filteredProducts, sortBy]);

  // Pagination Calculations
  const totalPages = Math.ceil(sortedProducts.length / pageSize) || 1;
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return sortedProducts.slice(start, start + pageSize);
  }, [sortedProducts, currentPage]);

  // Reset Filters
  const resetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setSelectedMaterial("all");
    setSelectedDesign("all");
    setSelectedConnection("all");
    setSelectedMake("all");
    setSortBy("item-asc");
    setCurrentPage(1);
  };

  const hasActiveFilters = 
    searchQuery !== "" ||
    selectedCategory !== "all" ||
    selectedMaterial !== "all" ||
    selectedDesign !== "all" ||
    selectedConnection !== "all" ||
    selectedMake !== "all" ||
    sortBy !== "item-asc";

  return (
    <div className="w-full bg-slate-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Breadcrumb & Title */}
        <div className="mb-8 space-y-2">
          <nav className="flex items-center gap-2 text-xs text-slate-500 font-medium">
            <Link href="/" className="hover:text-blue-600">Home</Link>
            <span>/</span>
            <span className="text-navy-900 font-semibold">Product Catalog</span>
          </nav>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-900">
                Complete Industrial Valve Catalog
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Explore all 78 documented catalog items. Search by specification, size, material, or catalog item number.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Link
                href="/download-catalog"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 shadow-sm transition-colors"
              >
                <span>Download PDF Catalog</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Search Bar & Mobile Filter Trigger */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm mb-6 flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search by product name, item number (e.g. 1, 42), material, size, standard..."
              className="w-full pl-10 pr-10 py-2.5 bg-slate-50 text-xs sm:text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white text-navy-900 placeholder:text-slate-400 transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600"
                aria-label="Clear search query"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-start">
            <button
              type="button"
              onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
              className="lg:hidden inline-flex items-center gap-2 py-2.5 px-4 text-xs font-semibold text-slate-700 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filters ({hasActiveFilters ? "Active" : "All"})</span>
            </button>

            {/* Sorting Dropdown */}
            <div className="flex items-center gap-1.5 text-xs text-slate-600 shrink-0">
              <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
              <select
                value={sortBy}
                onChange={(e) => {
                  setSortBy(e.target.value);
                  setCurrentPage(1);
                }}
                className="bg-slate-50 border border-slate-200 rounded-lg py-2 px-3 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                <option value="item-asc">Item No. (1 &rarr; 78)</option>
                <option value="item-desc">Item No. (78 &rarr; 1)</option>
                <option value="name-asc">Name (A &rarr; Z)</option>
                <option value="name-desc">Name (Z &rarr; A)</option>
                <option value="category">Category</option>
              </select>
            </div>
          </div>
        </div>

        {/* Main Grid: Filters Sidebar + Products Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Desktop Filters Sidebar */}
          <aside className={`lg:block ${mobileFiltersOpen ? "block" : "hidden"} space-y-6`}>
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-5">
              
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <span className="text-xs font-bold text-navy-900 uppercase tracking-wider flex items-center gap-1.5">
                  <Filter className="w-3.5 h-3.5 text-blue-600" />
                  <span>Filter Products</span>
                </span>

                {hasActiveFilters && (
                  <button
                    type="button"
                    onClick={resetFilters}
                    className="text-[11px] font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Reset</span>
                  </button>
                )}
              </div>

              {/* Category Filter */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-700 block">
                  Category
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => {
                    setSelectedCategory(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  <option value="all">All Categories ({allProducts.length})</option>
                  {categories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              {/* Material Filter */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-700 block">
                  Material Option
                </label>
                <select
                  value={selectedMaterial}
                  onChange={(e) => {
                    setSelectedMaterial(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  <option value="all">All Materials</option>
                  {materialsList.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
              </div>

              {/* Valve Design Filter */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-700 block">
                  Valve Type / Design
                </label>
                <select
                  value={selectedDesign}
                  onChange={(e) => {
                    setSelectedDesign(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  <option value="all">All Valve Designs</option>
                  {designTypes.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>

              {/* End Connection Filter */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-700 block">
                  End Connection
                </label>
                <select
                  value={selectedConnection}
                  onChange={(e) => {
                    setSelectedConnection(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  <option value="all">All End Connections</option>
                  {connectionTypes.map((conn) => (
                    <option key={conn} value={conn}>
                      {conn}
                    </option>
                  ))}
                </select>
              </div>

              {/* Manufacturer / Make Filter */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-700 block">
                  Manufacturer / Make
                </label>
                <select
                  value={selectedMake}
                  onChange={(e) => {
                    setSelectedMake(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  <option value="all">All Makes / Brands</option>
                  {manufacturers.map((make) => (
                    <option key={make} value={make}>
                      {make}
                    </option>
                  ))}
                </select>
              </div>

              {/* Reset Action */}
              {hasActiveFilters && (
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={resetFilters}
                    className="w-full py-2 px-3 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center justify-center gap-1.5"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Clear All Filters</span>
                  </button>
                </div>
              )}
            </div>

            {/* Quick Catalog Stats Box */}
            <div className="bg-navy-900 text-slate-300 p-4 rounded-xl border border-navy-800 text-xs space-y-2">
              <div className="font-semibold text-white flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-green-400"></span>
                <span>Audit Verified Range</span>
              </div>
              <p className="text-[11px] leading-relaxed text-slate-400">
                Advika Valves catalog contains 78 distinct items strictly extracted from the Flowsid publication. All items are verified price-free.
              </p>
            </div>
          </aside>

          {/* Products Results Grid */}
          <div className="lg:col-span-3 space-y-6">
            
            {/* Results Status Bar */}
            <div className="flex items-center justify-between text-xs text-slate-600 bg-white px-4 py-3 rounded-lg border border-slate-200">
              <div>
                Showing <strong className="text-navy-900">{sortedProducts.length === 0 ? 0 : (currentPage - 1) * pageSize + 1}</strong> – <strong className="text-navy-900">{Math.min(currentPage * pageSize, sortedProducts.length)}</strong> of <strong className="text-navy-900">{sortedProducts.length}</strong> catalog items
              </div>
              {hasActiveFilters && (
                <span className="text-[11px] text-blue-600 font-medium">
                  Filters Active
                </span>
              )}
            </div>

            {/* Empty State */}
            {sortedProducts.length === 0 ? (
              <div className="bg-white rounded-xl border border-slate-200 p-12 text-center space-y-4">
                <div className="w-12 h-12 mx-auto rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                  <Search className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-navy-900">
                  No products matched your criteria
                </h3>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  We could not find any catalog item matching your active filters or search terms. Try clearing filters or searching for general terms like &quot;Ball Valve&quot;, &quot;Butterfly&quot;, or item numbers like &quot;Item 1&quot;.
                </p>
                <button
                  type="button"
                  onClick={resetFilters}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset All Filters</span>
                </button>
              </div>
            ) : (
              /* Product Grid */
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {paginatedProducts.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            )}

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="bg-white p-4 rounded-xl border border-slate-200 flex items-center justify-between">
                <button
                  type="button"
                  disabled={currentPage === 1}
                  onClick={() => {
                    setCurrentPage((prev) => Math.max(prev - 1, 1));
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-50 border border-slate-200 rounded-md hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>

                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
                    <button
                      key={pageNumber}
                      type="button"
                      onClick={() => {
                        setCurrentPage(pageNumber);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                      className={`w-8 h-8 rounded-md text-xs font-semibold transition-colors ${
                        currentPage === pageNumber
                          ? "bg-navy-900 text-white shadow-sm"
                          : "text-slate-700 hover:bg-slate-100"
                      }`}
                    >
                      {pageNumber}
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  disabled={currentPage === totalPages}
                  onClick={() => {
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-50 border border-slate-200 rounded-md hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  <span>Next</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}
