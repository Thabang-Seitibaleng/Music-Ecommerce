import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductGrid from '../components/ProductGrid';
import type { Product } from '../types';

export default function ProductsPage({ products }: { products: Product[] }) {
  const [query, setQuery] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const categories = ['All', ...new Set(products.map(product => product.category))];
  // The URL lets home-page genre links open the correct filter.
  const requestedCategory = searchParams.get('category') || 'All';
  const category = categories.includes(requestedCategory) ? requestedCategory : 'All';
  const filtered = products.filter(product =>
    (category === 'All' || product.category === category) &&
    `${product.name} ${product.artist} ${product.description}`.toLowerCase().includes(query.trim().toLowerCase())
  );

  return (
    <main className="section container">
      <p className="eyebrow">The collection</p>
      <h1 className="page-title">Find your next favourite.</h1>
      <div className="shop-tools">
        <label className="search">
          <span className="sr-only">Search records or artists</span>
          <input value={query} onChange={event => setQuery(event.target.value)} placeholder="Search records or artists" />
        </label>
        <label className="filter">
          Category
          <select value={category} onChange={event => setSearchParams(event.target.value === 'All' ? {} : { category: event.target.value })}>
            {categories.map(item => <option key={item}>{item}</option>)}
          </select>
        </label>
      </div>
      <p className="result-count" aria-live="polite">{filtered.length} item{filtered.length === 1 ? '' : 's'}</p>
      <ProductGrid products={filtered} />
    </main>
  );
}
