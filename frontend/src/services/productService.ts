// The API provides live business data; this local file provides record-cover artwork for the UI.
import { products as artwork } from "../data/products";
import type { Product } from "../types";
import { request } from "./api";

type ApiProduct = {
  id: number;
  title: string;
  artist?: string | null;
  description?: string | null;
  category?: string | null;
  price: number | string;
  stockQuantity: number;
};

type ProductsResponse = { products: ApiProduct[] };

// Maps backend field names to the Product shape already used by the React components.
export async function getProducts(): Promise<Product[]> {
  const response = await request<ProductsResponse>("/products?limit=100");
  return response.products.map((product, index) => {
    // The backend does not store frontend SVG paths, so match each record with its local cover art.
    const visual =
      artwork.find((item) => item.name === product.title) ||
      artwork[index % artwork.length];
    return {
      id: product.id,
      name: product.title,
      artist: product.artist || visual.artist,
      description: product.description || visual.description,
      category: product.category || visual.category,
      image: visual.image,
      price: Number(product.price),
      stock: product.stockQuantity,
    };
  });
}
