import type { Product } from '../types';
const BASE_URL = import.meta.env.BASE_URL;

// Temporary catalogue: replace with a product API when backend endpoints exist.
// Replace these local SVG paths with your own artwork in public/images/products.
export const products: Product[] = [
  { id: 1, name: 'After the Static', artist: 'The Lanterns', price: 29.99, description: 'A restless alternative record with wide guitars and quiet moments.', category: 'Alternative', 
    image: `${BASE_URL}images/products/record-01.svg`, stock: 12 },
  
    { id: 2, name: 'Side Streets', artist: 'Mara Vale', price: 27.00, description: 'Warm indie pop for late drives and long conversations.', category: 'Indie', 
    image: `${BASE_URL}images/products/record-02.svg`, stock: 18 },
  
    { id: 3, name: 'Electric Bloom', artist: 'NOVA', price: 31.00, description: 'A sharp, modern pop pressing with a bright pulse.', category: 'Pop', 
    image: `${BASE_URL}images/products/record-03.svg`, stock: 8 },
  
    { id: 4, name: 'Blue Hour', artist: 'The Coastline', price: 26.50, description: 'Melodic rock with a sun-faded, analogue edge.', category: 'Rock', 
    image: `${BASE_URL}images/products/record-04.svg`, stock: 25 },
  
    { id: 5, name: 'Sunday Session', artist: 'The Velvet Room', price: 34.00, description: 'A timeless soul and jazz compilation on heavyweight vinyl.', category: 'Classics', 
    image: `${BASE_URL}images/products/record-05.svg`, stock: 5 },
  
    { id: 6, name: 'Orbit One', artist: 'REC. Audio', price: 249.00, description: 'A clean belt-drive turntable made for uncomplicated listening.', category: 'Turntables', 
    image: `${BASE_URL}images/products/record-06.svg`, stock: 10 },
  
    { id: 7, name: 'Soft Landing', artist: 'June & The Satellites', price: 28.00, description: 'Hushed indie guitars and warm harmonies for the hours when the world slows down.', category: 'Indie', 
    image: `${BASE_URL}images/products/record-07.svg`, stock: 14 },
  
    { id: 8, name: 'Night Windows', artist: 'Low Signal', price: 30.00, description: 'An alternative record of steady basslines, spacious drums, and city-after-dark textures.', category: 'Alternative', 
    image: `${BASE_URL}images/products/record-08.svg`, stock: 9 },
  
    { id: 9, name: 'Golden Days', artist: 'The Daydream Club', price: 27.50, description: 'Bright pop melodies, easy rhythms, and a little sunshine for your record shelf.', category: 'Pop', 
    image: `${BASE_URL}images/products/record-09.svg`, stock: 16 },
];
