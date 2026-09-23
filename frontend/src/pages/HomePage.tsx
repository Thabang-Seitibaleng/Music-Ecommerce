import { Link } from 'react-router-dom';
import ProductGrid from '../components/ProductGrid';
import type { Product } from '../types';
import './HomePage.css';

const categories = [
  { name: 'Alternative', note: 'A little left of centre.' },
  { name: 'Rock', note: 'Turn it up. Let it play.' },
  { name: 'Indie', note: 'Your next favourite discovery.' },
  { name: 'Pop', note: 'One more play. Every time.' },
  { name: 'Classics', note: 'Good then. Still good now.' },
  { name: 'Turntables', note: 'Give your records a home.' },
];

export default function HomePage({ products }: { products: Product[] }) {
  const spotlight = products.find(product => product.name === 'Soft Landing') || products[0];

  return (
    <main className="home-page">
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <p className="eyebrow">REC. / EST. 2026</p>
            <h1>Records worth<br /><em>keeping.</em></h1>
            <p className="hero-text">Discover modern pressings, timeless albums, and essentials for your setup.</p>
            <Link className="button" to="/products">Shop records</Link>
          </div>
          <div className="hero-record-wrap" role="img" aria-label="A vinyl record">
            <div className="hero-record">
              <div className="record-label"><span>REC.</span><small>Side A</small></div>
            </div>
          </div>
        </div>
      </section>

      <section className="section container" aria-labelledby="featured-heading">
        <div className="section-heading">
          <div><p className="eyebrow">01 / Selected listening</p><h2 id="featured-heading">Featured records</h2></div>
          <Link className="text-link" to="/products">Explore the collection →</Link>
        </div>
        <ProductGrid products={products.slice(0, 3)} />
      </section>

      <section className="sound-section container" aria-labelledby="sound-heading">
        <div className="section-heading">
          <div><p className="eyebrow">02 / Follow your ears</p><h2 id="sound-heading">Find your sound.</h2></div>
          <p className="section-note">A favourite genre. A new direction.<br />There’s a record for both.</p>
        </div>
        <div className="genre-grid">
          {categories.map((category, index) => (
            <Link className="genre-card" key={category.name} to={`/products?category=${category.name}`}>
              <span className="genre-number">0{index + 1}</span>
              <div><h3>{category.name}</h3><p>{category.note}</p></div>
              <span className="genre-arrow" aria-hidden="true">↗</span>
            </Link>
          ))}
        </div>
      </section>

      {spotlight && <section className="listening-section container" aria-labelledby="listening-heading">
        <div className="listening-room">
          <Link className="spotlight-sleeve" to={`/products/${spotlight.id}`}>
            <img src={spotlight.image} alt={`${spotlight.name} by ${spotlight.artist}`} loading="lazy" />
          </Link>
          <span className="listening-caption">REC. SELECTS / NO. 007</span>
        </div>
        <div className="listening-copy">
          <p className="eyebrow">03 / On the turntable</p>
          <h2 id="listening-heading">A little less scrolling.<br />A whole side of listening.</h2>
          <p>Put the phone down, lower the needle, and let an album set the pace. Our pick for a slow evening: warm guitars, soft edges, and nowhere to rush.</p>
          <div className="spotlight-title">
            <div><h3>{spotlight.name}</h3><span>{spotlight.artist} / {spotlight.category}</span></div>
            <strong>${spotlight.price.toFixed(2)}</strong>
          </div>
          <Link className="button" to={`/products/${spotlight.id}`}>Meet your next record ↗</Link>
        </div>
      </section>}
    </main>
  );
}
