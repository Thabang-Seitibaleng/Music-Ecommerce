import { Link, useParams } from 'react-router-dom';
import type { Product } from '../types';
import { useState } from 'react';

export default function ProductDetailsPage({ products, onAdd }: { products: Product[]; onAdd: (product: Product, quantity: number) => void }) {
  const { id } = useParams(); const product = products.find(item => item.id === Number(id)); const [quantity, setQuantity] = useState(1);
  if (!product) return <main className="section container empty-page"><h1>Record not found</h1><Link className="button" to="/products">Back to shop</Link></main>;
  return <main className="section container"><Link className="back-link" to="/products">← Back to shop</Link><div className="product-details"><img src={product.image} alt={`${product.name} placeholder artwork`} /><div><p className="eyebrow">{product.category}</p><h1>{product.name}</h1><p className="detail-artist">{product.artist}</p><p className="product-price">${product.price.toFixed(2)}</p><p className="detail-description">{product.description}</p><p className={product.stock ? 'in-stock' : 'out-of-stock'}>{product.stock ? `${product.stock} in stock` : 'Out of stock'}</p><div className="buy-row"><label className="quantity">Quantity<input type="number" min="1" max={product.stock} value={quantity} onChange={event => setQuantity(Math.max(1, Number(event.target.value)))} /></label><button className="button" disabled={!product.stock} onClick={() => onAdd(product, quantity)}>Add to cart</button></div></div></div></main>;
}
