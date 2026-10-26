import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, ArrowRight, ShieldCheck, Download } from "lucide-react";
import productsData from "@/data/products.json";
import ProductCard from "@/components/ProductCard";
import { Product } from "@/types/product";

interface CategoryPageProps {
  params: Promise<{
    categorySlug: string;
  }>;
}

export async function generateStaticParams() {
  const products: Product[] = (productsData as unknown) as Product[];
  const slugs = Array.from(
    new Set(
      products.map((p) =>
        p.category
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "")
      )
    )
  );

  return slugs.map((categorySlug) => ({
    categorySlug,
  }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { categorySlug } = await params;
  const products: Product[] = (productsData as unknown) as Product[];
  const matched = products.filter(
    (p) =>
      p.category
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "") === categorySlug
  );

  if (matched.length === 0) {
    return {
      title: "Category Not Found | Advika Valves",
    };
  }

  const categoryName = matched[0].category;

  return {
    title: `${categoryName} | Advika Valves`,
    description: `Explore ${matched.length} documented ${categoryName} supplied by Advika Valves, Authorised Dealer of Flowsid Valves. Price-free industrial specifications.`,
  };
}

export default async function CategoryDetailPage({ params }: CategoryPageProps) {
  const { categorySlug } = await params;
  const products: Product[] = (productsData as unknown) as Product[];

  const categoryProducts = products.filter(
    (p) =>
      p.category
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "") === categorySlug
  );

  if (categoryProducts.length === 0) {
    notFound();
  }

  const categoryName = categoryProducts[0].category;

  return (
    <div className="w-full bg-slate-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb & Navigation */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <nav className="flex items-center gap-2 text-xs text-slate-500 font-medium">
            <Link href="/" className="hover:text-blue-600">Home</Link>
            <span>/</span>
            <Link href="/categories" className="hover:text-blue-600">Categories</Link>
            <span>/</span>
            <span className="text-navy-900 font-semibold">{categoryName}</span>
          </nav>

          <Link
            href="/categories"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-navy-900 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>All Categories</span>
          </Link>
        </div>

        {/* Category Header Banner */}
        <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-blue-50 text-blue-700 text-xs font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Flowsid Catalog Section</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-900">
              {categoryName}
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Showing all {categoryProducts.length} authenticated product records belonging to this category. Each item features distinct construction, materials, and documented sizes.
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-3">
            <Link
              href="/download-catalog"
              className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-slate-700 bg-slate-50 border border-slate-300 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-blue-600" />
              <span>Download PDF</span>
            </Link>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categoryProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>

      </div>
    </div>
  );
}
