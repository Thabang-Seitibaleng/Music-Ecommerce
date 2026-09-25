import { Link } from 'react-router-dom';
import type { CartItem } from '../types';

interface Props { items: CartItem[]; onQuantity: (id: number, quantity: number) => void; onRemove: (id: number) => void; }
export default function CartPage({ items, onQuantity, onRemove }: Props) {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  if (!items.length) return <main className="section container empty-page"><p className="eyebrow">Your cart</p><h1>Nothing spinning yet.</h1><p>Find a record worth keeping.</p><Link className="button" to="/products">Browse records</Link></main>;
  return <main className="section container"><p className="eyebrow">Your cart</p><h1 className="page-title">Ready to listen.</h1><div className="cart-layout"><div className="cart-items">{items.map(item => <article className="cart-item" key={item.id}><img src={item.image} alt="" /><div><h2>{item.name}</h2><p className="cart-artist">{item.artist}</p><p>${item.price.toFixed(2)}</p><label className="quantity">Quantity<input type="number" min="1" max={item.stock} value={item.quantity} onChange={event => onQuantity(item.id, Math.max(1, Number(event.target.value)))} /></label></div><button className="text-button remove" onClick={() => onRemove(item.id)}>Remove</button></article>)}</div><aside className="order-summary"><h2>Order summary</h2><div><span>Subtotal</span><strong>${subtotal.toFixed(2)}</strong></div><div><span>Delivery</span><span>Calculated at checkout</span></div><hr /><div className="total"><span>Total</span><strong>${subtotal.toFixed(2)}</strong></div><Link className="button full-button" to="/checkout">Continue to checkout</Link></aside></div></main>;
}
