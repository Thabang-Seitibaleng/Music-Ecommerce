import type { Product } from '../types';
import ProductCard from './ProductCard';

export default function ProductGrid({ products }: { products: Product[] }) {
  if (!products.length) return <p className="empty-message">No products match your search. Try another term or category.</p>;
  return <div className="product-grid">{products.map(product => <ProductCard key={product.id} product={product} />)}</div>;
}
