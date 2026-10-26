import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Layers, ShieldCheck } from "lucide-react";
import productsData from "@/data/products.json";
import { Product } from "@/types/product";

export const metadata = {
  title: "Product Categories | Advika Valves",
  description: "Browse industrial valve categories supplied by Advika Valves, authorised dealer of Flowsid Valves. Explore stainless steel, cast iron, cast steel, forged, and polypropylene valves.",
};

export default function CategoriesPage() {
  const products: Product[] = (productsData as unknown) as Product[];

  // Group by category
  const categoryMap: Record<string, { count: number; image: string; slug: string; subcategories: Set<string> }> = {};

  products.forEach((p) => {
    const slug = p.category
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    if (!categoryMap[p.category]) {
      categoryMap[p.category] = {
        count: 0,
        image: p.image,
        slug,
        subcategories: new Set<string>(),
      };
    }
    categoryMap[p.category].count += 1;
    categoryMap[p.category].subcategories.add(p.subcategory);
  });

  const categories = Object.entries(categoryMap).map(([name, data]) => ({
    name,
    count: data.count,
    image: data.image,
    slug: data.slug,
    subcategories: Array.from(data.subcategories),
  }));

  return (
    <div className="w-full bg-slate-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb & Header */}
        <div className="mb-10 space-y-2">
          <nav className="flex items-center gap-2 text-xs text-slate-500 font-medium">
            <Link href="/" className="hover:text-blue-600">Home</Link>
            <span>/</span>
            <span className="text-navy-900 font-semibold">Categories</span>
          </nav>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-900">
            Industrial Valve Categories
          </h1>
          <p className="text-sm text-slate-600 max-w-2xl">
            Explore the complete taxonomy of Flowsid industrial valves supplied by Advika Valves. All categories reflect genuine document index sections.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <div
              key={cat.name}
              className="bg-white rounded-xl border border-slate-200 hover:border-blue-400 hover:shadow-lg transition-all p-6 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700">
                    {cat.count} Products
                  </span>
                  <span className="text-xs text-slate-400 font-mono">FLOWSID</span>
                </div>

                <div className="my-5 flex items-center justify-center h-40 bg-slate-50 rounded-lg p-3">
                  <div className="relative w-full h-full">
                    <Image
                      src={cat.image}
                      alt={cat.name}
                      fill
                      className="object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </div>

                <h2 className="text-lg font-bold text-navy-900 group-hover:text-blue-600 transition-colors mb-2">
                  {cat.name}
                </h2>

                <div className="flex flex-wrap gap-1.5 pt-2">
                  {cat.subcategories.map((sub) => (
                    <span
                      key={sub}
                      className="inline-block px-2 py-0.5 rounded text-[11px] bg-slate-100 text-slate-600 font-medium"
                    >
                      {sub}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-100">
                <Link
                  href={`/categories/${cat.slug}`}
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-xs font-bold text-navy-900 bg-slate-100 group-hover:bg-navy-900 group-hover:text-white transition-colors"
                >
                  <span>Explore {cat.count} Products</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
