"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { MessageSquare, ArrowRight, Layers, Gauge, ShieldCheck } from "lucide-react";
import { Product, BUSINESS_INFO, buildWhatsAppUrl } from "@/types/product";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const whatsappUrl = buildWhatsAppUrl(
    BUSINESS_INFO.contacts[0].phone,
    product.displayName,
    product.catalogItemNumber
  );

  return (
    <div className="group flex flex-col bg-white rounded-xl border border-slate-200 hover:border-blue-400 hover:shadow-lg transition-all duration-300 overflow-hidden">
      {/* Top Image Container */}
      <div className="relative w-full h-52 bg-slate-50 flex items-center justify-center p-4 border-b border-slate-100 overflow-hidden">
        {/* Item Number Badge */}
        <div className="absolute top-3 left-3 z-10">
          <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-bold bg-navy-900 text-white tracking-wider shadow-sm">
            ITEM #{product.catalogItemNumber}
          </span>
        </div>

        {/* Make Tag */}
        <div className="absolute top-3 right-3 z-10">
          <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-semibold bg-blue-50 text-blue-700 border border-blue-200">
            {product.manufacturerOrMake}
          </span>
        </div>

        {/* Product Image */}
        <div className="relative w-full h-full transform group-hover:scale-105 transition-transform duration-300">
          <Image
            src={product.image}
            alt={product.displayName}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-contain"
            loading="lazy"
          />
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          {/* Category */}
          <div className="text-xs font-semibold text-blue-600 uppercase tracking-wide">
            {product.category}
          </div>

          {/* Product Title */}
          <Link href={`/products/${product.slug}`} className="block">
            <h3 className="text-base font-bold text-navy-900 group-hover:text-blue-600 transition-colors line-clamp-2">
              {product.displayName}
            </h3>
          </Link>

          {/* Short Factual Description */}
          <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
            {product.descriptionShort}
          </p>

          {/* Technical Badges */}
          <div className="pt-2 grid grid-cols-1 gap-1.5 text-xs text-slate-700">
            <div className="flex items-center gap-1.5 text-[11px]">
              <Layers className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span className="font-medium text-slate-500">Design:</span>
              <span className="truncate font-semibold text-slate-800">{product.design}</span>
            </div>

            <div className="flex items-center gap-1.5 text-[11px]">
              <Gauge className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span className="font-medium text-slate-500">Rating:</span>
              <span className="truncate font-semibold text-slate-800">{product.pressureRatings}</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
          <Link
            href={`/products/${product.slug}`}
            className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-semibold text-navy-900 bg-slate-100 hover:bg-navy-900 hover:text-white rounded-lg transition-colors"
          >
            <span>View Details</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center p-2 text-green-700 bg-green-50 hover:bg-green-600 hover:text-white border border-green-200 rounded-lg transition-colors"
            title="Enquire on WhatsApp"
            aria-label={`Enquire about ${product.displayName} on WhatsApp`}
          >
            <MessageSquare className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
