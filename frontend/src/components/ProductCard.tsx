import { Link } from 'react-router-dom';
import type { Product } from '../types';

export default function ProductCard({ product }: { product: Product }) {
  return <article className="product-card"><Link to={`/products/${product.id}`} className="product-image"><img src={product.image} alt={`${product.name} placeholder artwork`} /></Link>
    <div className="product-copy"><p className="eyebrow">{product.category}</p><div className="product-title"><div><h3>{product.name}</h3><p className="artist">{product.artist}</p></div><strong>${product.price.toFixed(2)}</strong></div><Link className="text-link" to={`/products/${product.id}`}>View record →</Link></div>
  </article>;
}
