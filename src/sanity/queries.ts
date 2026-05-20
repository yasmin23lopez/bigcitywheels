import { client } from "./client";

// Site Settings
export async function getSiteSettings() {
  return client.fetch(`*[_type == "siteSettings"][0]{
    businessName,
    phone,
    email,
    address,
    city,
    hours,
    social,
    googleMapsEmbed,
    whatsapp
  }`);
}

// Reviews
export async function getReviews() {
  return client.fetch(`*[_type == "review" && featured == true] | order(_createdAt desc){
    name,
    vehicle,
    rating,
    text,
    time
  }`);
}

// FAQs
export async function getFaqs() {
  return client.fetch(`*[_type == "faq"] | order(order asc){
    question,
    answer
  }`);
}

// Promos
export async function getPromos() {
  return client.fetch(`*[_type == "promo" && active == true]{
    title,
    subtitle,
    description,
    ctaText,
    ctaLink,
    location
  }`);
}

// Services
export async function getServices() {
  return client.fetch(`*[_type == "service"] | order(order asc){
    title,
    "slug": slug.current,
    description,
    content,
    features,
    "imageUrl": image.asset->url
  }`);
}

// Products by category
export async function getProductsByCategory(category: string) {
  return client.fetch(`*[_type == "product" && category == $category]{
    name,
    partNumber,
    brand,
    subcategory,
    price,
    description,
    "imageUrl": coalesce(image.asset->url, imageUrl),
    inStock
  }`, { category });
}

// All products grouped by subcategory
export async function getProductsGrouped(category: string) {
  return client.fetch(`{
    "products": *[_type == "product" && category == $category]{
      name,
      partNumber,
      brand,
      subcategory,
      price,
      "imageUrl": coalesce(image.asset->url, imageUrl),
      inStock
    }
  }`, { category });
}

// Hidden products list
export async function getHiddenProducts() {
  const result = await client.fetch(`*[_type == "hiddenProducts"][0].partNumbers`);
  return result || [];
}

// Custom products added via Sanity (to merge with JSON catalog)
export async function getCustomProducts(category: string) {
  return client.fetch(`*[_type == "product" && category == $category && inStock == true]{
    name,
    partNumber,
    brand,
    subcategory,
    price,
    description,
    "imageUrl": coalesce(image.asset->url, imageUrl),
  }`, { category });
}
