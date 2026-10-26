import React from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import productsData from "@/data/products.json";
import ProductDetailClient from "./ProductDetailClient";
import { Product } from "@/types/product";

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generate Static Params for all 78 products
export async function generateStaticParams() {
  const products: Product[] = (productsData as unknown) as Product[];
  return products.map((p) => ({
    slug: p.slug,
  }));
}

// Dynamic SEO Metadata per Product
export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const products: Product[] = (productsData as unknown) as Product[];
  const product = products.find((p) => p.slug === slug);

  if (!product) {
    return {
      title: "Product Not Found | Advika Valves",
    };
  }

  return {
    title: `${product.displayName} (Item #${product.catalogItemNumber})`,
    description: product.descriptionShort,
    openGraph: {
      title: `${product.displayName} | Advika Valves`,
      description: product.descriptionShort,
      images: [
        {
          url: product.image,
          alt: product.displayName,
        },
      ],
    },
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const products: Product[] = (productsData as unknown) as Product[];
  const product = products.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  // Find related products in the same category
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  // Fallback related products if less than 3 in same category
  if (relatedProducts.length < 3) {
    const extra = products
      .filter((p) => p.id !== product.id && !relatedProducts.some((r) => r.id === p.id))
      .slice(0, 3 - relatedProducts.length);
    relatedProducts.push(...extra);
  }

  return <ProductDetailClient product={product} relatedProducts={relatedProducts} />;
}
