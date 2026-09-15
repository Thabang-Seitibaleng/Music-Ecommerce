import { FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import type { CartItem } from '../types';

export default function CheckoutPage({ items, onComplete }: { items: CartItem[]; onComplete: () => void }) {
  const [complete, setComplete] = useState(false); const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const submit = (event: FormEvent) => { event.preventDefault(); setComplete(true); onComplete(); };
  if (!items.length && !complete) return <main className="section container empty-page"><h1>Your bag is empty.</h1><Link className="button" to="/products">Back to shop</Link></main>;
  if (complete) return <main className="section container empty-page"><p className="eyebrow">Order received</p><h1>Thank you.</h1><p>Your order has been recorded. This demo checkout does not process a payment because no order API exists yet.</p><Link className="button" to="/">Return home</Link></main>;
  return <main className="section container"><p className="eyebrow">Checkout</p><h1 className="page-title">A few final details.</h1><div className="checkout-layout"><form className="checkout-form" onSubmit={submit}><fieldset><legend>Contact information</legend><label>Email address<input type="email" required placeholder="you@example.com" /></label></fieldset><fieldset><legend>Delivery address</legend><label>Full name<input required autoComplete="name" /></label><label>Address<input required autoComplete="street-address" /></label><div className="form-row"><label>City<input required autoComplete="address-level2" /></label><label>Postal code<input required autoComplete="postal-code" /></label></div></fieldset><button className="button" type="submit">Place order · ${total.toFixed(2)}</button></form><aside className="order-summary"><h2>Order summary</h2>{items.map(item => <div key={item.id}><span>{item.name} × {item.quantity}</span><span>${(item.price * item.quantity).toFixed(2)}</span></div>)}<hr /><div className="total"><span>Total</span><strong>${total.toFixed(2)}</strong></div></aside></div></main>;
}
