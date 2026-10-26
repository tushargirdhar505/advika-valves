export interface SizeVariant {
  inch: string;
  mm: number;
}

export interface VariantAttribute {
  name: string;
  options: string[];
}

export interface ProductMaterials {
  body?: string;
  ball?: string;
  stem?: string;
  seatSeal?: string;
  seat?: string;
  disc?: string;
  wedge?: string;
  lever?: string;
  handle?: string;
  lining?: string;
  glass?: string;
  screen?: string;
  bodyCover?: string;
  bodyBonnet?: string;
  bodyWedge?: string;
  trims?: string;
  trim?: string;
  gland?: string;
  pin?: string;
  liner?: string;
  workingParts?: string;
  [key: string]: string | undefined;
}

export interface Product {
  id: string;
  catalogItemNumber: number;
  sourcePage: number;
  sourceSection: string;
  originalName: string;
  displayName: string;
  slug: string;
  category: string;
  subcategory: string;
  manufacturerOrMake: string;
  descriptionShort: string;
  descriptionLong: string;
  image: string;
  imageSourcePage: number;
  materials: ProductMaterials;
  design: string;
  connectionTypes: string[];
  sizeVariants: SizeVariant[];
  pressureRatings: string;
  temperatureRatings: string;
  standards: string[];
  testingSpecifications: string;
  documentedApplications: string[];
  technicalSpecifications: Record<string, string | undefined>;
  variantAttributes: VariantAttribute[];
  extractionStatus: string;
  reviewNotes: string;
}

export interface BusinessContact {
  name: string;
  title: string;
  phone: string;
  phoneDisplay: string;
  whatsappUrl: string;
  telUrl: string;
}

export const BUSINESS_INFO = {
  name: "Advika Valves",
  designation: "Authorised Dealer of Flowsid Valves",
  legalOwner: "Alka Jain",
  email: "advikavalves@gmail.com",
  address: "831, Kucha Pati Ram, Sita Ram Bazaar, Chawri Bazar, Delhi – 110006, India",
  googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=831,+Kucha+Pati+Ram,+Sita+Ram+Bazaar,+Chawri+Bazar,+Delhi+–+110006,+India",
  contacts: [
    {
      name: "Dinesh Jain",
      title: "Manager",
      phone: "+919811049614",
      phoneDisplay: "+91 9811049614",
      whatsappUrl: "https://wa.me/919811049614",
      telUrl: "tel:+919811049614",
    },
    {
      name: "Sidharth Jain",
      title: "Manager",
      phone: "+918447952332",
      phoneDisplay: "+91 8447952332",
      whatsappUrl: "https://wa.me/918447952332",
      telUrl: "tel:+918447952332",
    },
  ] as BusinessContact[],
};

export function buildWhatsAppUrl(
  phone: string,
  productName: string,
  catalogItemNumber: number,
  size?: string,
  variant?: string
): string {
  const cleanPhone = phone.replace(/[^0-9]/g, "");
  let message = `Hello Advika Valves,\n\nI would like to enquire about the following product from your Flowsid catalog:\n\nProduct: ${productName}\nCatalog Item No.: ${catalogItemNumber}`;
  if (size) {
    message += `\nSize: ${size}`;
  }
  if (variant) {
    message += `\nMaterial / Variant: ${variant}`;
  }
  message += `\n\nPlease share technical availability and formal quotation details.`;
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
}
