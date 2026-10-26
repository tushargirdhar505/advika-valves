"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  ArrowLeft, 
  MessageSquare, 
  Mail, 
  Phone, 
  Check, 
  ShieldCheck, 
  Layers, 
  Gauge, 
  Maximize2, 
  X,
  FileCheck2,
  Droplets,
  Flame,
  Wind,
  Fuel,
  Compass
} from "lucide-react";
import { Product, BUSINESS_INFO, buildWhatsAppUrl } from "@/types/product";
import ProductCard from "@/components/ProductCard";

interface ProductDetailClientProps {
  product: Product;
  relatedProducts: Product[];
}

export default function ProductDetailClient({ product, relatedProducts }: ProductDetailClientProps) {
  // State for user variant selections
  const [selectedSize, setSelectedSize] = useState<string>(
    product.sizeVariants.length > 0 ? `${product.sizeVariants[0].inch} (${product.sizeVariants[0].mm} mm)` : ""
  );

  const [selectedVariant, setSelectedVariant] = useState<string>(
    product.variantAttributes.length > 0 && product.variantAttributes[0].options.length > 0
      ? product.variantAttributes[0].options[0]
      : ""
  );

  const [imageModalOpen, setImageModalOpen] = useState(false);

  // Dynamic WhatsApp URLs carrying selected size and variant
  const whatsappUrlDinesh = buildWhatsAppUrl(
    BUSINESS_INFO.contacts[0].phone,
    product.displayName,
    product.catalogItemNumber,
    selectedSize,
    selectedVariant
  );

  const whatsappUrlSidharth = buildWhatsAppUrl(
    BUSINESS_INFO.contacts[1].phone,
    product.displayName,
    product.catalogItemNumber,
    selectedSize,
    selectedVariant
  );

  // Email enquiry URL
  const emailSubject = encodeURIComponent(
    `Product Enquiry: ${product.displayName} (Item #${product.catalogItemNumber})`
  );
  const emailBody = encodeURIComponent(
    `Hello Advika Valves Team,\n\nI am interested in procuring the following product:\n\nProduct: ${product.displayName}\nCatalog Item No.: ${product.catalogItemNumber}\nSelected Size: ${selectedSize || "Standard"}\nSelected Material/Variant: ${selectedVariant || "Standard"}\n\nPlease share availability, lead time, and technical data sheets.\n\nThank you,\n`
  );
  const mailtoUrl = `mailto:${BUSINESS_INFO.email}?subject=${emailSubject}&body=${emailBody}`;

  // Helper for application icons
  const getAppBadge = (app: string) => {
    switch (app.toLowerCase()) {
      case "water":
        return { icon: Droplets, color: "bg-blue-50 text-blue-700 border-blue-200" };
      case "steam":
        return { icon: Flame, color: "bg-orange-50 text-orange-700 border-orange-200" };
      case "gas":
        return { icon: Wind, color: "bg-teal-50 text-teal-700 border-teal-200" };
      case "oil":
        return { icon: Fuel, color: "bg-amber-50 text-amber-700 border-amber-200" };
      case "air":
        return { icon: Compass, color: "bg-indigo-50 text-indigo-700 border-indigo-200" };
      default:
        return { icon: Check, color: "bg-slate-50 text-slate-700 border-slate-200" };
    }
  };

  return (
    <div className="w-full bg-slate-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb & Navigation */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <nav className="flex items-center gap-2 text-xs text-slate-500 font-medium">
            <Link href="/" className="hover:text-blue-600">Home</Link>
            <span>/</span>
            <Link href="/products" className="hover:text-blue-600">Products</Link>
            <span>/</span>
            <span className="text-slate-400 truncate max-w-[200px]">{product.category}</span>
            <span>/</span>
            <span className="text-navy-900 font-semibold truncate max-w-[200px]">Item #{product.catalogItemNumber}</span>
          </nav>

          <Link
            href="/products"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-navy-900 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Products</span>
          </Link>
        </div>

        {/* Product Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm mb-12">
          
          {/* Left: Product Image Box */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative w-full h-80 sm:h-96 bg-slate-50 rounded-xl border border-slate-200 p-6 flex items-center justify-center group overflow-hidden">
              {/* Item Badge */}
              <div className="absolute top-4 left-4 z-10">
                <span className="inline-flex items-center px-3 py-1 rounded-md text-xs font-extrabold bg-navy-900 text-white tracking-wider shadow">
                  ITEM #{product.catalogItemNumber}
                </span>
              </div>

              {/* Source Page Reference Badge */}
              <div className="absolute top-4 right-4 z-10">
                <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-slate-200 text-slate-700">
                  PDF Page {product.sourcePage}
                </span>
              </div>

              {/* Image with zoom trigger */}
              <div 
                className="relative w-full h-full cursor-zoom-in"
                onClick={() => setImageModalOpen(true)}
              >
                <Image
                  src={product.image}
                  alt={product.displayName}
                  fill
                  priority
                  className="object-contain group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Enlarge Hint */}
              <button
                type="button"
                onClick={() => setImageModalOpen(true)}
                className="absolute bottom-3 right-3 p-2 bg-white/90 hover:bg-white text-slate-700 rounded-lg shadow-sm border border-slate-200 text-xs flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span>Enlarge</span>
              </button>
            </div>

            {/* Documented Applications Strip */}
            <div className="w-full mt-4 p-4 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-2">
                Documented Fluid Applications
              </span>
              <div className="flex flex-wrap gap-2">
                {product.documentedApplications.map((app) => {
                  const badge = getAppBadge(app);
                  const Icon = badge.icon;
                  return (
                    <span
                      key={app}
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold border ${badge.color}`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span>{app}</span>
                    </span>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right: Technical Information & Enquiry Generator */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              
              {/* Category & Make Pill */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200">
                  {product.category}
                </span>
                <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                  Make: {product.manufacturerOrMake}
                </span>
                <span className="inline-flex items-center gap-1 text-xs text-green-700 font-semibold bg-green-50 px-2 py-0.5 rounded border border-green-200">
                  <FileCheck2 className="w-3 h-3 text-green-600" />
                  <span>Catalog Grounded</span>
                </span>
              </div>

              {/* Title */}
              <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-900 leading-snug">
                {product.displayName}
              </h1>

              {/* Original Name reference */}
              <div className="text-xs text-slate-500 font-mono bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                <span className="font-semibold text-slate-600">Original Catalog Name:</span> {product.originalName}
              </div>

              {/* Full Engineering Description */}
              <p className="text-sm text-slate-700 leading-relaxed">
                {product.descriptionLong}
              </p>

              {/* Interactive Variant Selection */}
              {product.variantAttributes.length > 0 && (
                <div className="pt-2 space-y-2">
                  <label className="text-xs font-bold text-navy-900 uppercase tracking-wide block">
                    Available Material / Option:
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.variantAttributes[0].options.map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setSelectedVariant(opt)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                          selectedVariant === opt
                            ? "bg-navy-900 text-white border-navy-900 shadow-sm"
                            : "bg-white text-slate-700 border-slate-300 hover:border-slate-400"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Interactive Size Selection */}
              {product.sizeVariants.length > 0 && (
                <div className="pt-2 space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-navy-900 uppercase tracking-wide">
                      Select Nominal Size for Enquiry:
                    </label>
                    <span className="text-[11px] text-slate-500">
                      {product.sizeVariants.length} Sizes Documented
                    </span>
                  </div>

                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
                    {product.sizeVariants.map((s) => {
                      const label = `${s.inch} (${s.mm} mm)`;
                      const isSelected = selectedSize === label;
                      return (
                        <button
                          key={`${s.inch}-${s.mm}`}
                          type="button"
                          onClick={() => setSelectedSize(label)}
                          className={`p-2 rounded-lg text-xs text-center border font-semibold transition-all ${
                            isSelected
                              ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                              : "bg-slate-50 text-slate-700 border-slate-200 hover:border-blue-400 hover:bg-white"
                          }`}
                        >
                          <div className="font-bold">{s.inch}</div>
                          <div className={`text-[10px] ${isSelected ? "text-blue-100" : "text-slate-400"}`}>
                            {s.mm} mm
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

            </div>

            {/* Direct Action Hub */}
            <div className="pt-6 border-t border-slate-200 space-y-4">
              <div className="text-xs font-bold uppercase tracking-wider text-navy-900">
                Direct Product Enquiry Actions
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Dinesh Jain WhatsApp */}
                <a
                  href={whatsappUrlDinesh}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-bold text-white bg-green-600 hover:bg-green-700 shadow-sm hover:shadow transition-all"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp Dinesh Jain</span>
                </a>

                {/* Sidharth Jain WhatsApp */}
                <a
                  href={whatsappUrlSidharth}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-bold text-white bg-green-600 hover:bg-green-700 shadow-sm hover:shadow transition-all"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp Sidharth Jain</span>
                </a>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                <a
                  href={mailtoUrl}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-blue-600 py-1"
                >
                  <Mail className="w-4 h-4 text-slate-400" />
                  <span>Send Formal Email Requirement</span>
                </a>

                <div className="text-[11px] text-slate-400">
                  Pre-fills Item #{product.catalogItemNumber} &amp; selections
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Detailed Technical Specifications Table */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm mb-12">
          <h2 className="text-lg font-bold text-navy-900 mb-6 flex items-center gap-2">
            <span className="w-2 h-5 bg-blue-600 rounded-sm"></span>
            Technical Specifications &amp; Standards
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
            <div className="flex justify-between py-2.5 border-b border-slate-100 text-xs">
              <span className="font-medium text-slate-500">Catalog Item Number:</span>
              <span className="font-bold text-navy-900">Item #{product.catalogItemNumber}</span>
            </div>

            <div className="flex justify-between py-2.5 border-b border-slate-100 text-xs">
              <span className="font-medium text-slate-500">Catalog Source Page:</span>
              <span className="font-bold text-navy-900">Page {product.sourcePage}</span>
            </div>

            <div className="flex justify-between py-2.5 border-b border-slate-100 text-xs">
              <span className="font-medium text-slate-500">Valve Design / Construction:</span>
              <span className="font-bold text-navy-900 text-right">{product.design}</span>
            </div>

            <div className="flex justify-between py-2.5 border-b border-slate-100 text-xs">
              <span className="font-medium text-slate-500">Pressure Ratings:</span>
              <span className="font-bold text-navy-900 text-right">{product.pressureRatings}</span>
            </div>

            <div className="flex justify-between py-2.5 border-b border-slate-100 text-xs">
              <span className="font-medium text-slate-500">Temperature Limits:</span>
              <span className="font-bold text-navy-900 text-right">{product.temperatureRatings}</span>
            </div>

            <div className="flex justify-between py-2.5 border-b border-slate-100 text-xs">
              <span className="font-medium text-slate-500">End Connection Types:</span>
              <span className="font-bold text-navy-900 text-right">{product.connectionTypes.join(", ")}</span>
            </div>

            <div className="flex justify-between py-2.5 border-b border-slate-100 text-xs">
              <span className="font-medium text-slate-500">Manufacturing / Testing Standards:</span>
              <span className="font-bold text-navy-900 text-right">{product.standards.join(", ") || "Industry Standard"}</span>
            </div>

            <div className="flex justify-between py-2.5 border-b border-slate-100 text-xs">
              <span className="font-medium text-slate-500">Testing Specifications:</span>
              <span className="font-bold text-navy-900 text-right">{product.testingSpecifications}</span>
            </div>

            {Object.entries(product.materials).map(([key, val]) => {
              if (!val) return null;
              const formattedKey = key
                .replace(/([A-Z])/g, " $1")
                .replace(/^./, (str) => str.toUpperCase());
              return (
                <div key={key} className="flex justify-between py-2.5 border-b border-slate-100 text-xs">
                  <span className="font-medium text-slate-500">{formattedKey} Material:</span>
                  <span className="font-bold text-navy-900 text-right">{val}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Related Products from Same Category */}
        {relatedProducts.length > 0 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-navy-900">
                Related Industrial Valves
              </h2>
              <Link href="/products" className="text-xs font-semibold text-blue-600 hover:underline">
                View All Catalog Items &rarr;
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Image Zoom Modal */}
      {imageModalOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setImageModalOpen(false)}
        >
          <div 
            className="relative bg-white rounded-2xl max-w-2xl w-full p-6 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div>
                <h3 className="text-sm font-bold text-navy-900">{product.displayName}</h3>
                <span className="text-xs text-slate-500 font-mono">Catalog Item #{product.catalogItemNumber}</span>
              </div>
              <button
                type="button"
                onClick={() => setImageModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-navy-900 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative w-full h-96 flex items-center justify-center p-4">
              <Image
                src={product.image}
                alt={product.displayName}
                fill
                className="object-contain"
              />
            </div>

            <div className="text-center text-xs text-slate-500 pt-2 border-t border-slate-100">
              High-resolution source extraction from Flowsid Catalog (Page {product.sourcePage})
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
